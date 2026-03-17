export type BattleBaseStats = {
  maxHp: number;
  attack: number;
  defense: number;
};

export default function getBattleBaseStats(level: number): BattleBaseStats {
  const safeLevel = Math.max(1, level);

  return {
    maxHp: 100 + (safeLevel - 1) * 12,
    attack: 6 + (safeLevel - 1) * 3,
    defense: 2 + (safeLevel - 1) * 1,
  };
}
