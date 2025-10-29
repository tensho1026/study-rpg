import React from "react";
import BattleVictoryResult from "./BattleVictoryResult";
import BattleDefeatResult from "./BattleDefeatResult";
import { DropDetail } from "@/types/dropItem";
type Props = {
  victory: boolean;
  exp: number;
  gold: number;
  monsterDrop: DropDetail;
  nomalDrop: DropDetail;
};

function Result({ victory, exp, gold, monsterDrop, nomalDrop }: Props) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="max-w-md w-full px-4">
        {victory ? (
          <BattleVictoryResult
            exp={exp}
            gold={gold}
            drops={[monsterDrop, nomalDrop].filter(
              (item) => item && item.name !== "ドロップなし"
            )}
          />
        ) : (
          <BattleDefeatResult />
        )}
      </div>
    </div>
  );
}

export default Result;
