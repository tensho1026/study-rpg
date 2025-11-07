"use client";

import { AppMenuButton } from "@/components/common/app-menu-button";
// import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatMinutes } from "@/utils/formatMinutes";
// import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// const GRAPH_META = {
//   range: "2024年5月6日〜2024年5月12日",
//   summary: "7 件の記録",
// };

// const GRAPH_DATA = [
//   {
//     date: "5/6(月)",
//     total: "6時間20分",
//   },
//   {
//     date: "5/7(火)",
//     total: "5時間10分",
//   },
//   {
//     date: "5/8(水)",
//     total: "4時間45分",
//   },
//   {
//     date: "5/9(木)",
//     total: "5時間32分",
//   },
//   {
//     date: "5/10(金)",
//     total: "6時間02分",
//   },
//   {
//     date: "5/11(土)",
//     total: "6時間27分",
//   },
//   {
//     date: "5/12(日)",
//     total: "5時間51分",
//   },
// ];

type JournalData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  todayStudyRecord: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisWeekRecord: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisMonthRecord: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  totalStudy: any;
};

export default function Journal({ initialData }: { initialData: JournalData }) {
  const dataMap = {
    day: initialData.todayStudyRecord,
    week: initialData.thisWeekRecord,
    month: initialData.thisMonthRecord,
    total: initialData.totalStudy,
  };

  const totalWeekMinutes = dataMap.week.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, item: any) => sum + item.minutes,
    0
  );
  const totalMonthMinutes = dataMap.month.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, item: any) => sum + item.minutes,
    0
  );

  const STUDY_TOTALS = [
    { label: "今日の勉強時間", value: formatMinutes(dataMap.day) },
    { label: "今週の勉強時間", value: formatMinutes(totalWeekMinutes) },
    { label: "今月の勉強時間", value: formatMinutes(totalMonthMinutes) },
    { label: "これまでの合計", value: formatMinutes(dataMap.total) },
  ];

  // const GRAPH_TABS = [
  //   { id: "day", label: "日" },
  //   { id: "week", label: "週" },
  //   { id: "month", label: "月" },
  // ] as const;

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

        {/* <Card className="rpg-window bg-card p-5 md:p-6 space-y-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-background/60 p-1">
              {GRAPH_TABS.map((tab) => {
                return (
                  <Button key={tab.id} type="button" size="sm">
                    {tab.label}
                  </Button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-card-foreground"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <p className="text-xs text-muted-foreground md:text-sm">
                {GRAPH_META.range}
              </p>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-card-foreground"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="flex w-full items-center justify-between border-dashed text-xs text-muted-foreground md:text-sm"
            >
              すべての記録を表示
              <ChevronDown className="size-4" />
            </Button>
            <p className="text-[11px] text-muted-foreground md:text-xs">
              {GRAPH_META.summary}
            </p>
          </div>

          <div className="flex items-center justify-center overflow-x-auto pb-3">
            <div className="flex  min-w-[560px] items-end gap-4">
              {GRAPH_DATA.map((item) => (
                <div
                  key={item.date}
                  className="flex flex-col items-center text-center"
                >
                  <p className="text-[11px] text-muted-foreground md:text-xs">
                    {item.total}
                  </p>
                  <div className="mt-2 flex h-40 w-10 flex-col-reverse overflow-hidden rounded-md border border-border bg-muted/30 md:w-12">
                    <span
                      className={`bg-red-400 w-full`}
                      style={{ height: `${60}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground md:text-xs">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card> */}
      </div>
    </main>
  );
}
