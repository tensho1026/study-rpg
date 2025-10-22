import { Sparkles, Trophy } from "lucide-react";

import { Card } from "@/components/ui/card";

export function MessageBox() {
  return (
    <Card className="relative overflow-hidden border border-amber-400/40 bg-gradient-to-br from-amber-500/20 via-rose-500/15 to-purple-600/20 p-6 text-center text-white shadow-[0_15px_45px_rgba(255,193,7,0.15)]">
      <div className="absolute -left-8 top-10 size-40 rounded-full bg-amber-400/30 blur-3xl" />
      <div className="absolute -right-10 -top-10 size-52 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute inset-0 animate-pulse opacity-10">
        <div className="h-full w-full bg-gradient-to-br from-white/20 via-transparent to-white/10" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">
          <Sparkles className="size-3.5" />
          Level Up!
        </div>
        <div className="flex items-center gap-3 text-center">
          <Trophy className="size-8 text-amber-200 drop-shadow-[0_0_12px_rgba(255,215,0,0.7)] animate-bounce" />
          <h3 className="text-lg font-bold leading-tight md:text-2xl">
            レベルが上がった！
          </h3>
        </div>
        <p className="max-w-md text-xs text-white/80 md:text-sm">
          今日の学習成果があなたをさらに強くしました。新しい称号や報酬をチェックして、次のクエストに備えましょう。
        </p>
      </div>
    </Card>
  );
}
