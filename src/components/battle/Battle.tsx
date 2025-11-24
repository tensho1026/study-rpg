"use client";
import { useEffect } from "react";
import { BattleStatusType } from "@/types/battleStatus";
import { Enemy } from "@/types/enemy";
import { DropDetail } from "@/types/dropItem";
import { BattleItem } from "@/types/battleItem";
import { useBattleEngine } from "@/hooks/battle/useBattleEngine";
import Log from "./Log";
import BattleArea from "./BattleArea";
import EnemyStatus from "./EnemyStatus";
import PlayerStatus from "./PlayerStatus";
import Result from "./Result";

type Props = {
  enemyData: Enemy | null;
  userInfo: BattleStatusType | null;
  dropItems: {
    monsterDrop: DropDetail;
    normalDrop: DropDetail;
  };
  userAttackStatus: number;
  userDefenseStatus: number;
  items: BattleItem[];
};

export default function Battle({
  userInfo,
  enemyData,
  dropItems,
  userAttackStatus,
  userDefenseStatus,
  items,
}: Props) {
  const {
    status,
    enemy,
    battleLog,
    playerAttackAnim,
    enemyAttackAnim,
    victory,
    defeat,
    userLevel,
    userItems,
    cleanup,
    handleAttack,
    handleUseItem,
    previousLevel,
  } = useBattleEngine({
    userInfo: userInfo,
    enemyData: enemyData,
    dropItems,
    userAttackStatus,
    userDefenseStatus,
    items: items,
  });

  useEffect(() => {
    return cleanup;
  }, []);

  const userStatusComponentData = {
    name: status?.user.name ?? "",
    hp: status?.hp ?? 0,
    maxHp: status?.maxHp ?? 0,
    handleAttack: handleAttack,
    switchUseItem: handleUseItem,
  };
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_center,rgba(30,30,50,1),rgba(5,10,20,1))] p-4 md:p-8 font-mono">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Log battleLog={battleLog} />

        {/* バトルエリア */}
        <BattleArea
          enemy={enemy}
          enemyAttackAnim={enemyAttackAnim}
          playerAttackAnim={playerAttackAnim}
          userName={status?.user.name ?? ""}
        />

        {/* ステータス＋操作 */}
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          {/* 敵ステータス */}
          <EnemyStatus enemy={enemy!} />

          {/* プレイヤー操作 */}
          <PlayerStatus
            userStatus={userStatusComponentData}
            itemsData={userItems ?? []}
          />
        </div>
      </div>
      {(victory || defeat) && (
        <Result
          victory={victory}
          exp={enemy?.exp ?? 0}
          gold={enemy?.coin ?? 0}
          monsterDrop={dropItems.monsterDrop}
          nomalDrop={dropItems.normalDrop}
          level={userLevel}
          previousLevel={previousLevel}
        />
      )}
    </main>
  );
}
