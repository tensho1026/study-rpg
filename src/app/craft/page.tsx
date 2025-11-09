import { AppMenuButton } from "@/components/common/app-menu-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { craftEquipmentsData } from "@/constant/craftEquipmentsData";
import { equipmentRecipesData } from "@/constant/equipmentRecipesData";
import { Anvil, Hammer, Layers, Shield, Swords } from "lucide-react";
import Link from "next/link";

const recipeMap = equipmentRecipesData.reduce<Record<string, typeof equipmentRecipesData[number][]>>(
  (acc, recipe) => {
    if (!acc[recipe.equipmentId]) {
      acc[recipe.equipmentId] = [];
    }
    acc[recipe.equipmentId].push(recipe);
    return acc;
  },
  {}
);


const formatRarity = (rarity: number) => {
  const stars = "★".repeat(rarity);
  return `${stars} (${rarity})`;
};

export default function CraftPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3 md:items-center">
            <AppMenuButton className="border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-200/80">
                Arcane Forge
              </p>
              <h1 className="text-3xl font-semibold text-white md:text-4xl">
                クラフトラボ
              </h1>
              <p className="text-xs text-white/70 md:text-sm">
                モンスター素材から新たな装備を創り出す錬成スタジオ
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm md:text-right">
            <Button
              asChild
              className="rounded-xl bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-400"
            >
              <Link href="/home">ホームに戻る</Link>
            </Button>
            <span className="text-xs text-white/60">
              現在のクラフト権：あと 02 回
            </span>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3 text-white/70">
              <Hammer className="size-6 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  今日の進捗
                </p>
                <p className="text-2xl font-semibold text-white">
                  3 / 5 クラフト
                </p>
              </div>
            </div>
          </Card>
          <Card className="border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3 text-white/70">
              <Anvil className="size-6 text-cyan-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  累計成功率
                </p>
                <p className="text-2xl font-semibold text-white">96%</p>
              </div>
            </div>
          </Card>
          <Card className="border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3 text-white/70">
              <Layers className="size-6 text-emerald-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  所持レシピ
                </p>
                <p className="text-2xl font-semibold text-white">
                  {craftEquipmentsData.length} 件
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="space-y-6 border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Craftable Items
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  クラフト一覧
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1">
                  <Swords className="size-4 text-rose-200" />
                  Weapon
                </span>
                <span className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1">
                  <Shield className="size-4 text-cyan-200" />
                  Armor
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {craftEquipmentsData.map((equipment) => {
                const recipes = recipeMap[equipment.id] ?? [];
                const isWeapon = equipment.type === "weapon";
                return (
                  <Card
                    key={equipment.id}
                    className="flex h-full flex-col justify-between border border-white/10 bg-slate-950/60 p-4 text-sm text-white/70"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                          {isWeapon ? "Weapon" : "Armor"}
                        </p>
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

                    <div className="mt-4 grid gap-2 text-xs">
                      <p className="text-white/60">必要素材</p>
                      {recipes.map((recipe) => (
                        <div
                          key={`${equipment.id}-${recipe.materialId}`}
                          className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                        >
                          <span className="text-white">
                            {recipe.materialType === "ENEMY"
                              ? "モンスター素材"
                              : "共通素材"}
                          </span>
                          <span className="text-white/80">
                            ID: {recipe.materialId} × {recipe.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button className="mt-4 w-full rounded-lg bg-emerald-500/80 text-slate-950 transition hover:bg-emerald-400">
                      クラフト予約 (UIのみ)
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
