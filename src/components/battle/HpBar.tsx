export default function HpBar({ current, max, color }: { current: number; max: number; color: string }) {
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