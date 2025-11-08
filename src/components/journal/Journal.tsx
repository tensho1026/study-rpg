"use client";

import { AppMenuButton } from "@/components/common/app-menu-button";

import { Card } from "@/components/ui/card";
import { formatMinutes } from "@/utils/formatMinutes";

type JournalData = {
  todayStudyRecord: number;

  thisWeekRecord: { minutes: number }[];
  thisMonthRecord: { minutes: number }[];

  totalStudy: number;
};

export default function Journal({ initialData }: { initialData: JournalData }) {
  const dataMap = {
    day: initialData.todayStudyRecord,
    week: initialData.thisWeekRecord,
    month: initialData.thisMonthRecord,
    total: initialData.totalStudy,
  };


  const totalWeekMinutes = (dataMap.week ?? []).reduce(
    (sum: number, item) => sum + item.minutes,
    0
  );
  const totalMonthMinutes = (dataMap.month ?? []).reduce(
    (sum: number, item) => sum + item.minutes,
    0
  );

  const STUDY_TOTALS = [
    { label: "今日の勉強時間", value: formatMinutes(dataMap.day) },
    { label: "今週の勉強時間", value: formatMinutes(totalWeekMinutes) },
    { label: "今月の勉強時間", value: formatMinutes(totalMonthMinutes) },
    { label: "これまでの合計", value: formatMinutes(dataMap.total) },
  ];

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto flex max-w-5xl flex-col space-y-6 md:space-y-8">
        <Card className="rpg-window bg-card p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3 md:items-center">
              <AppMenuButton
                className="mt-1 border-border bg-background/70 text-card-foreground/80 hover:bg-background/90 hover:text-card-foreground"
                triggerLabel="アプリメニューを開く"
              />
              <div>
                <span className="text-xs md:text-sm tracking-[0.4em] text-accent uppercase">
                  Study Journal
                </span>
                <h1 className="mt-1 text-2xl text-card-foreground md:text-3xl">
                  学習ログ
                </h1>
                <p className="mt-2 text-xs text-muted-foreground md:text-sm">
                  今日からこれまでの学習時間をシンプルに記録。
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="rpg-window bg-card p-5 md:p-6">
          <div className="grid grid-cols-1 gap-3 text-xs text-muted-foreground md:grid-cols-4 md:text-sm">
            {STUDY_TOTALS.map((item) => (
              <div
                key={item.label}
                className="bg-background border-2 border-border p-4"
              >
                <p className="text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-card-foreground md:text-3xl">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
