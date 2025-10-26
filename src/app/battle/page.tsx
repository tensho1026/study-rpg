"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const player = {
  name: "ヒーロー",
  hp: 128,
  maxHp: 160,
};

const enemies = [
  { id: "goblin-a", name: "ゴブリンA", hp: 70, maxHp: 100 },
  { id: "goblin-b", name: "ゴブリンB", hp: 45, maxHp: 100 },
];

function HpBar({ current, max, color }: { current: number; max: number; color: string }) {
  const percentage = Math.max(0, Math.min(100, Math.round((current / max) * 100)));
  const blocks = Math.round((percentage / 100) * 10); // 10分割のブロックゲージ
  return (
    <div className="space-y-1 font-mono">
      <div className="flex justify-between text-[11px] text-amber-300 drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
        <span>{current}/{max}</span>
        <span>{percentage}%</span>
      </div>
      <div className="flex h-3 gap-[2px] bg-slate-800 p-[2px] rounded-sm">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`h-full w-full ${i < blocks ? color : "bg-slate-700"}`}
            style={{ imageRendering: "pixelated" }}
          />
        ))}
      </div>
    </div>
  );
}

function BattleSprite({
  label,
  variant,
}: {
  label: string;
  variant: "player" | "enemy";
}) {
  const isPlayer = variant === "player";
  const spriteClass = isPlayer
    ? "from-cyan-400 to-blue-600 border-cyan-300"
    : "from-lime-400 to-emerald-700 border-lime-300";

  return (
    <div className="relative flex flex-col items-center font-mono text-xs">
      <div
        className={`relative flex h-24 w-24 items-center justify-center rounded-md border-2 ${spriteClass} bg-gradient-to-b pixel-border`}
      >
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.3),transparent_70%)]`}
        />
        {/* 簡易ドット模様 */}
        <div className="absolute inset-0 bg-[url('/pixel-grid.png')] opacity-20 mix-blend-overlay" />
      </div>
      <span className="mt-2 rounded-sm border border-slate-700 bg-slate-900/80 px-3 py-1 text-amber-200">
        {label}
      </span>
    </div>
  );
}

export default function BattlePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_center,rgba(30,30,50,1),rgba(5,10,20,1))] p-4 md:p-8 font-mono">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        {/* バトルエリア */}
        <section className="relative overflow-hidden rounded-md border-2 border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
          {/* ドット模様 */}
          <div className="absolute inset-0 bg-[url('/pixel-grid.png')] opacity-10" />
          <div className="relative flex h-[300px] items-center justify-between">
            <div className="flex flex-col gap-10 pl-2 md:pl-6">
              {enemies.map((enemy) => (
                <BattleSprite key={enemy.id} label={enemy.name} variant="enemy" />
              ))}
            </div>
            <div className="flex w-full justify-end pr-2 md:pr-6">
              <BattleSprite label={player.name} variant="player" />
            </div>
          </div>
        </section>

        {/* ステータス＋操作 */}
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          {/* 敵ステータス */}
          <Card className="space-y-4 bg-slate-900/80 border-2 border-slate-700 p-4 rounded-sm">
            <h2 className="text-sm font-bold tracking-wider text-amber-400">ENEMY STATUS</h2>
            <div className="space-y-3">
              {enemies.map((enemy) => (
                <div key={enemy.id} className="rounded-sm border border-slate-700 bg-slate-950/60 p-2">
                  <div className="flex justify-between text-xs text-slate-200">
                    <span>{enemy.name}</span>
                    <span>HP</span>
                  </div>
                  <HpBar current={enemy.hp} max={enemy.maxHp} color="bg-rose-500" />
                </div>
              ))}
            </div>
          </Card>

          {/* プレイヤー操作 */}
          <Card className="space-y-4 bg-slate-900/80 border-2 border-slate-700 p-4 rounded-sm">
            <h2 className="text-sm font-bold tracking-wider text-cyan-300">PLAYER</h2>
            <div className="rounded-sm border border-slate-700 bg-slate-950/60 p-2">
              <div className="flex justify-between text-xs text-slate-200">
                <span>{player.name}</span>
                <span>HP</span>
              </div>
              <HpBar current={player.hp} max={player.maxHp} color="bg-cyan-400" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" className="border-2 border-slate-600 bg-amber-400 hover:bg-amber-500 font-bold text-slate-900">
                たたかう
              </Button>
              <Button variant="outline" className="border-2 border-slate-600 text-slate-200 hover:bg-slate-700">
                まもる
              </Button>
              <Button variant="outline" className="border-2 border-slate-600 text-slate-200 hover:bg-slate-700">
                スキル
              </Button>
              <Button variant="outline" className="border-2 border-slate-600 text-slate-200 hover:bg-slate-700">
                アイテム
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
