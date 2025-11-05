import { AppMenuButton } from "../common/app-menu-button";
import { Card } from "../ui/card";

type Props = {
  coin: number;
};

function ItemShopHeader({ coin }: Props) {
  return (
    <Card className="rpg-window border border-white/10 bg-card/95 p-6 shadow-xl shadow-black/30">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3 md:items-center">
          <AppMenuButton className="mt-1 border-border bg-background/70 text-card-foreground/80 hover:bg-background/90 hover:text-card-foreground" />
          <div>
            <h1 className="text-xl font-semibold text-card-foreground md:text-2xl">
              バトルアイテム屋
            </h1>
            <p className="text-xs text-muted-foreground md:text-sm">
              戦局を変える切り札、取り揃えております。
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">所持金</p>
          <p className="text-xl font-bold text-emerald-300">{coin} G</p>
        </div>
      </div>
    </Card>
  );
}

export default ItemShopHeader;
