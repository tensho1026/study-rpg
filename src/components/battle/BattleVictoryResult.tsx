"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type DropItem = {
  id: string;
  name: string;
};

type VictoryResultProps = {
  exp?: number;
  gold?: number;
  drops?: DropItem[];
  onContinue?: () => void;
};

export default function BattleVictoryResult({
  exp = 150,
  gold = 250,
  drops = [
    { id: "drop-1", name: "ポーション" },
    { id: "drop-2", name: "ブロンズソード" },
  ],
  onContinue,
}: VictoryResultProps) {
  return (
    <Card className="space-y-4 border-2 border-emerald-500/40 bg-slate-950/80 p-6 text-slate-100">
      <header className="text-center">
        <h2 className="text-lg font-bold text-emerald-300">Victory!</h2>
      </header>

      <section className="space-y-2 text-sm">
        <div className="flex justify-between rounded border border-emerald-400/30 bg-slate-900/80 px-3 py-2">
          <span>獲得経験値</span>
          <span className="font-semibold text-emerald-200">{exp} EXP</span>
        </div>
        <div className="flex justify-between rounded border border-emerald-400/30 bg-slate-900/80 px-3 py-2">
          <span>獲得ゴールド</span>
          <span className="font-semibold text-emerald-200">{gold} G</span>
        </div>
      </section>

      <section className="space-y-2 text-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          ドロップアイテム
        </p>
        <div className="rounded border border-emerald-400/20 bg-slate-900/80 p-3">
          {drops.length ? (
            <ul className="space-y-1">
              {drops.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between rounded bg-slate-900 px-3 py-2"
                >
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">ドロップはありませんでした。</p>
          )}
        </div>
      </section>

      <footer className="flex justify-end">
        <Button
          className="bg-emerald-500 text-slate-900 hover:bg-emerald-400"
          onClick={onContinue}
        >
          次へ進む
        </Button>
      </footer>
    </Card>
  );
}
