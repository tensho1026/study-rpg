import { cn } from "@/lib/utils";

const craftMethods = [
  {
    id: "1",
    title: "モンスター素材クラフト",
    type: "ENEMY",
    accent: "text-amber-300",
  },
  {
    id: "2",
    title: "共通素材クラフト",
    type: "NORMAL",
    accent: "text-cyan-300",
  },
] as const;

type CraftMethodType = "ENEMY" | "NORMAL";

type Props = {
  craftMethod: CraftMethodType;
  setCraftMethod: (method: CraftMethodType) => void;
};

export default function Method({ craftMethod, setCraftMethod }: Props) {
  return (
    <section className="mt-6 grid gap-3 md:grid-cols-2">
      {craftMethods.map((method) => (
        <button
          key={method.id}
          onClick={() => setCraftMethod(method.type)}
          className={cn(
            "flex flex-col rounded-lg border-2 px-5 py-3 transition-all font-[pixel]",
            craftMethod === method.type
              ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_10px_rgba(0,255,180,0.3)]"
              : "border-white/15 bg-slate-900/50 hover:bg-slate-800/70"
          )}
        >
          <span className={cn("text-sm", method.accent)}>▶ {method.title}</span>
        </button>
      ))}
    </section>
  );
}
