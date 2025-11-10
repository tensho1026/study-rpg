"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MstCraftEquipmentsWithRecipes } from "@/types/MstCraftEquipmentsWithRecipes";
import CraftHeader from "./CraftHeader";
import Method from "./Method";
import CategorySelector from "./CategorySelector";

type Props = {
  userCoin: number;
  equipmentsData: MstCraftEquipmentsWithRecipes[];
  userHasData: UserHasType;
};

type UserHasType = {
  nomalItemId?: string | null;
  monsterItemId?: string | null;
  quantity: number;
}[];

export default function Craft({
  userCoin,
  equipmentsData,
  userHasData,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<"weapon" | "armor">(
    "weapon"
  );
  const [craftMethod, setCraftMethod] = useState<"ENEMY" | "NORMAL">("ENEMY");
  const [coin, setCoin] = useState(userCoin);
  const [equipments, setEquipments] = useState<MstCraftEquipmentsWithRecipes[]>(
    equipmentsData ?? []
  );
  const [userHas, setUserHas] = useState<UserHasType>(userHasData ?? []);

  // --- 装備カテゴリで絞る ---
  const filteredItems = useMemo(() => {
    return equipments.filter((item) => item.type === activeCategory);
  }, [activeCategory, equipments]);

  return (
    <main className="min-h-screen  bg-cover bg-fixed bg-center text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <CraftHeader coin={coin} />
        {/* Category selector */}
        <CategorySelector
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
        />

        {/* Craft method */}
        <Method setCraftMethod={setCraftMethod} craftMethod={craftMethod} />
        {/* Craft item list */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {filteredItems.map((equipment) => {
            const recipe = equipment.recipes.find(
              (r) =>
                r.equipmentId === equipment.id && r.materialType === craftMethod
            );
            if (!recipe) return null;

            const have = userHas.find(
              (h) =>
                recipe.monsterMaterial?.id === h.monsterItemId ||
                recipe.normalMaterial?.id === h.nomalItemId
            );
            const enough = (have?.quantity ?? 0) >= recipe.quantity;

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
                      {equipment.cost} G
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
                          {/* {recipe.monsterMaterial?.name ?? "不明な素材"} */}{" "}
                          {recipe.materialType === "ENEMY"
                            ? `  ${recipe.monsterMaterial?.name ?? ""}`
                            : `${recipe.normalMaterial?.name ?? ""}`}
                        </p>
                        <p className="text-[10px] text-white/50">
                          {recipe.materialType === "ENEMY"
                            ? `モンスター素材  ★${
                                recipe.monsterMaterial?.rare ?? 1
                              }`
                            : `共通素材 ★${recipe.normalMaterial?.rare ?? 1}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs">
                          必要
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
                          所持 {have?.quantity ?? 0}
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
