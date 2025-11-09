"use client";

import { useMemo, useState } from "react";
import { AppMenuButton } from "@/components/common/app-menu-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { craftEquipmentsData } from "@/constant/craftEquipmentsData";
import { equipmentRecipesData } from "@/constant/equipmentRecipesData";
import { enemyDropItemsData } from "@/constant/enemyDropitem";
import { normalDropItemsData } from "@/constant/nomalDropItem";
import { Radio, Shield, Swords } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const recipeMap = equipmentRecipesData.reduce<
  Record<string, (typeof equipmentRecipesData)[number][]>
>((acc, recipe) => {
  if (!acc[recipe.equipmentId]) {
    acc[recipe.equipmentId] = [];
  }
  acc[recipe.equipmentId].push(recipe);
  return acc;
}, {});

const materialNameMap = [
  ...enemyDropItemsData.map(({ item }) => ({
    id: item.id,
    name: item.name,
    rarity: item.rare,
    type: "モンスター素材",
  })),
  ...normalDropItemsData.map((item) => ({
    id: item.id,
    name: item.name,
    rarity: item.rare,
    type: "共通素材",
  })),
].reduce<Record<string, { name: string; rarity: number; type: string }>>(
  (acc, entry) => {
    acc[entry.id] = {
      name: entry.name,
      rarity: entry.rarity,
      type: entry.type,
    };
    return acc;
  },
  {}
);

const playerMaterialStock: Record<string, number> = {
  "2": 5,
  "3": 1,
  "4": 6,
  "5": 2,
  "7": 2,
  "8": 1,
  "9": 0,
  "10": 3,
  "11": 2,
  "12": 1,
  N1: 4,
  N2: 5,
  N3: 2,
  N4: 6,
  N5: 1,
  N6: 3,
  N8: 1,
};

const formatRarity = (rarity: number) => {
  const stars = "★".repeat(rarity);
  return `${stars} (${rarity})`;
};

const craftMethods = [
  {
    id: "1",
    title: "モンスター素材を使う",

    accent: "text-amber-200",
  },
  {
    id: "2",
    title: "ノーマル素材を使う",

    accent: "text-cyan-200",
  },
] as const;

const categoryOptions = [
  { id: "weapon", label: "武器", icon: Swords },
  { id: "armor", label: "防具", icon: Shield },
] as const;

type CraftCategory = (typeof categoryOptions)[number]["id"];

export default function CraftPage() {
  const [activeCategory, setActiveCategory] = useState<CraftCategory>("weapon");
  const [craftMethod, setCraftMethod] =
    useState<(typeof craftMethods)[number]["id"]>("1");

  const filteredItems = useMemo(
    () => craftEquipmentsData.filter((item) => item.type === activeCategory),
    [activeCategory]
  );

  const methodMeta = craftMethods.find((method) => method.id === craftMethod);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3 md:items-center">
            <AppMenuButton className="border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white" />
            <div>
              <h1 className="text-3xl font-semibold text-white md:text-4xl">
                クラフト
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm md:text-right">
            <Button
              asChild
              className="rounded-xl bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-400"
            >
              <Link href="/home">ホームに戻る</Link>
            </Button>
          </div>
        </header>

        <section className=" gap-6 ">
          <Card className="space-y-8 border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "gap-2 rounded-full border-white/10 bg-white/5 text-white/70 hover:bg-white/10",
                        activeCategory === category.id &&
                          "border-emerald-400/60 bg-emerald-500/10 text-white"
                      )}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <Icon className="size-4" />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Craft Method
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {craftMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    className={cn(
                      "flex flex-col gap-1 rounded-xl border px-4 py-3 text-left transition",
                      craftMethod === method.id
                        ? "border-emerald-400/70 bg-emerald-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    )}
                    onClick={() => setCraftMethod(method.id)}
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={cn(
                          "text-[11px] tracking-[0.3em]",
                          method.accent
                        )}
                      ></span>
                    </div>
                    <p className="text-base font-semibold text-white">
                      {method.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredItems.map((equipment) => {
                const recipes = recipeMap[equipment.id] ?? [];
                return (
                  <Card
                    key={equipment.id}
                    className="flex h-full flex-col justify-between border border-white/10 bg-slate-950/60 p-4 text-sm text-white/70"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {equipment.name}
                        </h3>
                        <p className="text-xs text-white/60">
                          {formatRarity(equipment.rarity)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-right text-xs">
                        <p className="text-white/60">Cost</p>
                        <p className="text-base font-semibold text-white">
                          {equipment.craftCost} G
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-white/70">
                      {equipment.description}
                    </p>

                    <div className="mt-4 space-y-2 text-xs">
                      <p className="text-white/60">必要素材（所持数表示）</p>
                      {recipes.map((recipe) => {
                        const materialMeta = materialNameMap[
                          recipe.materialId
                        ] ?? {
                          name: `ID: ${recipe.materialId}`,
                          rarity: 1,
                          type:
                            recipe.materialType === "ENEMY"
                              ? "モンスター素材"
                              : "共通素材",
                        };
                        const haveAmount =
                          playerMaterialStock[recipe.materialId] ?? 0;
                        const isEnough = haveAmount >= recipe.quantity;
                        return (
                          <div
                            key={`${equipment.id}-${recipe.materialId}`}
                            className={cn(
                              "flex items-center justify-between rounded-lg border px-3 py-2",
                              isEnough
                                ? "border-white/10 bg-white/5"
                                : "border-rose-400/40 bg-rose-500/10"
                            )}
                          >
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {materialMeta.name}
                              </p>
                              <p className="text-[11px] text-white/50">
                                {materialMeta.type} /{" "}
                                {formatRarity(materialMeta.rarity)}
                              </p>
                            </div>
                            <div className="text-right text-white">
                              <p>
                                必要{" "}
                                <span className="font-semibold">
                                  {recipe.quantity}
                                </span>
                              </p>
                              <p
                                className={cn(
                                  "text-[11px]",
                                  isEnough
                                    ? "text-emerald-200"
                                    : "text-rose-300"
                                )}
                              >
                                所持 {haveAmount}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Button className="mt-4 w-full rounded-lg bg-emerald-500/80 text-slate-950 transition hover:bg-emerald-400">
                      {methodMeta?.title} でクラフト (UIのみ)
                    </Button>
                  </Card>
                );
              })}
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
