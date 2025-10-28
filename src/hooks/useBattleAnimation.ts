// src/hooks/useBattleAnimation.ts
export function useBattleAnimation(
  setPlayerAttackAnim: (v: boolean) => void,
  setEnemyAttackAnim: (v: boolean) => void
) {
  const userAnimation = () => {
    const playerStart = setTimeout(() => setPlayerAttackAnim(true), 200);
    const playerEnd = setTimeout(() => setPlayerAttackAnim(false), 700);
    return () => {
      clearTimeout(playerStart);
      clearTimeout(playerEnd);
    };
  };

  const enemyAnimation = () => {
    const enemyStart = setTimeout(() => setEnemyAttackAnim(true), 950);
    const enemyEnd = setTimeout(() => setEnemyAttackAnim(false), 1500);
    return () => {
      clearTimeout(enemyStart);
      clearTimeout(enemyEnd);
    };
  };

  return { userAnimation, enemyAnimation };
}
