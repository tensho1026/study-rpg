export default function BattleSprite({
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
        <div className="absolute inset-0  opacity-20 mix-blend-overlay" />
      </div>
      <span className="mt-2 rounded-sm border border-slate-700 bg-slate-900/80 px-3 py-1 text-amber-200">
        {label}
      </span>
    </div>
  );
}
