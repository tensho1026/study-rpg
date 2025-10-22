import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Compass,
  History,
  Home,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";

import { getHomeData } from "@/app/actions/getHomeData";
import { EquipmentWindow } from "@/components/equipment-window";
import { MessageBox } from "@/components/message-box";
import { StatusWindow } from "@/components/status-window";
import { StudyTimer } from "@/components/study-timer";

type QuickLink = {
  label: string;
  description: string;
  icon: LucideIcon;
};

export default async function StudyQuestPage() {
  const homeData = await getHomeData();

  const todayMinutes = homeData?.todayStudyRecord?.minutes ?? 0;
  const totalHours = Math.floor(todayMinutes / 60);
  const restMinutes = todayMinutes % 60;
  const dailyGoalMinutes = 240;
  const goalProgress = Math.max(
    0,
    Math.min(100, Math.round((todayMinutes / dailyGoalMinutes) * 100))
  );
  const remainingMinutes = Math.max(0, dailyGoalMinutes - todayMinutes);

  const dailyMissions = [
    {
      icon: "🎯",
      title: "集中セッション ×2",
      description: "25分の集中タイムを2回クリアしよう。",
    },
    {
      icon: "📚",
      title: "復習クエスト",
      description: "昨日のノートを10分読み返す。",
    },
    {
      icon: "📝",
      title: "記録更新",
      description: "今日の進捗を3回登録しよう。",
    },
  ];

  const quickLinks: QuickLink[] = [
    {
      label: "学習履歴",
      description: "グラフとカレンダーで振り返る",
      icon: History,
    },
    {
      label: "成長レポート",
      description: "EXP推移と称号をチェック",
      icon: BarChart3,
    },
  ];

  const achievementBadges = [
    {
      icon: "🔥",
      title: "連続ログイン",
      description: "3日連続で学習記録中",
      status: "継続",
    },
    {
      icon: "🌱",
      title: "集中の芽生え",
      description: "1日120分の学習まであと少し",
      status: "進行中",
    },
    {
      icon: "🏰",
      title: "ギルドメンバー",
      description: "ギルドクエスト 2 / 4",
      status: "挑戦中",
    },
  ];

  const sideMenu: Array<{ label: string; icon: LucideIcon; active?: boolean }> =
    [
      { label: "ホーム", icon: Home, active: true },
      { label: "クエスト", icon: Compass },
      { label: "図書館", icon: BookOpenCheck },
      { label: "称号", icon: Trophy },
      { label: "パーティ", icon: Users },
    ];

  return (
    <main className="min-h-screen bg-[#08090F] text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-8">
        <header className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-white/50">
            Study Quest RPG
          </p>
          <h1 className="text-3xl font-semibold text-white md:text-5xl">
            勉強クエスト
          </h1>
          <p className="text-sm text-white/60">
            日々の学習を冒険に変える、あなただけのホームベース
          </p>
        </header>

        <section className="mx-auto w-full max-w-3xl">
          <MessageBox />
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.75fr_1fr]">
          <div className="space-y-6">
            <StudyTimer
              total={todayMinutes}
              totalHours={totalHours}
              totalMinutes={restMinutes}
              goalMinutes={dailyGoalMinutes}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
                      <Target className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                        デイリーミッション
                      </p>
                      <h3 className="text-base font-semibold text-white">
                        今日のクエスト
                      </h3>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/60">
                    推奨
                  </span>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  {dailyMissions.map((mission) => (
                    <li
                      key={mission.title}
                      className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-900/60 px-3 py-3 shadow-inner shadow-black/40"
                    >
                      <span className="text-lg leading-none">{mission.icon}</span>
                      <div>
                        <p className="font-semibold text-white">
                          {mission.title}
                        </p>
                        <p className="text-xs text-white/60">
                          {mission.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/30">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200">
                    <History className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                      振り返り
                    </p>
                    <h3 className="text-base font-semibold text-white">
                      履歴と分析
                    </h3>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {quickLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.label}
                        href="#"
                        className="group flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/50 px-4 py-3 text-sm text-white/80 shadow-inner shadow-black/40 transition hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:text-white"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-cyan-200">
                            <Icon className="size-4" />
                          </span>
                          <div>
                            <p className="font-semibold text-white">
                              {link.label}
                            </p>
                            <p className="text-xs text-white/60">
                              {link.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="size-4 text-cyan-200 transition group-hover:translate-x-1" />
                      </Link>
                    );
                  })}
                  <p className="text-[11px] text-white/50">
                    ※ 現在はUIのみです。今後のアップデートで遷移が追加されます。
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-amber-400/15 text-amber-200">
                    <BarChart3 className="size-6" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                      今日の進捗率
                    </p>
                    <p className="text-3xl font-semibold text-white">
                      {goalProgress}%
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/70">
                  目標まで残り {remainingMinutes} 分
                </span>
              </div>
              <p className="mt-4 text-sm text-white/70">
                目標勉強時間 {dailyGoalMinutes} 分に対して、現在は {todayMinutes} 分を記録済みです。
                集中できるタイミングで細かく記録すると、EXPボーナスが獲得しやすくなります。
              </p>
              <div className="mt-4 grid gap-3 text-xs text-white/70 sm:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-slate-900/60 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
                    次のご褒美
                  </p>
                  <p className="mt-2 text-sm text-white">
                    レベルアップ報酬: 100G + 新称号
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-slate-900/60 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
                    モチベーションメモ
                  </p>
                  <p className="mt-2 text-sm text-white">
                    15分のリフレッシュを入れて集中力を維持しよう。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <StatusWindow
              level={homeData?.userStatus?.level ?? 0}
              exp={homeData?.userStatus?.exp ?? 0}
              coins={homeData?.userStatus?.money ?? 0}
              totalStudyTime={homeData?.userStatus?.totalStudy ?? 0}
            />

            <EquipmentWindow />

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/30">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
                  <Sparkles className="size-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                    バッジコレクション
                  </p>
                  <h3 className="text-base font-semibold text-white">
                    称号・バッジ
                  </h3>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                {achievementBadges.map((badge) => (
                  <div
                    key={badge.title}
                    className="flex items-start justify-between rounded-xl border border-white/5 bg-slate-900/60 px-4 py-3 shadow-inner shadow-black/40"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg leading-none">{badge.icon}</span>
                      <div>
                        <p className="font-semibold text-white">{badge.title}</p>
                        <p className="text-xs text-white/60">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                      {badge.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <nav className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-inner shadow-black/40">
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                メニュー
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {sideMenu.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                          item.active
                            ? "border-cyan-400/60 bg-cyan-500/20 text-white shadow-[0_0_18px_rgba(14,165,233,0.25)]"
                            : "border-white/5 bg-white/5 text-white/70 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/10">
                            <Icon className="size-4" />
                          </span>
                          {item.label}
                        </span>
                        <ArrowRight className="size-4" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
}
