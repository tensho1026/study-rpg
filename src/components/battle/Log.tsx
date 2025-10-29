import { Card } from "../ui/card";

type Props = {
  battleLog: string;
};

function Log({ battleLog }: Props) {
  return (
    <Card className="relative overflow-hidden border-2 border-slate-700 bg-slate-950/90 p-4 text-slate-100 shadow-[0_10px_40px_rgba(15,23,42,0.65)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_70%)]" />
      <div className="relative flex max-h-32 flex-col gap-2 overflow-hidden">
        <div className="rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-cyan-100/90 shadow-inner">
          {battleLog}
        </div>
      </div>
    </Card>
  );
}

export default Log;
