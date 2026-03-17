// hooks/battle/useBattleAbilities.ts
"use client";

import { Enemy } from "@/types/enemy";
import { BattleStatusType } from "@/types/battleStatus";
import { BattleItem } from "@/types/battleItem";
import { useBattleAnimation } from "./useBattleAnimation";
import {
  playerAttackAbility,
  enemyAttackAbility,
  healAbility,
} from "@/domain/battle/abilities";

export function useBattleAbilities({
  setPlayerAttackAnim,
  setEnemyAttackAnim,
  setEnemy,
  setBattleLog,
  setStatus,
  enemy,
  status,
  userAttackStatus,
  userDefenseStatus,
}: {
  setPlayerAttackAnim: React.Dispatch<React.SetStateAction<boolean>>;
  setEnemyAttackAnim: React.Dispatch<React.SetStateAction<boolean>>;
  setEnemy: React.Dispatch<React.SetStateAction<Enemy | null>>;
  setBattleLog: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<BattleStatusType | null>>;

  enemy: Enemy | null;
  status: BattleStatusType | null;

  userAttackStatus: number;
  userDefenseStatus: number;
}) {
  const { userAnimation, enemyAnimation } = useBattleAnimation(
    setPlayerAttackAnim,
    setEnemyAttackAnim
  );

  // プレイヤー攻撃
  const attack = () => {
    if (!enemy || !status) return null;

    userAnimation();

    const { enemy: updatedEnemy, damage } = playerAttackAbility(
      enemy,
      userAttackStatus
    );

    setEnemy(updatedEnemy);
    setBattleLog(
      `${status.user.name}の攻撃！敵の${enemy.name}に${damage}ダメージ！`
    );

    return updatedEnemy;
  };

  // 回復
  const heal = (amount: number) => {
    if (!status) return;

    userAnimation();
    setBattleLog(`${status.user.name}のHPが${amount}回復した`);

    const newHp = healAbility(status, amount);
    setStatus({ ...status, hp: newHp });
  };

  // 敵の攻撃
  const enemyAttack = () => {
    if (!enemy || !status) return false;

    enemyAnimation();

    const { hp: newHp, damage } = enemyAttackAbility(
      status,
      enemy.attack,
      userDefenseStatus
    );

    setStatus({ ...status, hp: newHp });
    setBattleLog(
      `敵の${enemy.name}の攻撃！${status.user.name}は${damage}ダメージ！`
    );

    return newHp <= 0;
  };

  // アイテムの使用
  const runItemAbility = (item: BattleItem) => {
    if (item.type === "heal") {
      heal(item.healHp ?? 0);
    }
  };

  return { attack, enemyAttack, runItemAbility };
}
