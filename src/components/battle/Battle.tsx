"use client";

import { useEffect } from "react";
import { BattleStatusType } from "@/types/battleStatus";
import { Enemy } from "@/types/enemy";
import { DropDetail } from "@/types/dropItem";
import { BattleItem } from "@/types/battleItem";
import { useBattleEngine } from "@/hooks/battle/useBattleEngine";
import Log from "./Log";
import BattleArea from "./BattleArea";
import EnemyStatus from "./EnemyStatus";
import PlayerStatus from "./PlayerStatus";
import Result from "./Result";

export default function Battle(props: {
  enemyData: Enemy | null;
  userInfo: BattleStatusType | null;
  dropItems: { monsterDrop: DropDetail; normalDrop: DropDetail };
  userAttackStatus: number;
  userDefenseStatus: number;
  items: BattleItem[];
}) {
  const {
    status,
    enemy,
    battleLog,
    playerAttackAnim,
    enemyAttackAnim,
    victory,
    defeat,
    userLevel,
    userItems,
    previousLevel,
    cleanup,
    handlePlayerAttack,
    handleUseItemFlow,
  } = useBattleEngine(props);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanup, []);

  return (
    <main className="min-h-screen p-4 md:p-8 font-mono">
      <div className="mx-auto max-w-5xl flex flex-col gap-6">
        <Log battleLog={battleLog} />

        <BattleArea
          enemy={enemy}
          enemyAttackAnim={enemyAttackAnim}
          playerAttackAnim={playerAttackAnim}
          userName={status?.user.name ?? ""}
        />

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <EnemyStatus enemy={enemy!} />

          <PlayerStatus
            userStatus={{
              name: status?.user.name ?? "",
              hp: status?.hp ?? 0,
              maxHp: status?.maxHp ?? 0,
              handleAttack: handlePlayerAttack,
              switchUseItem: handleUseItemFlow,
            }}
            itemsData={userItems}
          />
        </div>
      </div>

      {(victory || defeat) && (
        <Result
          victory={victory}
          exp={enemy?.exp ?? 0}
          gold={enemy?.coin ?? 0}
          monsterDrop={props.dropItems.monsterDrop}
          nomalDrop={props.dropItems.normalDrop}
          level={userLevel}
          previousLevel={previousLevel}
        />
      )}
    </main>
  );
}
