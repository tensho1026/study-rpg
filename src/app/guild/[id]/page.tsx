import getGuildByIdAction from "@/app/actions/guild/getGuildByIdAction";
import isUserGuild from "@/app/actions/guild/isUserGuild";
import { AppMenuButton } from "@/components/common/app-menu-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createMessageSchemaRaw } from "@/lib/schemas/guild/message";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRightLeft,
  Crown,
  MessageCircle,
  Shield,
  Timer,
  Users,
} from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

const chatLog = [
  {
    author: "アリア",
    message: "夜の集中タイム 21:00 からスタートします！",
    time: "19:42",
  },
  {
    author: "ミナト",
    message: "今日の模試レビューまとめました。資料庫参照してね。",
    time: "18:10",
  },
  {
    author: "ユナ",
    message: "リスニング素材を交換したい人いますか？",
    time: "16:55",
  },
];

const tradeItems = [
  {
    id: "T-01",
    item: "集中ポーション ×3",
    owner: "カイト",
    want: "計算ドリル",
  },
  { id: "T-02", item: "ノートテンプレ", owner: "ユナ", want: "コイン 150G" },
  { id: "T-03", item: "暗記カード", owner: "レン", want: "装備素材" },
];

type Props = {
  params: {
    id: string;
  };
};

export default async function GuildPage({ params }: Props) {
  const isInGuild = await isUserGuild();
  if (!isInGuild) {
    redirect("/guild/setup");
  }
  const { id } = await params;
  const guildData = await getGuildByIdAction(id);
  console.log(id);
  console.log(guildData, "ギルドデータ");
  if (!guildData) {
    return;
  }

  const totalStudy = guildData.members.reduce((sum, member) => {
    return sum + (member.user.userStatus?.totalStudy ?? 0);
  }, 0);

  const totalLevel = guildData.members.reduce((sum, member) => {
    return sum + (member.user.userStatus?.level ?? 0);
  }, 0);
  const averageLevel = totalLevel / guildData.members.length;
  console.log(averageLevel);
  const guildStats = [
    {
      label: "メンバー数",
      value: `0${guildData?.members.length}`,
      icon: Users,
    },
    {
      label: "合計勉強時間",
      value: ` ${totalStudy} 分`,
      icon: Timer,
    },
    { label: "平均レベル", value: `Lv.${averageLevel} `, icon: Shield },
    // { label: "今週の寄付", value: "4,200 G", icon: Coins },
  ];

  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm({
  //   resolver: zodResolver(createMessageSchemaRaw),
  // });
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3 md:items-center">
            <AppMenuButton className="border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white" />
            <div>
              <h1 className="text-3xl font-semibold text-white md:text-4xl">
                {guildData?.name}
              </h1>
            </div>
          </div>
          <Button
            asChild
            className="rounded-xl bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-400"
          >
            <Link href="/home">ホームに戻る</Link>
          </Button>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guildStats.map((stat) => (
            <Card
              key={stat.label}
              className="border border-white/10 bg-white/5 p-4 text-sm text-white/70"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                  {stat.label}
                </span>
                <stat.icon className="size-5 text-emerald-200" />
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">
                {stat.value}
              </p>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-6 border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  ギルドチャット
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  今日の作戦会議
                </h2>
              </div>
              <MessageCircle className="size-8 text-cyan-200" />
            </div>

            <div className="space-y-4">
              {chatLog.map((log) => (
                <div
                  key={log.time}
                  className="rounded-xl border border-white/10 bg-slate-900/60 p-4 shadow-inner shadow-black/20"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                    <span>{log.author}</span>
                    <span>{log.time}</span>
                  </div>
                  <p className="mt-2 text-sm text-white">{log.message}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="text"
                placeholder="メッセージを入力..."
                className="flex-1 rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none"
              />
              <Button className="rounded-xl bg-white/20 text-white shadow hover:bg-white/30">
                送信 (準備中)
              </Button>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Member Board
                  </p>
                  <h2 className="text-xl font-semibold text-white">
                    メンバー一覧
                  </h2>
                </div>
                <Crown className="size-6 text-amber-200" />
              </div>

              <div className="mt-4 space-y-3 text-sm">
                {guildData.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3"
                  >
                    <div>
                      <p className="text-base font-semibold text-white">
                        {member.user.name}
                        <span className="text-sm text-emerald-200 pl-8">
                          {member.userId === guildData.leaderId
                            ? "リーダー"
                            : null}
                        </span>
                      </p>
                      <p className="text-xs text-white/60">
                        Lv.{member.user.userStatus?.level} /
                        {member.user.userStatus?.totalStudy} 分
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-xs text-white/80 hover:text-white"
                    >
                      プロフィール
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Trade Board
                  </p>
                  <h2 className="text-xl font-semibold text-white">
                    交換リクエスト
                  </h2>
                </div>
                <ArrowRightLeft className="size-6 text-cyan-200" />
              </div>

              <div className="mt-4 space-y-3 text-sm text-white">
                {tradeItems.map((trade) => (
                  <div
                    key={trade.id}
                    className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                      <span>{trade.owner}</span>
                      <span>{trade.id}</span>
                    </div>
                    <p className="mt-2 text-base font-semibold">{trade.item}</p>
                    <p className="text-xs text-white/70">
                      交換希望: {trade.want}
                    </p>
                    <Button className="mt-3 w-full rounded-lg bg-white/20 text-white hover:bg-white/30">
                      提案する (UIのみ)
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
