"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HpBar from "@/components/battle/HpBar";
import BattleSprite from "@/components/battle/BattleSprite";
import { useEffect, useState } from "react";
import { BattleStatusType } from "@/types/battleStatus";
import { Enemy } from "@/types/enemy";

type Props = {
  enemyData: Enemy | null;
  userInfo: BattleStatusType | null;
};
function Battle({ userInfo, enemyData }: Props) {
  const [status, setStatus] = useState<BattleStatusType | null>(userInfo);
  const [enemy, setEnemy] = useState<Enemy | null>(enemyData);
  const [battleLog, setBattleLog] = useState<string>(`${enemy?.name}が現れた`);
  const [playerAttackAnim, setPlayerAttackAnim] = useState(false);
  const [enemyAttackAnim, setEnemyAttackAnim] = useState(false);

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

  const handleAttack = async () => {
    userAnimation();
    setEnemy((prevEnemy) => {
      if (!prevEnemy) return null;
      const newEnemyHp = Math.max(0, prevEnemy.hp - 10);
      const newEnemy = { ...prevEnemy, hp: newEnemyHp };
      if (newEnemyHp <= 0) {
        setBattleLog("君の勝利だ！");
        return newEnemy;
      }
      setBattleLog(
        `${status?.user.name}の攻撃！敵の${enemy?.name}に10の攻撃！`
      );

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
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_center,rgba(30,30,50,1),rgba(5,10,20,1))] p-4 md:p-8 font-mono">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Card className="relative overflow-hidden border-2 border-slate-700 bg-slate-950/90 p-4 text-slate-100 shadow-[0_10px_40px_rgba(15,23,42,0.65)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_70%)]" />
          <div className="relative flex max-h-32 flex-col gap-2 overflow-hidden">
            <div className="rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-cyan-100/90 shadow-inner">
              {battleLog}
            </div>
          </div>
        </Card>

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
          <Card className="space-y-4 bg-slate-900/80 border-2 border-slate-700 p-4 rounded-sm">
            <h2 className="text-sm font-bold tracking-wider text-amber-400">
              ENEMY STATUS
            </h2>
            <div className="space-y-3">
              <div
                key={enemy?.name}
                className="rounded-sm border border-slate-700 bg-slate-950/60 p-2"
              >
                <div className="flex justify-between text-xs text-slate-200">
                  <span>{enemy?.name}</span>
                  <span>HP</span>
                </div>
                <HpBar
                  current={enemy?.hp ?? 0}
                  max={enemy?.maxHp ?? 0}
                  color="bg-rose-500"
                />
              </div>
            </div>
          </Card>

          {/* プレイヤー操作 */}
          <Card className="space-y-4 bg-slate-900/80 border-2 border-slate-700 p-4 rounded-sm">
            <h2 className="text-sm font-bold tracking-wider text-cyan-300">
              PLAYER
            </h2>
            <div className="rounded-sm border border-slate-700 bg-slate-950/60 p-2">
              <div className="flex justify-between text-xs text-slate-200">
                <span>{status?.user.name}</span>
                <span>HP</span>
              </div>
              <HpBar
                current={status?.hp ?? 0}
                max={status?.maxHp ?? 0}
                color="bg-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                className="border-2 border-slate-600 bg-amber-400 hover:bg-amber-500 font-bold text-slate-900"
                onClick={handleAttack}
              >
                たたかう
              </Button>
              {/* <Button
                variant="outline"
                className="border-2 border-slate-600 text-slate-200 hover:bg-slate-700"
              >
                まもる
              </Button>
              <Button
                variant="outline"
                className="border-2 border-slate-600 text-slate-200 hover:bg-slate-700"
              >
                スキル
              </Button>
              <Button
                variant="outline"
                className="border-2 border-slate-600 text-slate-200 hover:bg-slate-700"
              >
                アイテム
              </Button> */}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default Battle;
