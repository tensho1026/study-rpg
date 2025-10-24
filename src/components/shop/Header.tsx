import React from "react";
import { Card } from "../ui/card";

function Header({ userCoins }: { userCoins: number }) {
  return (
    <Card className="rpg-window bg-card p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl text-card-foreground mb-2">
            武器屋
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            いらっしゃい！良い装備が揃ってるよ
          </p>
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
