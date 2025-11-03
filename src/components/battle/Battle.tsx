"use client";
import { useState } from "react";
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
};

function Battle({ userInfo, enemyData, dropItems }: Props) {
  const [status, setStatus] = useState<BattleStatusType | null>(userInfo);
  const [enemy, setEnemy] = useState<Enemy | null>(enemyData);
  const [dropItem] = useState(dropItems);
  const [battleLog, setBattleLog] = useState<string>(`${enemy?.name}が現れた`);
  const [playerAttackAnim, setPlayerAttackAnim] = useState(false);
  const [enemyAttackAnim, setEnemyAttackAnim] = useState(false);
  const [defeat, setDefeat] = useState(false);
  const [victory, setVictory] = useState(false);

  const { userAnimation, enemyAnimation } = useBattleAnimation(
    setPlayerAttackAnim,
    setEnemyAttackAnim
  );

  const handleAttack = async () => {
    userAnimation();
    setEnemy((prevEnemy) => {
      if (!prevEnemy) return null;
      const newEnemyHp = Math.max(0, prevEnemy.hp - 10000);
      const newEnemy = { ...prevEnemy, hp: newEnemyHp };
      setBattleLog(
        `${status?.user.name}の攻撃！敵の${enemy?.name}に10の攻撃！`
      );

      if (newEnemyHp <= 0) {
        setTimeout(async () => {
          setBattleLog("君の勝利だ！");
          setVictory(true);
          await saveRewards(
            dropItem.nomalDrop.id,
            dropItem.monsterDrop.id,
            enemy?.coin ?? 0,
            enemy?.exp ?? 0
          );
        }, 2000);

        return newEnemy;
      }

      setTimeout(() => {
        enemyAnimation();
        setStatus((prevStatus) => {
          if (!prevStatus) return null;
          const newStatusHp = Math.max(0, prevStatus.hp - 600);
          const newStatus = { ...prevStatus, hp: newStatusHp };
          setBattleLog(
            `敵の${enemy?.name}の攻撃！${status?.user.name}に10の攻撃！`
          );

          if (newStatusHp <= 0) {
            setTimeout(() => {
              setBattleLog("君の負けだ...");
              setDefeat(true);
              return newStatus;
            }, 3000);
          }

          return newStatus;
        });

        if (status) {
          if (status?.hp <= 0) {
            setBattleLog("君の負けだ");
            return;
          }
        }
      }, 3000);
      return newEnemy;
    });
  };
  const userStatusComponentData = {
    name: status?.user.name ?? "",
    hp: status?.hp ?? 0,
    maxHp: status?.maxHp ?? 0,
    handleAttack: handleAttack,
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
        />
      )}
    </main>
  );
}

export default Battle;
