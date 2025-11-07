import { getHomeData } from "@/app/actions/home/getHomeData";
import { LevelUpNotification } from "@/components/home/level-up-notification";
import { StatusWindow } from "@/components/home/status-window";
import { StudyTimer } from "@/components/home/study-timer";
import progressExp from "@/utils/progressExp";
import todayStudyTime from "@/utils/todayTime";

export default async function StudyQuestPage() {
  const homeData = await getHomeData();

  if (homeData === undefined) return;
  if (homeData?.todayStudyRecord.minutes > 1440) {
    homeData.todayStudyRecord.minutes = 1440;
  }

  const progressPercent = progressExp(homeData?.userStatus);

  const { todayMinutes, totalHours, restMinutes } = todayStudyTime(
    homeData?.todayStudyRecord?.minutes ?? 0
  );

  return (
    <>
      <LevelUpNotification level={homeData?.userStatus?.level ?? 0} />
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
    </>
  );
}
