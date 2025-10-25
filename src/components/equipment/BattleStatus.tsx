import { Card } from "../ui/card";

type Props = {
  totalAttack: number;
  totalDefense: number;
};

export default function BattleStatus({ totalAttack, totalDefense }: Props) {
  return (
    <Card className="rpg-window bg-card p-4">
      <h2 className="text-sm md:text-base text-card-foreground border-b-2 border-border pb-2 mb-3">
        戦闘ステータス
      </h2>
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <span className="text-muted-foreground">攻撃力</span>
            <span className="text-accent font-bold">{totalAttack}</span>
          </div>
          <div className="h-3 bg-muted border border-border overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{
                width: `${Math.min((totalAttack / 50) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <span className="text-muted-foreground">防御力</span>
            <span className="text-primary font-bold">{totalDefense}</span>
          </div>
          <div className="h-3 bg-muted border border-border overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${Math.min((totalDefense / 50) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
