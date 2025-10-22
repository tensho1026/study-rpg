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
    <main className="min-h-screen bg-[#08090F] text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-8">
        {/* メッセージボックスは常に表示しないで通知が来るタイミングで出す */}
        {/* <section className="mx-auto w-full max-w-3xl">
          <MessageBox />
        </section> */}

        <div className="flex flex-col gap-10 lg:gap-12">
          <section className="w-full">
            <div className="mx-auto w-full max-w-3xl">
              <StudyTimer
                total={todayMinutes}
                totalHours={totalHours}
                totalMinutes={restMinutes}
                goalMinutes={dailyGoalMinutes}
              />
            </div>
          </section>

          <aside className="w-full">
            <div className="mx-auto w-full max-w-xl lg:max-w-sm lg:ml-auto lg:pt-4">
              <StatusWindow
                level={homeData?.userStatus?.level ?? 0}
                exp={homeData?.userStatus?.exp ?? 0}
                coins={homeData?.userStatus?.money ?? 0}
                totalStudyTime={homeData?.userStatus?.totalStudy ?? 0}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
