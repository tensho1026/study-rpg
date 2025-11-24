import { Enemy } from "@/types/enemy";
import { calcEnemyHp, calcHeal, calcPlayerHp } from "./combat";
import { BattleStatusType } from "@/types/battleStatus";

export const playerAttackAbility = (
  player: BattleStatusType,
  enemy: Enemy,
  userAttackStatus: number
) => {
  const newEnemyHp = calcEnemyHp(enemy, userAttackStatus);
  return { ...enemy, hp: newEnemyHp };
};

export const playerHealAbility = (
  player: BattleStatusType,
  healAmount: number
) => {
  const newHp = calcHeal(player, healAmount);

  return { ...player, hp: newHp };
};
export const enemyAttackAbility = (
  player: BattleStatusType,
  enemy: Enemy,
  userDefenseStatus: number
) => {
  const newHp = calcPlayerHp(player, enemy.attack, userDefenseStatus);
  return { ...player, hp: newHp };
};
