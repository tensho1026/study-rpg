"use client";

import { AppMenuButton } from "@/components/common/app-menu-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type BattleItem = {
  id: string;
  name: string;
  description: string;
  type: string;
  healHp?: number | null;
  healMp?: number | null;
  removeStatus?: string[];
  element?: string | null;
  power?: number | null;
  durationTurn?: number | null;
  targetType?: string | null;
  price?: number | null;
  rarity?: number | null;
};

const dummyUser = {
  coins: 2480,
  owned: {
    potion: 7,
    hiPotion: 3,
    phoenixDown: 2,
    ether: 5,
    thunderBomb: 1,
    barrierScroll: 4,
  } as Record<string, number>,
};

const dummyItems: BattleItem[] = [
  {
    id: "potion",
    name: "ポーション",
    description: "体力を少し回復する冒険者の定番薬。",
    type: "heal",
    healHp: 150,
    targetType: "ally",
    price: 120,
    rarity: 1,
  },
  {
    id: "hiPotion",
    name: "ハイポーション",
    description: "濃縮された回復薬。緊急時の備えに。",
    type: "heal",
    healHp: 400,
    targetType: "ally",
    price: 380,
    rarity: 2,
  },
  {
    id: "phoenixDown",
    name: "フェニックスの尾",
    description: "倒れた仲間を蘇生する不死鳥の羽。",
    type: "heal",
    removeStatus: ["戦闘不能"],
    targetType: "ally",
    price: 720,
    rarity: 3,
  },
  {
    id: "ether",
    name: "エーテル",
    description: "魔力を凝縮した蒼い液体。MPを回復する。",
    type: "heal",
    healMp: 60,
    targetType: "ally",
    price: 260,
    rarity: 2,
  },
  {
    id: "thunderBomb",
    name: "サンダーボム",
    description: "雷の魔石を詰めた小型手榴弾。敵全体に雷属性ダメージ。",
    type: "attack",
    element: "thunder",
    power: 180,
    targetType: "allEnemies",
    price: 450,
    rarity: 3,
  },
  {
    id: "barrierScroll",
    name: "バリアの巻物",
    description: "味方全体に魔法障壁を張り、短時間防御力を上げる。",
    type: "buff",
    durationTurn: 3,
    targetType: "party",
    price: 520,
    rarity: 4,
  },
];

const typeLabels: Record<string, string> = {
  heal: "回復アイテム",
  attack: "攻撃アイテム",
  buff: "強化アイテム",
  material: "素材",
  key: "重要アイテム",
};

function ItemShopPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Card className="rpg-window border border-white/10 bg-card/95 p-6 shadow-xl shadow-black/30">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3 md:items-center">
              <AppMenuButton className="mt-1 border-border bg-background/70 text-card-foreground/80 hover:bg-background/90 hover:text-card-foreground" />
              <div>
                <h1 className="text-xl font-semibold text-card-foreground md:text-2xl">
                  バトルアイテム屋
                </h1>
                <p className="text-xs text-muted-foreground md:text-sm">
                  戦局を変える切り札、取り揃えております。
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">所持金</p>
              <p className="text-xl font-bold text-emerald-300">
                {dummyUser.coins.toLocaleString()} G
              </p>
            </div>
          </div>
        </Card>

        <section className="space-y-4">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-wide text-card-foreground">
              商品ラインナップ
            </h2>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Item Catalog
            </span>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {dummyItems.map((item) => {
              const owned = dummyUser.owned[item.id] ?? 0;
              const rarity = item.rarity ?? 1;
              const effectChips = (
                [
                  item.healHp ? `HP +${item.healHp}` : null,
                  item.healMp ? `MP +${item.healMp}` : null,
                  item.removeStatus?.length
                    ? `状態異常回復: ${item.removeStatus.join("・")}`
                    : null,
                  item.power ? `威力 ${item.power}` : null,
                  item.element ? `属性: ${item.element}` : null,
                  item.durationTurn ? `持続 ${item.durationTurn}T` : null,
                  item.targetType ? `対象: ${item.targetType}` : null,
                ].filter(Boolean) as string[]
              ).slice(0, 4);

              return (
                <Card
                  key={item.id}
                  className="flex h-full flex-col gap-3 border border-indigo-300/20 bg-slate-950/80 p-5 text-slate-100 shadow-[0_12px_30px_rgba(15,23,42,0.45)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold tracking-wide text-white">
                        {item.name}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.3em] text-indigo-200/80">
                        {"★".repeat(rarity)}
                      </p>
                    </div>
                    <span className="rounded-full border border-indigo-400/30 bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-100">
                      {typeLabels[item.type] ?? item.type}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-200/80">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs text-indigo-100/90">
                    {effectChips.length ? (
                      effectChips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded border border-indigo-300/30 bg-indigo-500/10 px-2 py-1"
                        >
                          {chip}
                        </span>
                      ))
                    ) : (
                      <span className="rounded border border-slate-700 px-2 py-1 text-slate-300/80">
                        効果情報なし
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-indigo-200/20 pt-3">
                    <div className="text-xs text-slate-300/80">
                      所持数
                      <span className="ml-2 text-base font-semibold text-white">
                        {owned}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-emerald-200">
                        {item.price?.toLocaleString() ?? "-"} G
                      </p>
                      <Button
                        variant="outline"
                        className="mt-2 border-indigo-300/40 bg-indigo-500/10 text-indigo-100 hover:bg-indigo-500/30"
                        disabled
                      >
                        準備中
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <footer className="flex justify-end">
          <Button
            asChild
            variant="outline"
            className="border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            <Link href="/home">ホームへ戻る</Link>
          </Button>
        </footer>
      </div>
    </div>
  );
}

export default ItemShopPage;
