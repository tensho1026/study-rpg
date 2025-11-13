import React, { useMemo } from "react";
import BattleVictoryResult from "./BattleVictoryResult";
import BattleDefeatResult from "./BattleDefeatResult";
import { DropDetail } from "@/types/dropItem";
import { LevelUpNotification } from "../home/level-up-notification";
type Props = {
  victory: boolean;
  exp: number;
  gold: number;
  monsterDrop: DropDetail;
  nomalDrop: DropDetail;
  level: number;
  previousLevel: number;
};

export default function Result({
  victory,
  exp,
  gold,
  monsterDrop,
  nomalDrop,
  level,
  previousLevel,
}: Props) {
  const drops = useMemo(() => {
    return [monsterDrop, nomalDrop].filter(
      (item) => item && item.name !== "ドロップなし"
    );
  }, [monsterDrop, nomalDrop]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <LevelUpNotification level={level} previousLevel={previousLevel} />
      <div className="max-w-md w-full px-4">
        {victory ? (
          <BattleVictoryResult exp={exp} gold={gold} drops={drops} />
        ) : (
          <BattleDefeatResult />
        )}
      </div>
    </div>
  );
}
