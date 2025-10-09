"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type RangeKey = "week" | "month" | "all"

const JOURNAL_SUMMARY = {
  totalMinutes: 1245,
  totalSessions: 52,
  longestStreak: 9,
  lastUpdate: "2024/05/11 22:30",
}

const JOURNAL_SECTIONS: Record<RangeKey, Array<{ date: string; title: string; minutes: number; exp: number; memo?: string }>> =
  {
    week: [
      { date: "05/11", title: "図書館で読書", minutes: 60, exp: 600, memo: "集中できた" },
      { date: "05/10", title: "英語リスニング", minutes: 30, exp: 300 },
      { date: "05/09", title: "数学の復習", minutes: 45, exp: 450, memo: "二次関数クリア" },
      { date: "05/08", title: "歴史の暗記", minutes: 25, exp: 250 },
    ],
    month: [
      { date: "05/11", title: "図書館で読書", minutes: 60, exp: 600, memo: "集中できた" },
      { date: "05/10", title: "英語リスニング", minutes: 30, exp: 300 },
      { date: "05/09", title: "数学の復習", minutes: 45, exp: 450, memo: "二次関数クリア" },
      { date: "05/05", title: "模試の振り返り", minutes: 80, exp: 800 },
      { date: "05/03", title: "理科ワーク", minutes: 40, exp: 400 },
      { date: "04/30", title: "英単語テスト対策", minutes: 35, exp: 350 },
    ],
    all: [
      { date: "05/11", title: "図書館で読書", minutes: 60, exp: 600, memo: "集中できた" },
      { date: "05/10", title: "英語リスニング", minutes: 30, exp: 300 },
      { date: "05/09", title: "数学の復習", minutes: 45, exp: 450, memo: "二次関数クリア" },
      { date: "05/05", title: "模試の振り返り", minutes: 80, exp: 800 },
      { date: "05/03", title: "理科ワーク", minutes: 40, exp: 400 },
      { date: "04/30", title: "英単語テスト対策", minutes: 35, exp: 350 },
      { date: "04/27", title: "読書ログ", minutes: 20, exp: 200 },
      { date: "04/24", title: "数学テスト対策", minutes: 55, exp: 550 },
    ],
  }

export default function JournalPage() {
  const [range, setRange] = useState<RangeKey>("week")
  const entries = JOURNAL_SECTIONS[range]

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        <section className="rpg-window bg-card px-6 py-8 md:px-10 md:py-12 space-y-4">
          <div className="space-y-3 text-center">
            <span className="text-xs md:text-sm tracking-[0.4em] text-accent uppercase">Adventure Log</span>
            <h1 className="text-3xl md:text-4xl text-card-foreground">冒険の書</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              勉強の足跡を記録して、勇者の旅路を振り返ろう。
            </p>
          </div>
          <div className="flex justify-center">
            <Button asChild variant="secondary" className="text-xs md:text-sm px-6 py-3">
              <Link href="/home">ホームへ戻る</Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="rpg-window bg-card p-5 md:p-6 space-y-4">
            <h2 className="text-sm md:text-base text-card-foreground">総冒険時間</h2>
            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm text-muted-foreground">
              <div className="bg-background border-2 border-border p-3">
                <p className="text-muted-foreground">累計時間</p>
                <p className="text-card-foreground text-lg md:text-xl font-bold">{JOURNAL_SUMMARY.totalMinutes} 分</p>
              </div>
              <div className="bg-background border-2 border-border p-3">
                <p className="text-muted-foreground">セッション数</p>
                <p className="text-card-foreground text-lg md:text-xl font-bold">{JOURNAL_SUMMARY.totalSessions} 回</p>
              </div>
              <div className="bg-background border-2 border-border p-3">
                <p className="text-muted-foreground">最長連続日数</p>
                <p className="text-card-foreground text-lg md:text-xl font-bold">{JOURNAL_SUMMARY.longestStreak} 日</p>
              </div>
              <div className="bg-background border-2 border-border p-3">
                <p className="text-muted-foreground">最終更新</p>
                <p className="text-card-foreground text-sm md:text-base font-semibold">{JOURNAL_SUMMARY.lastUpdate}</p>
              </div>
            </div>
          </Card>

          <Card className="rpg-window bg-card p-5 md:p-6 space-y-4">
            <h2 className="text-sm md:text-base text-card-foreground">冒険メモ</h2>
            <div className="bg-background border-2 border-border p-4 space-y-3 text-xs md:text-sm text-muted-foreground">
              <p>・連続9日達成！この調子でレベルアップを狙おう。</p>
              <p>・5/11の図書館セッションが自己ベスト（60分）。</p>
              <p>・英語リスニングは週3回クリア中。</p>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <Card className="rpg-window bg-card p-5 md:p-6 space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-sm md:text-base text-card-foreground">冒険記録一覧</h2>
                <p className="text-xs md:text-sm text-muted-foreground">期間別に勉強ログを振り返ろう</p>
              </div>
              <div className="flex gap-2">
                {(["week", "month", "all"] as const).map((key) => (
                  <Button
                    key={key}
                    onClick={() => setRange(key)}
                    className={`text-xs md:text-sm px-3 ${
                      range === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {key === "week" && "今週"}
                    {key === "month" && "今月"}
                    {key === "all" && "すべて"}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {entries.map((entry) => (
                <div
                  key={`${range}-${entry.date}-${entry.title}`}
                  className="bg-background border-2 border-border p-4 text-xs md:text-sm text-muted-foreground"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-accent font-semibold">{entry.date}</span>
                      <span className="text-card-foreground">{entry.title}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-card-foreground font-semibold">{entry.minutes} 分</span>
                      <span className="text-secondary font-semibold">EXP +{entry.exp}</span>
                    </div>
                  </div>
                  {entry.memo && <p className="mt-2 text-muted-foreground/80">Memo: {entry.memo}</p>}
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </main>
  )
}
