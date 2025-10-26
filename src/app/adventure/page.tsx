import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const player = {
  name: "ヒーロー",
  hp: 128,
  maxHp: 160,
};

const enemies = [
  {
    id: "goblin-a",
    name: "ゴブリンA",
    hp: 70,
    maxHp: 100,
  },
  {
    id: "goblin-b",
    name: "ゴブリンB",
    hp: 45,
    maxHp: 100,
  },
];

function HpBar({
  current,
  max,
  color,
}: {
  current: number;
  max: number;
  color: string;
}) {
  const percentage = Math.max(0, Math.min(100, Math.round((current / max) * 100)));
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px] font-medium tracking-wide text-muted-foreground">
        <span>
          {current}/{max}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
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
  const baseClass =
    "relative flex flex-col items-center justify-center text-xs font-semibold text-card-foreground";
  const spriteClass =
    variant === "player"
      ? "h-28 w-28 rounded-full border-4 border-cyan-400/70 bg-gradient-to-b from-blue-400 via-cyan-400 to-sky-500 shadow-[0_0_40px_rgba(56,189,248,0.4)]"
      : "h-24 w-24 rounded-full border-4 border-emerald-700/60 bg-gradient-to-b from-amber-200 via-lime-300 to-emerald-400 shadow-[0_0_30px_rgba(74,222,128,0.35)]";

  return (
    <div className={baseClass}>
      <div className={spriteClass} />
      <span className="mt-2 rounded-full border border-border bg-background/80 px-3 py-1 shadow-sm">
        {label}
      </span>
    </div>
  );
}

export default function AdventurePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black p-4 md:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <section className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-gradient-to-b from-emerald-900/70 via-emerald-950 to-black/80 p-6 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,255,210,0.15),_transparent_60%)]" />
          <div className="absolute inset-x-0 bottom-10 h-24 bg-[radial-gradient(circle,_rgba(0,0,0,0.35),_transparent_70%)] blur-xl" />

          <div className="relative flex h-[340px] items-center justify-between">
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

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <Card className="space-y-4 bg-slate-900/40 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              ENEMY STATUS
            </h2>
            <div className="space-y-4">
              {enemies.map((enemy) => (
                <div key={enemy.id} className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-100">
                    <span>{enemy.name}</span>
                    <span>HP</span>
                  </div>
                  <div className="mt-2">
                    <HpBar current={enemy.hp} max={enemy.maxHp} color="bg-rose-500" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-4 bg-slate-900/40 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              PLAYER
            </h2>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-100">
                <span>{player.name}</span>
                <span>HP</span>
              </div>
              <div className="mt-2">
                <HpBar current={player.hp} max={player.maxHp} color="bg-cyan-400" />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <Button variant="secondary" className="justify-center">
                たたかう
              </Button>
              <Button variant="outline" className="justify-center border-slate-700/80 text-slate-300">
                まもる
              </Button>
              <Button variant="outline" className="justify-center border-slate-700/80 text-slate-300">
                スキル
              </Button>
              <Button variant="outline" className="justify-center border-slate-700/80 text-slate-300">
                アイテム
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
