import { Enemy } from "@/types/enemy";
import { useBattleAnimation } from "./useBattleAnimation";
import { playerAttackAbility } from "@/domain/battle/abilities";
import { BattleStatusType } from "@/types/battleStatus";
import { calcHeal, calcPlayerHp } from "@/domain/battle/combat";

export const useBattleAbilities = ({
  setPlayerAttackAnim,
  setEnemyAttackAnim,
  setEnemy,
  setBattleLog,
  setStatus,
  enemy,
  player,
  userAttackStatus,
  userDefenseStatus,
  status,
}: {
  setPlayerAttackAnim: React.Dispatch<React.SetStateAction<boolean>>;
  setEnemyAttackAnim: React.Dispatch<React.SetStateAction<boolean>>;
  setEnemy: React.Dispatch<React.SetStateAction<Enemy | null>>;
  setBattleLog: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<BattleStatusType | null>>;

  enemy: Enemy;
  player: BattleStatusType;
  userAttackStatus: number;
  userDefenseStatus: number;
  status: BattleStatusType | null;
}) => {
  const { userAnimation, enemyAnimation } = useBattleAnimation(
    setPlayerAttackAnim,
    setEnemyAttackAnim
  );

  const attack = () => {
    if (!enemy) return;
    userAnimation();
    const updatedEnemy = playerAttackAbility(player, enemy, userAttackStatus);
    setEnemy(updatedEnemy);
    setBattleLog(
      `${status?.user.name}の攻撃！敵の${enemy.name}に${userAttackStatus}の攻撃！`
    );
    return updatedEnemy;
  };

  const heal = (amount: number) => {
    if (!status) return;
    userAnimation();
    setBattleLog(`${status?.user.name}のHPが${amount}回復した`);
    const updatedPlayerHp = calcHeal(status, amount);
    setStatus({ ...status, hp: updatedPlayerHp });
  };

  const enemyAttack = () => {
    if (!enemy || !status) return;
    enemyAnimation();

    const updatedPlayerHp = calcPlayerHp(
      status,
      enemy.attack,
      userDefenseStatus
    );
    setStatus({ ...status, hp: updatedPlayerHp });

    setBattleLog(
      `敵の${enemy.name}の攻撃！${status.user.name}に${
        300 - userDefenseStatus
      }の攻撃！`
    );

    const isDead = updatedPlayerHp <= 0;

    return isDead;
  };

  return { attack, heal, enemyAttack };
};
