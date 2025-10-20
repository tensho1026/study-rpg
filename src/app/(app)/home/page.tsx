"use client";

import { StatusWindow } from "@/components/status-window";
import { EquipmentWindow } from "@/components/equipment-window";
import { StudyTimer } from "@/components/study-timer";
import { MessageBox } from "@/components/message-box";
import { useSession } from "next-auth/react";
import { getHomeData } from "@/app/actions/getHomeData";
import { useEffect, useState } from "react";

type HomeData = {
  userStatus: {
    level: number;
    exp: number;
    money: number;
    totalStudy: number;
  } | null;
  todayStudyRecord: {
    minutes: number;
  };
};

export default function StudyQuestPage() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const { data } = useSession();
  console.log(data,'ログイン情報');

  useEffect(() => {
    const fetchdata = async () => {
      const datas = await getHomeData();
      setHomeData(datas ?? null);
      console.log(datas, "ホームデータ");
    };

    fetchdata();
  }, []);


  const totalMinutes = homeData?.todayStudyRecord?.minutes ?? 0;
  const totalHours = Math.floor(totalMinutes / 60);
  const restMinutes = totalMinutes % 60;

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

        <MessageBox />

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Status */}
          <div className="space-y-4">
            <StatusWindow
              level={homeData?.userStatus?.level ?? 0}
              exp={homeData?.userStatus?.exp ?? 0}
              coins={homeData?.userStatus?.money ?? 0}
              totalStudyTime={homeData?.userStatus?.totalStudy ?? 0}
            />

            <EquipmentWindow />
          </div>

          {/* Center Column - Timer & Character */}
          <div className="lg:col-span-2 space-y-4">
            <StudyTimer
              total={totalMinutes}
              totalHours={totalHours}
              totalMinutes={restMinutes}
            />

            {/* Character Display */}
          </div>
        </div>
      </div>
    </main>
  );
}
