"use client";
import BattleSprite from "@/components/battle/BattleSprite";
import { useState } from "react";
import { BattleStatusType } from "@/types/battleStatus";
import { Enemy } from "@/types/enemy";
import { useBattleAnimation } from "@/hooks/useBattleAnimation";
import { DropDetail } from "@/types/dropItem";
import Log from "./Log";
import EnemyStatus from "./EnemyStatus";
import PlayerStatus from "./PlayerStatus";
import Result from "./Result";

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
      const newEnemyHp = Math.max(0, prevEnemy.hp - 10);
      const newEnemy = { ...prevEnemy, hp: newEnemyHp };
      setBattleLog(
        `${status?.user.name}の攻撃！敵の${enemy?.name}に10の攻撃！`
      );

      if (newEnemyHp <= 0) {
        setTimeout(() => {
          setBattleLog("君の勝利だ！");
          setVictory(true);
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
        <section className="relative overflow-hidden rounded-md border-2 border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
          {/* ドット模様 */}
          <div className="absolute inset-0  opacity-10" />
          <div className="relative flex h-[300px] items-center justify-between">
            <div className="flex flex-col gap-10 pl-2 md:pl-6">
              {enemy ? (
                <div
                  className={`relative transition-all duration-300 ${
                    enemyAttackAnim
                      ? "translate-x-5 scale-110 drop-shadow-[0_0_18px_rgba(250,204,21,0.5)]"
                      : "translate-x-0"
                  }`}
                >
                  {enemyAttackAnim ? (
                    <span className="pointer-events-none absolute -left-6 top-1/2 h-12 w-12 -translate-y-1/2 rotate-12 bg-[radial-gradient(circle,rgba(250,204,21,0.55),transparent_70%)] blur-md" />
                  ) : null}
                  <BattleSprite label={enemy.name} variant="enemy" />
                </div>
              ) : null}
            </div>
            <div className="flex w-full justify-end pr-2 md:pr-6">
              <div
                className={`relative transition-all duration-300 ${
                  playerAttackAnim
                    ? "-translate-x-5 scale-110 drop-shadow-[0_0_24px_rgba(56,189,248,0.55)]"
                    : "translate-x-0"
                }`}
              >
                {playerAttackAnim ? (
                  <span className="pointer-events-none absolute -right-8 top-1/2 h-12 w-16 -translate-y-1/2 rotate-[18deg] bg-[radial-gradient(circle,rgba(56,189,248,0.55),transparent_70%)] blur-lg" />
                ) : null}
                <BattleSprite
                  label={status?.user.name ?? ""}
                  variant="player"
                />
              </div>
            </div>
          </div>
        </section>

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
          gold={enemy?.gold ?? 0}
          monsterDrop={dropItem.monsterDrop}
          nomalDrop={dropItem.nomalDrop}
        />
      )}
    </main>
  );
}

export default Battle;
