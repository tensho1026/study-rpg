import { BattleStatusType } from "@/types/battleStatus";
import { Enemy } from "@/types/enemy";

export const calcEnemyHp = (enemy: Enemy, userAttack: number) => {
  return Math.max(0, enemy.hp - userAttack);
};

export const calcPlayerHp = (
  player: BattleStatusType,
  enemyAtk: number,
  userDef: number,

) => {
  const damage = Math.max(0, enemyAtk - userDef);
  return Math.max(0, player.hp - damage);
};

export const calcHeal = (player: BattleStatusType, healAmount: number) => {
  return Math.min(player.maxHp, player.hp + healAmount);
};
