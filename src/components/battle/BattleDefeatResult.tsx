"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type DefeatResultProps = {
  onReturnToTown?: () => void;
  onGoHome?: () => void;
};

export default function BattleDefeatResult({
  onReturnToTown,
  onGoHome,
}: DefeatResultProps) {
  return (
    <Card className="space-y-4 border-2 border-rose-500/40 bg-slate-950/85 p-6 text-slate-100">
      <header className="text-center">
        <h2 className="text-lg font-bold text-rose-300 uppercase tracking-[0.4em]">
          You Died
        </h2>
      </header>

      <p className="text-center text-sm text-slate-400">
        体勢を立て直して、再び冒険へ。
      </p>

      <footer className="flex flex-col gap-2 md:flex-row md:justify-center">
        <Link href="/map">
          <Button
            variant="outline"
            className="border border-slate-600 text-slate-200 hover:bg-slate-800"
            onClick={onReturnToTown}
          >
            冒険を続ける
          </Button>
        </Link>
        <Link href="/home">
          <Button
            className="bg-rose-500 text-slate-950 hover:bg-rose-400"
            onClick={onGoHome}
          >
            ホームへ戻る
          </Button>
        </Link>
      </footer>
    </Card>
  );
}
