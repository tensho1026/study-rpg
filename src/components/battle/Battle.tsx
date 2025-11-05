"use client";
import { useRef, useState } from "react";
import { BattleStatusType } from "@/types/battleStatus";
import { Enemy } from "@/types/enemy";
import { useBattleAnimation } from "@/hooks/useBattleAnimation";
import { DropDetail } from "@/types/dropItem";
import Log from "./Log";
import EnemyStatus from "./EnemyStatus";
import PlayerStatus from "./PlayerStatus";
import Result from "./Result";
import BattleArea from "./BattleArea";
import saveRewards from "@/app/actions/battle/saveRewards";

type Props = {
  enemyData: Enemy | null;
  userInfo: BattleStatusType | null;
  dropItems: {
    monsterDrop: DropDetail;
    nomalDrop: DropDetail;
  };
  userAttackStatus: number;
  userDefenseStatus: number;
};

function Battle({
  userInfo,
  enemyData,
  dropItems,
  userAttackStatus,
  userDefenseStatus,
}: Props) {
  const [status, setStatus] = useState<BattleStatusType | null>(userInfo);
  const [enemy, setEnemy] = useState<Enemy | null>(enemyData);
  const [dropItem] = useState(dropItems);
  const [battleLog, setBattleLog] = useState<string>(`${enemy?.name}が現れた`);
  const [playerAttackAnim, setPlayerAttackAnim] = useState(false);
  const [enemyAttackAnim, setEnemyAttackAnim] = useState(false);
  const [defeat, setDefeat] = useState(false);
  const [victory, setVictory] = useState(false);
  const initialLevelRef = useRef<number>(userInfo?.level ?? 0);
  const [userLevel, setUserLevel] = useState<number>(initialLevelRef.current);

  const { userAnimation, enemyAnimation } = useBattleAnimation(
    setPlayerAttackAnim,
    setEnemyAttackAnim
  );

  const healHp = (amount: number) => {
    userAnimation();
    setBattleLog(`${status?.user.name}のHPが10回復した`);
    setStatus((prev) => {
      if (!prev) return null;
      // ここで最大hpより回復しないようにしている
      const newHp = Math.min(prev.maxHp, prev.hp + amount);
      return { ...prev, hp: newHp };
    });
  };

  const userAttack = () => {
    if (!enemy) return;
    userAnimation();
    const newEnemyHp = Math.max(0, enemy.hp - userAttackStatus);
    const updatedEnemy = { ...enemy, hp: newEnemyHp };

    setEnemy(updatedEnemy);
    setBattleLog(`${status?.user.name}の攻撃！敵の${enemy.name}に10の攻撃！`);
    return updatedEnemy;
  };

  const handleVictory = () => {
    if (!enemy) return;
    setTimeout(async () => {
      setBattleLog("君の勝利だ！");
      setVictory(true);
      const newLevel = await saveRewards(
        dropItem.nomalDrop.id,
        dropItem.monsterDrop.id,
        enemy.coin ?? 0,
        enemy.exp,
        status?.hp ?? 0
      );
      if (typeof newLevel === "number") {
        setUserLevel(newLevel);
      }
    }, 2000);

    return;
  };

  const enemyAttack = () => {
    if (!enemy) return;
    enemyAnimation();
    setStatus((prevStatus) => {
      if (!prevStatus) return null;
      const newStatusHp = Math.max(
        0,

        // ここで敵の攻撃力より防御が高いと敵の攻撃で回復してしまうので注意する
        prevStatus.hp - (200 - userDefenseStatus)
      );
      const newStatus = { ...prevStatus, hp: newStatusHp };

      if (newStatus.hp <= 0) {
        // HPが0以下になった時点でのみ敗北判定
        handleDefeat();
      }

      const defenderName = prevStatus.user?.name ?? "";
      setBattleLog(`敵の${enemy.name}の攻撃！${defenderName}に10の攻撃！`);

      return newStatus;
    });
  };

  const handleDefeat = () => {
    setTimeout(() => {
      setBattleLog("君の負けだ...");
      setDefeat(true);
    }, 3000);
  };

  const handleAttack = async () => {
    if (!enemy) return;
    const updatedEnemy = userAttack();
    if (updatedEnemy!.hp <= 0) {
      handleVictory();
      return;
    }
    setTimeout(() => {
      enemyAttack();
    }, 2000);
  };

  const handleHeal = async () => {
    if (!enemy) return;
    healHp(10);
    setTimeout(() => {
      enemyAttack();
    }, 2000);
  };
  const userStatusComponentData = {
    name: status?.user.name ?? "",
    hp: status?.hp ?? 0,
    maxHp: status?.maxHp ?? 0,
    handleAttack: handleAttack,
    healHp: handleHeal,
  };
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_center,rgba(30,30,50,1),rgba(5,10,20,1))] p-4 md:p-8 font-mono">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Log battleLog={battleLog} />

        {/* バトルエリア */}
        <BattleArea
          enemy={enemy}
          enemyAttackAnim={enemyAttackAnim}
          playerAttackAnim={playerAttackAnim}
          userName={status?.user.name ?? ""}
        />

        {/* ステータス＋操作 */}
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          {/* 敵ステータス */}
          <EnemyStatus enemy={enemy!} />

          {/* プレイヤー操作 */}
          <PlayerStatus userStatus={userStatusComponentData} />
        </div>
      </div>
      {(victory || defeat) && (
        <Result
          victory={victory}
          exp={enemy?.exp ?? 0}
          gold={enemy?.coin ?? 0}
          monsterDrop={dropItem.monsterDrop}
          nomalDrop={dropItem.nomalDrop}
          level={userLevel}
          previousLevel={initialLevelRef.current}
        />
      )}
    </main>
  );
}

export default Battle;
