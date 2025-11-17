"use client";

import { useState } from "react";
import { Crown, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateGuildForm, createGuildSchemaRaw } from "@/lib/schemas/guild";
import createGuildAction from "@/app/actions/guild/createGuildAction";
import { useRouter } from "next/navigation";

type GuildProfile = {
  id: string;
  name: string;
  description: string;
  members: number;
  leader: string;
};

const guildList: GuildProfile[] = [
  {
    id: "dawn-brigade",
    name: "暁の旅団",
    description:
      "週末は連合討伐、平日はまったりとクエスト消化。社会人中心の夜型ギルドです。",
    members: 27,
    leader: "リティア",
  },
  {
    id: "midnight-cafe",
    name: "深夜喫茶ロゼ",
    description:
      "固定メンバーで小規模に活動するギルド。雑談やハウジングなどゆったり勢向け。",
    members: 14,
    leader: "シエル",
  },
  {
    id: "valor-company",
    name: "蒼刃騎士団",
    description:
      "ランキング上位を狙うハードコア勢。攻略資料やルート管理なども徹底しています。",
    members: 32,
    leader: "ダリオ",
  },
];

export default function Setup() {
  const [selectedGuild, setSelectedGuild] = useState<GuildProfile | null>(null);
  const [isGuildModalOpen, setIsGuildModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(createGuildSchemaRaw),
  });

  const handleSelectGuild = (guild: GuildProfile) => {
    setSelectedGuild(guild);
    setIsGuildModalOpen(true);
  };

  const closeGuildModal = () => {
    setIsGuildModalOpen(false);
    setSelectedGuild(null);
  };

  const onSubmit = async (data: CreateGuildForm) => {
    const guildId = await createGuildAction(data.name, data.description);
    setIsCreateModalOpen(false);
    router.push(`/guild/${guildId}`);
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 lg:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/60">
          Guild Setup
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          まだギルドに所属していません
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          気になるギルドへ申請するか、自分のギルドを立ち上げて仲間を集めましょう。
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <Card className="border-primary/10">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Users className="size-4" />
              <span>ギルドを選んで詳細を確認</span>
            </div>
            <CardTitle className="text-2xl">参加申請を送る</CardTitle>
            <CardDescription>
              気になるギルドをクリックして情報をチェックし、納得したらそのまま申請を送りましょう。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2 ">
              {guildList.map((guild) => (
                <button
                  key={guild.id}
                  type="button"
                  onClick={() => handleSelectGuild(guild)}
                  className="flex h-full flex-col gap-3 rounded-xl border border-border/40  p-4 text-left transition hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-lg font-semibold">{guild.name}</span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {guild.members}名
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {guild.description}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="self-start border-dashed border-primary/40 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="size-4" />
              <span>自分の空気でやりたい人向け</span>
            </div>
            <CardTitle className="text-2xl">ギルドを作成する</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              onClick={() => setIsCreateModalOpen(true)}
            >
              ギルドを作成する
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={Boolean(selectedGuild && isGuildModalOpen)}
        onOpenChange={(open) => {
          if (!open) {
            closeGuildModal();
          }
        }}
      >
        <DialogContent className="max-w-xl space-y-6 text-left">
          <DialogHeader className="text-left">
            <DialogTitle>{selectedGuild?.name ?? ""}</DialogTitle>
          </DialogHeader>
          {selectedGuild ? (
            <>
              <div className="grid gap-4 rounded-xl border bg-muted/30 p-4 text-sm md:grid-cols-2">
                <div>
                  <p className="text-muted-foreground">リーダー</p>
                  <p className="mt-1 flex items-center gap-1 text-base font-semibold">
                    <Crown className="size-4 text-amber-500" />{" "}
                    {selectedGuild.leader}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">メンバー</p>
                  <p className="mt-1 text-base font-semibold">
                    {selectedGuild.members}人
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  ギルド紹介
                </p>
                <p className="mt-2 leading-relaxed">
                  {selectedGuild.description}
                </p>
              </div>
            </>
          ) : null}
          <div className="flex flex-wrap justify-end gap-3">
            <Button variant="outline" onClick={closeGuildModal}>
              閉じる
            </Button>
            <Button>このギルドに申請する</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="space-y-6 text-left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="text-left">
              <DialogTitle>新しいギルドを作成</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guild-name">ギルド名</Label>
                <Input
                  id="guild-name"
                  placeholder="例：蒼穹の旅団"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="guild-description">紹介文</Label>
                <Textarea id="guild-description" {...register("description")} />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                type="submit"
              >
                やめておく
              </Button>
              <Button>この内容で作成する</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
