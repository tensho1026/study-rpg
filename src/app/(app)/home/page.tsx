"use client";

import { useState, useEffect } from "react";
import { StatusWindow } from "@/components/status-window";
import { EquipmentWindow } from "@/components/equipment-window";
import { StudyTimer } from "@/components/study-timer";
import { MessageBox } from "@/components/message-box";
import { useSession } from "next-auth/react";

export default function StudyQuestPage() {
  const { data } = useSession();
  console.log(data);
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [currentEquipment, setCurrentEquipment] = useState({
    weapon: "木の剣",
    armor: "布の服",
    accessory: "なし",
  });
  const [message, setMessage] = useState("勉強を始めて経験値を稼ごう！");

  const expToNextLevel = level * 100;

  useEffect(() => {
    if (exp >= expToNextLevel) {
      setLevel((prev) => prev + 1);
      setExp((prev) => prev - expToNextLevel);
      setMessage(`レベルアップ！ Lv.${level + 1} になった！`);
    }
  }, [exp, expToNextLevel, level]);

  const handleStudyComplete = (minutes: number) => {
    const earnedExp = minutes * 10;
    const earnedCoins = minutes * 5;

    setExp((prev) => prev + earnedExp);
    setCoins((prev) => prev + earnedCoins);
    setTotalStudyTime((prev) => prev + minutes);
    setMessage(`${minutes}分勉強した！ EXP+${earnedExp} G+${earnedCoins}`);
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl text-foreground mb-2 text-balance">
            勉強クエスト
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            STUDY QUEST RPG
          </p>
        </div>

         <MessageBox message={message} />

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Status */}
          <div className="space-y-4">
            <StatusWindow
              level={level}
              exp={exp}
              expToNextLevel={expToNextLevel}
              coins={coins}
              totalStudyTime={totalStudyTime}
            />

            <EquipmentWindow
              equipment={currentEquipment}
              coins={coins}
              onEquipmentChange={setCurrentEquipment}
              onCoinsChange={setCoins}
            />
          </div>

          {/* Center Column - Timer & Character */}
          <div className="lg:col-span-2 space-y-4">
            <StudyTimer todayTotalMinutes={totalStudyTime} onStudyComplete={handleStudyComplete} />

           

            {/* Character Display */}
          </div>
        </div>
      </div>
    </main>
  );
}
