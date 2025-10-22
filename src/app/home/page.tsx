import { getHomeData } from "@/app/actions/getHomeData";
import { StatusWindow } from "@/components/status-window";
import { StudyTimer } from "@/components/study-timer";

export default async function StudyQuestPage() {
  const homeData = await getHomeData();

  const todayMinutes = homeData?.todayStudyRecord?.minutes ?? 0;
  const totalHours = Math.floor(todayMinutes / 60);
  const restMinutes = todayMinutes % 60;
  const dailyGoalMinutes = 240;

  return (
    <div className="mx-auto flex w-full  flex-col gap-8 md:px-8">
      {/* 横長ヘッダーに配置 */}

      <StatusWindow
        level={homeData?.userStatus?.level ?? 0}
        exp={homeData?.userStatus?.exp ?? 0}
        coins={homeData?.userStatus?.money ?? 0}
        totalStudyTime={homeData?.userStatus?.totalStudy ?? 0}
      />

      {/* 中央の記録UI */}

      <StudyTimer
        total={todayMinutes}
        totalHours={totalHours}
        totalMinutes={restMinutes}
        goalMinutes={dailyGoalMinutes}
      />
    </div>
  );
}
