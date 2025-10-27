"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HpBar from "@/components/battle/HpBar";
import BattleSprite from "@/components/battle/BattleSprite";
import { useState } from "react";
import { BattleStatusType } from "@/types/battleStatus";
import { Enemy } from "@/types/enemy";

type Props = {
  enemyData: Enemy | null;
  userInfo: BattleStatusType | null;
};
function Battle({ userInfo, enemyData }: Props) {
  const [status, setStatus] = useState<BattleStatusType | null>(userInfo);
  const [enemy, setEnemy] = useState<Enemy | null>(enemyData);

  const handleAttack = async () => {
    setEnemy((prev) => {
      if (!prev) return null;
      return { ...prev, hp: prev.hp - 10 };
    });
    setStatus((prev) => {
      if (!prev) return null;
      return { ...prev, hp: prev.hp - 10 };
    });
  };
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_center,rgba(30,30,50,1),rgba(5,10,20,1))] p-4 md:p-8 font-mono">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        {/* バトルエリア */}
        <section className="relative overflow-hidden rounded-md border-2 border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
          {/* ドット模様 */}
          <div className="absolute inset-0  opacity-10" />
          <div className="relative flex h-[300px] items-center justify-between">
            <div className="flex flex-col gap-10 pl-2 md:pl-6">
              <BattleSprite label={enemy!.name} variant="enemy" />
            </div>
            <div className="flex w-full justify-end pr-2 md:pr-6">
              <BattleSprite label={status?.user.name ?? ""} variant="player" />
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
                  max={enemy!.maxHp}
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
