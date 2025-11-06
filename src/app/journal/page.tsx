"use client";

import { AppMenuButton } from "@/components/common/app-menu-button";
import { Card } from "@/components/ui/card";

const STUDY_OVERVIEW = [
  {
    label: "総勉強時間",
    value: "1,245 分",
    description: "先月から +12%",
  },
  {
    label: "今週の合計",
    value: "540 分",
    description: "5 セッション",
  },
  {
    label: "今日の勉強",
    value: "120 分",
    description: "2 セッション",
  },
];

const WEEKLY_BREAKDOWN = [
  {
    dayLabel: "05/11 (土)",
    minutes: 120,
    focus: "図書館で数学と英語の集中学習",
    barWidth: 96,
  },
  {
    dayLabel: "05/10 (金)",
    minutes: 90,
    focus: "英語リスニングとシャドーイング",
    barWidth: 82,
  },
  {
    dayLabel: "05/09 (木)",
    minutes: 75,
    focus: "数学の復習問題を解いた",
    barWidth: 68,
  },
  {
    dayLabel: "05/08 (水)",
    minutes: 60,
    focus: "歴史の暗記カードを整理",
    barWidth: 55,
  },
  {
    dayLabel: "05/07 (火)",
    minutes: 45,
    focus: "英単語テスト対策",
    barWidth: 42,
  },
  {
    dayLabel: "05/06 (月)",
    minutes: 30,
    focus: "理科のワークを1章クリア",
    barWidth: 28,
  },
  {
    dayLabel: "05/05 (日)",
    minutes: 120,
    focus: "模試の振り返りと弱点分析",
    barWidth: 96,
  },
];

const SESSION_LOGS = [
  {
    timeframe: "05/11 09:00 - 11:00",
    title: "図書館自習",
    detail: "数Ⅰ・数Aの演習を2セット／英語長文1本",
    minutes: 120,
  },
  {
    timeframe: "05/10 20:00 - 21:30",
    title: "オンライン英語",
    detail: "リスニング + シャドーイング",
    minutes: 90,
  },
  {
    timeframe: "05/09 18:30 - 19:45",
    title: "復習タイム",
    detail: "数学の小テスト直し",
    minutes: 75,
  },
  {
    timeframe: "05/08 19:00 - 20:00",
    title: "歴史暗記",
    detail: "江戸時代の年号チェック",
    minutes: 60,
  },
];

const STUDY_NOTES = [
  "連続学習 9 日目達成。次は 2 桁を目指そう。",
  "図書館での午前ブロックが集中タイムとして機能している。",
  "模試の復習ノートを週末にまとめる予定。",
];

const UPCOMING_FOCUS = [
  {
    topic: "英語長文",
    goal: "毎日 3 本を音読 + 要約",
    status: "プラン作成済み",
  },
  {
    topic: "数学図形",
    goal: "苦手単元を 2 セクション復習",
    status: "木曜の夜に着手",
  },
  {
    topic: "理科実験",
    goal: "次回の授業前に実験記録をまとめる",
    status: "資料集読み込み中",
  },
];

export default function JournalPage() {
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
                  勉強時間と内容をざっくり振り返って、次の一歩につなげよう。
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background/60 px-4 py-3 text-right text-xs text-muted-foreground md:text-sm">
              <p className="text-muted-foreground">今週の合計</p>
              <p className="text-xl font-semibold text-card-foreground md:text-2xl">
                {STUDY_OVERVIEW[1].value}
              </p>
              <p className="text-[11px] text-muted-foreground/80 md:text-xs">
                {STUDY_OVERVIEW[1].description}
              </p>
            </div>
          </div>
        </Card>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="rpg-window bg-card p-5 md:p-6 space-y-4">
            <h2 className="text-sm text-card-foreground md:text-base">
              学習のハイライト
            </h2>
            <div className="grid grid-cols-1 gap-3 text-xs md:text-sm sm:grid-cols-3">
              {STUDY_OVERVIEW.map((item) => (
                <div
                  key={item.label}
                  className="bg-background border-2 border-border p-3"
                >
                  <p className="text-muted-foreground">{item.label}</p>
                  <p className="text-lg font-bold text-card-foreground md:text-xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground md:text-xs">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rpg-window bg-card p-5 md:p-6 space-y-4">
            <h2 className="text-sm text-card-foreground md:text-base">
              今週のメモ
            </h2>
            <div className="bg-background border-2 border-border p-4 space-y-2 text-xs text-muted-foreground md:text-sm">
              {STUDY_NOTES.map((note) => (
                <p key={note}>・{note}</p>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
          <Card className="rpg-window bg-card p-5 md:p-6 space-y-6">
            <div className="space-y-1">
              <h2 className="text-sm text-card-foreground md:text-base">
                今週の勉強時間
              </h2>
              <p className="text-xs text-muted-foreground md:text-sm">
                日ごとの勉強量をチェック。バーが長いほど集中して取り組めた日。
              </p>
            </div>

            <div className="space-y-5">
              {WEEKLY_BREAKDOWN.map((day) => (
                <div key={day.dayLabel} className="space-y-2">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="font-semibold text-card-foreground">
                      {day.dayLabel}
                    </span>
                    <span className="font-semibold text-accent">
                      {day.minutes} 分
                    </span>
                  </div>
                  <div className="h-2 w-full rounded bg-muted/40">
                    <div
                      className="h-full rounded bg-primary transition-all"
                      style={{ width: `${day.barWidth}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground md:text-xs">
                    {day.focus}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
