// domain/battle/abilities.ts
import { BattleStatusType } from "@/types/battleStatus";
import { Enemy } from "@/types/enemy";
import { calcEnemyHp, calcHeal, calcPlayerHp } from "./combat";

export const playerAttackAbility = (
  enemy: Enemy,
  atk: number
) => {
  const { hp, damage } = calcEnemyHp(enemy, atk);

  return {
    enemy: { ...enemy, hp },
    damage,
  };
};

export const enemyAttackAbility = (
  player: BattleStatusType,
  enemyAtk: number,
  userDef: number
) => {
  return calcPlayerHp(player, enemyAtk, userDef);
};

export const healAbility = (player: BattleStatusType, amount: number) => {
  return calcHeal(player, amount);
};
