"use client";

import { useMemo, useState } from "react";
import { Clock, Flag, Flame, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import { saveStudy } from "@/app/actions/study-record";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Props = {
  total: number;
  totalMinutes: number;
  totalHours: number;
  goalMinutes?: number;
};

export function StudyTimer({
  total,
  totalMinutes,
  totalHours,
  goalMinutes = 240,
}: Props) {
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentHours, setCurrentHours] = useState(0);
  const router = useRouter();

  const goalProgress = useMemo(() => {
    if (!goalMinutes) return 0;
    const raw = Math.round((total / goalMinutes) * 100);
    return Math.max(0, Math.min(raw, 100));
  }, [goalMinutes, total]);

  const hourOptions = useMemo(() => Array.from({ length: 13 }, (_, i) => i), []);
  const minuteOptions = useMemo(
    () => Array.from({ length: 60 }, (_, i) => i),
    []
  );

  const handleTotal = () => {
    const totalTime = currentHours * 60 + currentMinutes;
    saveStudy(totalTime);
    setCurrentHours(0);
    setCurrentMinutes(0);
    router.refresh();
  };

  return (
    <Card className="relative overflow-hidden border border-white/5 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 p-6 shadow-xl shadow-black/40">
      <div className="absolute -right-16 top-10 hidden size-48 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent blur-3xl sm:block" />
      <div className="absolute -bottom-10 -left-20 hidden size-52 rounded-full bg-gradient-to-r from-blue-500/20 via-indigo-500/10 to-transparent blur-3xl sm:block" />

      <div className="relative space-y-6">
        <div className="flex flex-col gap-3 border-b border-white/5 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
              <Clock className="size-4" />
            </span>
            <h2 className="text-lg font-semibold tracking-wide text-white md:text-xl">
              今日の勉強時間を記録
            </h2>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70">
            Daily Quest
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_auto] md:items-center">
          <div className="space-y-3 rounded-2xl border border-white/5 bg-white/5 p-4 text-center shadow-inner shadow-black/40">
            <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              <Flame className="size-3.5 text-amber-300" />
              今日の累計勉強時間
            </p>
            <div className="mt-3 flex justify-center gap-8 md:gap-12">
              <div>
                <p className="text-4xl font-black leading-none text-white md:text-5xl">
                  {totalHours}
                </p>
                <p className="mt-1 text-xs text-white/60">時間</p>
              </div>
              <div>
                <p className="text-4xl font-black leading-none text-white md:text-5xl">
                  {totalMinutes}
                </p>
                <p className="mt-1 text-xs text-white/60">分</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-white/70">合計 {total} 分の冒険</p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-5 py-4 text-center">
            <Flag className="size-5 text-amber-200" />
            <span className="text-xs uppercase tracking-[0.32em] text-amber-200/80">
              今日の目標
            </span>
            <p className="text-xl font-semibold text-amber-100">
              {goalMinutes} 分
            </p>
            <div className="w-full">
              <div className="flex items-center justify-between text-[10px] uppercase text-amber-100/70">
                <span>進捗</span>
                <span>{goalProgress}%</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 transition-[width] duration-700 ease-out"
                  style={{ width: `${goalProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            <label className="flex flex-col gap-2 text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                時間を選ぶ
              </span>
              <select
                value={currentHours}
                onChange={(event) => setCurrentHours(Number(event.target.value))}
                className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-lg font-semibold text-white shadow-inner shadow-black/40 outline-none transition focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/30"
              >
                {hourOptions.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour} 時間
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                分を選ぶ
              </span>
              <select
                value={currentMinutes}
                onChange={(event) =>
                  setCurrentMinutes(Number(event.target.value))
                }
                className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-lg font-semibold text-white shadow-inner shadow-black/40 outline-none transition focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/30"
              >
                {minuteOptions.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute} 分
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 text-left text-xs text-white/70 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Sparkles className="size-4 text-emerald-300" />
              記録するとスタミナとEXPを獲得できます。
            </div>
            <p className="text-[11px] tracking-wide">
              計測はいつでもやり直し可能。集中できた時間をこまめに登録しよう。
            </p>
          </div>

          <Button
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 px-6 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-[0_0_25px_rgba(16,185,129,0.28)] transition hover:translate-y-[1px] hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] focus-visible:ring-emerald-400/40"
            onClick={handleTotal}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="size-5 transition-transform group-hover:scale-110" />
              記録する
            </span>
            <span className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="h-full w-full bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
            </span>
          </Button>

          <div
            aria-live="polite"
            className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-xs text-emerald-100 shadow-inner shadow-[0_0_12px_rgba(16,185,129,0.25)]"
          >
            記録が完了するとこのスペースにトースト通知が表示されます。
          </div>
        </div>
      </div>
    </Card>
  );
}
