import { getHomeData } from "@/app/actions/getHomeData";
import { StatusWindow } from "@/components/status-window";
import { StudyTimer } from "@/components/study-timer";
import { levelBorder } from "@/constant/levelBorder";

export default async function StudyQuestPage() {
  const homeData = await getHomeData();
  console.log(homeData);

  const userLevel = homeData?.userStatus?.level;

  if (userLevel === undefined) return;

  // 今のユーザーの階層
  const nowExp = levelBorder[userLevel - 1];

  // 今のユーザーの経験値数
  const nowUserExp = homeData?.userStatus?.exp;

  // 次の階層
  const nextBorder = levelBorder[userLevel];

  // 次の階層までに必要な経験値
  const needExp = nextBorder - nowExp;

  // 次の階層までにどれくらい今進んでいるか
  const nowUser = nowUserExp! - nowExp;

  console.log("次に必要な経験値", needExp);
  console.log("今の階層でどれぐらい進んでいるか", nowUser);
  console.log(nowUserExp, nowExp, "レベルボーダー");

  const progressExp = (nowUser / needExp) * 100;
  const percentage = Number(progressExp.toFixed(1));
  console.log(percentage, "パーセンテージ！");

  const todayMinutes = homeData?.todayStudyRecord?.minutes ?? 0;
  const totalHours = Math.floor(todayMinutes / 60);
  const restMinutes = todayMinutes % 60;
  const dailyGoalMinutes = 240;

  return (
    <div className="mx-auto flex w-full  flex-col gap-8 md:px-8">
      {/* 横長ヘッダーに配置 */}

      <StatusWindow
        level={homeData?.userStatus?.level ?? 0}
        expProgress={percentage}
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
