import { getHomeData } from "@/app/actions/home/getHomeData";
import { StatusWindow } from "@/components/status-window";
import { StudyTimer } from "@/components/study-timer";
import progressExp from "@/lib/progressExp";
import todayStudyTime from "@/lib/todayTime";

export default async function StudyQuestPage() {
  const homeData = await getHomeData();
  console.log(homeData);

  const progressPercent = progressExp(homeData?.userStatus);

  const { todayMinutes, totalHours, restMinutes } = todayStudyTime(
    homeData?.todayStudyRecord?.minutes ?? 0
  );

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
      />
    </div>
  );
}
