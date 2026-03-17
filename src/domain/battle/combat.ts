import { BattleStatusType } from "@/types/battleStatus";
import { Enemy } from "@/types/enemy";

export const calcEnemyHp = (enemy: Enemy, userAttack: number) => {
  const damage = Math.max(1, userAttack - enemy.defense);

  return {
    hp: Math.max(0, enemy.hp - damage),
    damage,
  };
};

export const calcPlayerHp = (
  player: BattleStatusType,
  enemyAtk: number,
  userDef: number
) => {
  const damage = Math.max(1, enemyAtk - userDef);

  return {
    hp: Math.max(0, player.hp - damage),
    damage,
  };
};

export const calcHeal = (player: BattleStatusType, healAmount: number) => {
  return Math.min(player.maxHp, player.hp + healAmount);
};
