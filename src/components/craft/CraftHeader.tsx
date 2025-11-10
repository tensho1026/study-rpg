import { Button } from "../ui/button";
import Link from "next/link";
import { Coins, Hammer } from "lucide-react";
import { AppMenuButton } from "../common/app-menu-button";

type Props = {
  coin: number;
};

export default function CraftHeader({ coin }: Props) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <AppMenuButton className="border border-white/20 bg-slate-800/50 text-white/80 hover:bg-slate-700/70" />
        <div className="flex items-center gap-2">
          <Hammer className="text-yellow-300" />
          <h1 className="font-[pixel] text-3xl text-yellow-200 drop-shadow-[0_0_6px_rgba(255,220,100,0.6)]">
            クラフト工房
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 text-sm">
        <div className="flex items-center gap-2 rounded-md border-2 border-yellow-400/40 bg-yellow-400/10 px-3 py-1 font-[pixel] shadow-[0_0_6px_rgba(255,255,150,0.3)]">
          <Coins className="size-4 text-yellow-300" />
          <span className="text-yellow-200">{coin} G</span>
        </div>

        <Button
          asChild
          className="rounded-md border-2 border-emerald-400 bg-emerald-500/80 text-slate-950 font-bold shadow-[0_0_8px_rgba(0,255,150,0.4)] hover:bg-emerald-400 hover:shadow-[0_0_12px_rgba(0,255,180,0.6)]"
        >
          <Link href="/home">🏠 ホームに戻る</Link>
        </Button>
      </div>
    </header>
  );
}
