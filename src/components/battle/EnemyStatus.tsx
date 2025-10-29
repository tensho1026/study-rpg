import { Card } from "../ui/card";
import HpBar from "./HpBar";

type Enemy = {
  name: string;
  hp: number;
  maxHp: number;
};

type Props = {
  enemy: Enemy;
};

function EnemyStatus({ enemy }: Props) {
  return (
    <Card className="space-y-4 bg-slate-900/80 border-2 border-slate-700 p-4 rounded-sm">
      <h2 className="text-sm font-bold tracking-wider text-amber-400">
        ENEMY STATUS
      </h2>
      <div className="space-y-3">
        <div
          key={enemy?.name}
          className="rounded-sm border border-slate-700 bg-slate-950/60 p-2"
        >
          <div className="flex justify-between text-xs text-slate-200">
            <span>{enemy?.name}</span>
            <span>HP</span>
          </div>
          <HpBar
            current={enemy?.hp ?? 0}
            max={enemy?.maxHp ?? 0}
            color="bg-rose-500"
          />
        </div>
      </div>
    </Card>
  );
}

export default EnemyStatus;
