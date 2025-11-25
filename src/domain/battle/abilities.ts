// domain/battle/abilities.ts
import { BattleStatusType } from "@/types/battleStatus";
import { Enemy } from "@/types/enemy";

// プレイヤーの攻撃処理（純粋計算のみ）
export const playerAttackAbility = (
  player: BattleStatusType,
  enemy: Enemy,
  atk: number
) => {
  const newHp = Math.max(0, enemy.hp - atk);
  return { ...enemy, hp: newHp };
};

// 敵の攻撃（プレイヤー HP 計算）
export const enemyAttackAbility = (
  player: BattleStatusType,
  enemyAtk: number,
  userDef: number
) => {
  const damage = Math.max(0, enemyAtk - userDef);
  return Math.max(0, player.hp - damage);
};

// 回復（純粋関数）
export const healAbility = (player: BattleStatusType, amount: number) => {
  return Math.min(player.maxHp, player.hp + amount);
};
