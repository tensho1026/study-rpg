"use client";

import {  Clock, Coins } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AppMenuButton } from "@/components/common/app-menu-button";

interface StatusWindowProps {
  level: number;
  expProgress: number;
  coins: number;
  totalStudyTime: number;
}

export function StatusWindow({
  level,
  expProgress,
  coins,
  totalStudyTime,
}: StatusWindowProps) {
  const studyHours = Math.floor(totalStudyTime / 60);
  const studyMinutes = totalStudyTime % 60;

  return (
    <>
      <Card className="relative flex w-full flex-col items-start justify-between gap-6 border border-white/10 bg-gradient-to-br from-slate-900/85 via-slate-950/80 to-slate-950/95 p-5 shadow-xl shadow-black/30 md:flex-row md:items-center md:gap-8">
        {/* 背景 */}
        <div className="absolute -right-10 top-0 size-28 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-10 left-6 size-36 rounded-full bg-cyan-500/10 blur-3xl" />

        {/* メニューボタン + ランク表示 */}
        <div className="relative flex w-full items-start gap-3 md:w-auto md:flex-row-reverse md:items-center md:gap-4">
          <div className="relative flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.24em] text-white/50">
              現在のランク
            </span>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-black text-white md:text-4xl">
                Lv.{level}
              </p>
            </div>
          </div>

          <AppMenuButton className="ml-auto md:ml-0 md:mr-4" />
        </div>

        {/* EXPゲージ */}
        <div className="relative flex w-full max-w-lg flex-col space-y-2 md:w-2/5">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
            <span>EXPゲージ</span>
            <span>{expProgress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 transition-[width] duration-700 ease-out"
              style={{ width: `${expProgress}%` }}
            />
          </div>
        </div>

        {/* 所持金・累計 */}
        <div className="relative grid w-full max-w-sm grid-cols-2 gap-3 text-sm text-white/80 md:w-auto md:gap-4">
          <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-3 shadow-inner shadow-black/30">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/60">
              <Coins className="size-3.5 text-amber-300" />
              所持金
            </div>
            <p className="mt-1 text-2xl font-semibold text-white">
              {coins}
              <span className="ml-1 text-base text-amber-200">G</span>
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-3 shadow-inner shadow-black/30">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/60">
              <Clock className="size-3.5 text-sky-300" />
              累計学習
            </div>
            <p className="mt-1 text-2xl font-semibold text-white">
              {studyHours}h {studyMinutes}m
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
