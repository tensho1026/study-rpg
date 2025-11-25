// hooks/battle/useBattleFlow.ts
"use client";

import saveRewards from "@/app/actions/battle/saveRewards";
import { BattleStatusType } from "@/types/battleStatus";
import { DropDetail } from "@/types/dropItem";
import { Enemy } from "@/types/enemy";
import { useRef } from "react";

export function useBattleFlow({
  enemy,
  status,
  enemyAttack,
  setDefeat,
  setVictory,
  dropItems,
  updateLevel,
}: {
  enemy: Enemy | null;
  status: BattleStatusType | null;

  enemyAttack: () => boolean;
  setDefeat: (v: boolean) => void;
  setVictory: (v: boolean) => void;

  dropItems: { monsterDrop: DropDetail; normalDrop: DropDetail };
  updateLevel: (lvl: number) => void;
}) {
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeouts.current.push(id);
  };

  const cleanup = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  // プレイヤー攻撃後の敵ターン
  const handleEnemyTurn = () => {
    run(() => {
      const dead = enemyAttack();
      if (dead) {
        run(() => setDefeat(true), 1200);
      }
    }, 2000);
  };

  // 勝利処理
  const handleVictoryFlow = () => {
    if (!enemy || !status) return;

    run(async () => {
      const newLevel = await saveRewards(
        dropItems.normalDrop.id,
        dropItems.monsterDrop.id,
        enemy.coin ?? 0,
        enemy.exp,
        status.hp
      );

      if (typeof newLevel === "number") {
        updateLevel(newLevel);
      }

      setVictory(true);
    }, 1500);
  };

  return { run, cleanup, handleEnemyTurn, handleVictoryFlow };
}
