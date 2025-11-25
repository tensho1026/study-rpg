// hooks/battle/useBattleEngine.ts
"use client";

import { BattleItem } from "@/types/battleItem";
import { BattleStatusType } from "@/types/battleStatus";
import { Enemy } from "@/types/enemy";
import { useState, useRef } from "react";
import { useBattleAbilities } from "./useBattleAbilities";
import { useBattleFlow } from "./useBattleFlow";
import { DropDetail } from "@/types/dropItem";

export function useBattleEngine({
  userInfo,
  enemyData,
  dropItems,
  userAttackStatus,
  userDefenseStatus,
  items,
}: {
  userInfo: BattleStatusType | null;
  enemyData: Enemy | null;
  dropItems: { monsterDrop: DropDetail; normalDrop: DropDetail };
  userAttackStatus: number;
  userDefenseStatus: number;
  items: BattleItem[];
}) {
  const [status, setStatus] = useState<BattleStatusType | null>(userInfo);
  const [enemy, setEnemy] = useState<Enemy | null>(enemyData);
  const [battleLog, setBattleLog] = useState(`${enemyData?.name}が現れた`);
  const [playerAttackAnim, setPlayerAttackAnim] = useState(false);
  const [enemyAttackAnim, setEnemyAttackAnim] = useState(false);
  const [victory, setVictory] = useState(false);
  const [defeat, setDefeat] = useState(false);
  const [userItems] = useState(items);
  const initialLevelRef = useRef(userInfo?.level ?? 0);
  const [userLevel, setUserLevel] = useState(initialLevelRef.current);

  // abilities
  const { attack, enemyAttack, runItemAbility } = useBattleAbilities({
    setPlayerAttackAnim,
    setEnemyAttackAnim,
    setEnemy,
    setBattleLog,
    setStatus,
    enemy,
    status,
    userAttackStatus,
    userDefenseStatus,
  });

  // flow
  const { cleanup, handleEnemyTurn, handleVictoryFlow } = useBattleFlow({
    enemy,
    status,
    enemyAttack,
    setDefeat,
    setVictory,
    dropItems,
    updateLevel: setUserLevel,
  });

  const handlePlayerAttack = () => {
    if (!enemy) return;
    const updated = attack();
    if (!updated) return;

    if (updated.hp <= 0) {
      handleVictoryFlow();
      return;
    }

    handleEnemyTurn();
  };

  const handleUseItemFlow = (item: BattleItem) => {
    runItemAbility(item);
    handleEnemyTurn();
  };

  return {
    status,
    enemy,
    battleLog,
    playerAttackAnim,
    enemyAttackAnim,
    victory,
    defeat,
    userLevel,
    userItems,
    previousLevel: initialLevelRef.current,

    cleanup,
    handlePlayerAttack,
    handleUseItemFlow,
  };
}
