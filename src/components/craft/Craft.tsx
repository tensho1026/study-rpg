"use client";

import { useMemo, useState } from "react";
import { AppMenuButton } from "@/components/common/app-menu-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { craftEquipmentsData } from "@/constant/craftEquipmentsData";
import { equipmentRecipesData } from "@/constant/equipmentRecipesData";
import { enemyDropItemsData } from "@/constant/enemyDropitem";
import { normalDropItemsData } from "@/constant/nomalDropItem";
import { Shield, Swords, Hammer, Coins } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- 素材メタ情報 ---
const materialNameMap = [
  ...enemyDropItemsData.map(({ item }) => ({
    id: item.id,
    name: item.name,
    rarity: item.rare,
    type: "ENEMY",
  })),
  ...normalDropItemsData.map((item) => ({
    id: item.id,
    name: item.name,
    rarity: item.rare,
    type: "NORMAL",
  })),
].reduce<Record<string, { name: string; rarity: number; type: string }>>(
  (acc, entry) => {
    acc[entry.id] = entry;
    return acc;
  },
  {}
);

const craftMethods = [
  {
    id: "1",
    title: "モンスター素材クラフト",
    type: "ENEMY",
    accent: "text-amber-300",
  },
  {
    id: "2",
    title: "共通素材クラフト",
    type: "NORMAL",
    accent: "text-cyan-300",
  },
] as const;

const categoryOptions = [
  { id: "weapon", label: "武器", icon: Swords },
  { id: "armor", label: "防具", icon: Shield },
] as const;

type Props = {
  userCoin: number;
};

export default function Craft({ userCoin }: Props) {
  const [activeCategory, setActiveCategory] = useState<"weapon" | "armor">(
    "weapon"
  );
  const [craftMethod, setCraftMethod] = useState<"ENEMY" | "NORMAL">("ENEMY");
  const [coin, setCoin] = useState(userCoin);

  // --- 装備カテゴリで絞る ---
  const filteredItems = useMemo(() => {
    return craftEquipmentsData.filter((item) => item.type === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen  bg-cover bg-fixed bg-center text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <AppMenuButton className="border border-white/20 bg-slate-800/50 text-white/80 hover:bg-slate-700/70" />
            <div className="flex items-center gap-2">
              <Hammer className="text-yellow-300" />
              <h1 className="font-[pixel] text-3xl text-yellow-200 drop-shadow-[0_0_6px_rgba(255,220,100,0.6)]">
                クラフト工房
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 text-sm">
            <div className="flex items-center gap-2 rounded-md border-2 border-yellow-400/40 bg-yellow-400/10 px-3 py-1 font-[pixel] shadow-[0_0_6px_rgba(255,255,150,0.3)]">
              <Coins className="size-4 text-yellow-300" />
              <span className="text-yellow-200">{coin} G</span>
            </div>

            <Button
              asChild
              className="rounded-md border-2 border-emerald-400 bg-emerald-500/80 text-slate-950 font-bold shadow-[0_0_8px_rgba(0,255,150,0.4)] hover:bg-emerald-400 hover:shadow-[0_0_12px_rgba(0,255,180,0.6)]"
            >
              <Link href="/home">🏠 ホームに戻る</Link>
            </Button>
          </div>
        </header>

        {/* Category selector */}
        <section className="mt-8">
          <div className="flex flex-wrap gap-3">
            {categoryOptions.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border-2 border-white/20 bg-slate-800/60 px-4 py-2 font-[pixel] tracking-wider transition-all hover:bg-slate-700 hover:text-yellow-100",
                    activeCategory === category.id &&
                      "border-yellow-400 text-yellow-200 shadow-[0_0_8px_rgba(255,220,120,0.5)]"
                  )}
                >
                  <Icon className="size-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* Craft method */}
        <section className="mt-6 grid gap-3 md:grid-cols-2">
          {craftMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setCraftMethod(method.type)}
              className={cn(
                "flex flex-col rounded-lg border-2 px-5 py-3 transition-all font-[pixel]",
                craftMethod === method.type
                  ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_10px_rgba(0,255,180,0.3)]"
                  : "border-white/15 bg-slate-900/50 hover:bg-slate-800/70"
              )}
            >
              <span className={cn("text-sm", method.accent)}>
                ▶ {method.title}
              </span>
            </button>
          ))}
        </section>

        {/* Craft item list */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {filteredItems.map((equipment) => {
            const recipe = equipmentRecipesData.find(
              (r) =>
                r.equipmentId === equipment.id && r.materialType === craftMethod
            );
            if (!recipe) return null;

            const materialMeta = materialNameMap[recipe.materialId];
            // const have = playerMaterialStock[recipe.materialId] ?? 0;
            const have = 0;
            const enough = have >= recipe.quantity;

            const statLabel = equipment.type === "weapon" ? "攻撃力" : "防御力";
            const statValue =
              equipment.type === "weapon"
                ? equipment.attack ?? 0
                : equipment.defense ?? 0;

            return (
              <Card
                key={equipment.id}
                className="flex flex-col justify-between border-2 border-slate-700 bg-slate-900/80 p-4 font-[pixel] shadow-[0_0_6px_rgba(255,255,255,0.1)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-yellow-200 drop-shadow-[0_0_4px_rgba(255,255,150,0.6)]">
                      {equipment.name}
                    </h3>
                    <p className="text-xs text-white/70">★{equipment.rarity}</p>
                  </div>
                  <div className="rounded-lg border border-yellow-300/30 bg-yellow-300/10 px-3 py-2 text-right text-xs">
                    <p className="text-white/70">Cost</p>
                    <p className="text-yellow-200 font-semibold">
                      {equipment.craftCost} G
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-white/60">{statLabel}:</span>
                  <span className="text-base font-bold text-emerald-300 drop-shadow-[0_0_4px_rgba(0,255,180,0.5)]">
                    {statValue}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="mb-2 text-[11px] text-white/50">
                    必要素材（所持数）
                  </p>
                  <div className="space-y-2">
                    <div
                      className={cn(
                        "flex items-center justify-between rounded border-2 px-3 py-2 transition",
                        enough
                          ? "border-slate-600 bg-slate-800/80"
                          : "border-rose-400/60 bg-rose-900/40"
                      )}
                    >
                      <div>
                        <p className="text-sm text-white">
                          {materialMeta?.name ?? "不明な素材"}
                        </p>
                        <p className="text-[10px] text-white/50">
                          {materialMeta?.type === "ENEMY"
                            ? "モンスター素材"
                            : "共通素材"}{" "}
                          ★{materialMeta?.rarity ?? 1}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs">
                          必要{" "}
                          <span className="text-yellow-200">
                            {recipe.quantity}
                          </span>
                        </p>
                        <p
                          className={cn(
                            "text-[10px]",
                            enough ? "text-emerald-300" : "text-rose-300"
                          )}
                        >
                          所持 {have}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="mt-4 w-full rounded-md border-2 border-emerald-400 bg-emerald-500/80 text-slate-950 font-bold transition-all hover:scale-[1.02] hover:bg-emerald-400 hover:shadow-[0_0_10px_rgba(0,255,160,0.6)]">
                  🔨 クラフト
                </Button>
              </Card>
            );
          })}
        </section>
      </div>
    </main>
  );
}
