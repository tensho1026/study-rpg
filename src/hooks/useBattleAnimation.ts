// src/hooks/useBattleAnimation.ts
export function useBattleAnimation(
  setPlayerAttackAnim: (v: boolean) => void,
  setEnemyAttackAnim: (v: boolean) => void
) {
  const userAnimation = () => {
    const playerStart = setTimeout(() => setPlayerAttackAnim(true), 1);
    const playerEnd = setTimeout(() => setPlayerAttackAnim(false), 1500);
    return () => {
      clearTimeout(playerStart);
      clearTimeout(playerEnd);
    };
  };

  const enemyAnimation = () => {
    const enemyStart = setTimeout(() => setEnemyAttackAnim(true), 1);
    const enemyEnd = setTimeout(() => setEnemyAttackAnim(false), 1500);
    return () => {
      clearTimeout(enemyStart);
      clearTimeout(enemyEnd);
    };
  };

  return { userAnimation, enemyAnimation };
}
