import { AppMenuButton } from "@/components/app-menu-button";
import { Card } from "../ui/card";

function Header({ userCoins }: { userCoins: number }) {
  return (
    <Card className="rpg-window bg-card p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3 md:items-center">
          <AppMenuButton
            className="mt-1 border-border bg-background/70 text-card-foreground/80 hover:bg-background/90 hover:text-card-foreground"
            triggerLabel="アプリメニューを開く"
          />
          <div>
            <h1 className="text-xl md:text-2xl text-card-foreground mb-2">
              武器屋
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              いらっしゃい！良い装備が揃ってるよ
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">所持金</p>
          <p className="text-lg md:text-xl text-accent font-bold">
            {userCoins ?? 0} G
          </p>
        </div>
      </div>
    </Card>
  );
}

export default Header;
