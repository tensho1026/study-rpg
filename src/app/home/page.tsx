import { getHomeData } from "@/app/actions/getHomeData";
import { StatusWindow } from "@/components/status-window";
import { StudyTimer } from "@/components/study-timer";
import { levelBorder } from "@/constant/levelBorder";

export default async function StudyQuestPage() {
  const homeData = await getHomeData();
  console.log(homeData);

  const userStatus = homeData?.userStatus;
  if (!userStatus) return;

  const { level: userLevel, exp: userExp } = userStatus;

  // 現在のレベル境界と次のレベル境界
  const currentLevelBorder = levelBorder[userLevel - 1];
  const nextLevelBorder = levelBorder[userLevel];

  // 必要経験値と現在の進捗
  const requiredExp = nextLevelBorder - currentLevelBorder;
  const gainedExp = userExp - currentLevelBorder;

  // 進捗率（%）
  const progressPercent = Number(((gainedExp / requiredExp) * 100).toFixed(0));

  console.log("必要経験値:", requiredExp);
  console.log("現在の進捗経験値:", gainedExp);
  console.log("進捗率:", progressPercent, "%");

  const todayMinutes = homeData?.todayStudyRecord?.minutes ?? 0;
  const totalHours = Math.floor(todayMinutes / 60);
  const restMinutes = todayMinutes % 60;
  const dailyGoalMinutes = 240;

  return (
    <div className="mx-auto flex w-full  flex-col gap-8 md:px-8">
      {/* 横長ヘッダーに配置 */}

      <StatusWindow
        level={homeData?.userStatus?.level ?? 0}
        expProgress={progressPercent}
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
