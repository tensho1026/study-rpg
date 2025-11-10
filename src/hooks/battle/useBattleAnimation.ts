import { useEffect, useRef } from "react";

// src/hooks/useBattleAnimation.ts
export function useBattleAnimation(
  setPlayerAttackAnim: (v: boolean) => void,
  setEnemyAttackAnim: (v: boolean) => void
) {
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, []);
  const userAnimation = () => {
    const start = setTimeout(() => setPlayerAttackAnim(true), 1);
    const end = setTimeout(() => setPlayerAttackAnim(false), 1500);
    timeouts.current.push(start, end);
  };

  const enemyAnimation = () => {
    const start = setTimeout(() => setEnemyAttackAnim(true), 1);
    const end = setTimeout(() => setEnemyAttackAnim(false), 1500);
    timeouts.current.push(start, end);
  };

  return { userAnimation, enemyAnimation };
}
