"use client";

import { useState } from "react";
import { MstCraftEquipmentsWithRecipes } from "@/types/MstCraftEquipmentsWithRecipes";
import CraftHeader from "./CraftHeader";
import Method from "./Method";
import CategorySelector from "./CategorySelector";
import CraftItemCard from "./CraftItemCard";
import useFilteredEquipments from "@/hooks/craft/useFilteredEquipments";

type Props = {
  userCoin: number;
  equipmentsData: MstCraftEquipmentsWithRecipes[];
  userHasData: UserHasType;
  userHasEquipments: string[] | undefined;
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
  userHasEquipments,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<"weapon" | "armor">(
    "weapon"
  );
  const [craftMethod, setCraftMethod] = useState<"ENEMY" | "NORMAL">("ENEMY");
  const [coin, setCoin] = useState(userCoin);
  const equipments = equipmentsData;

  const [userHasMaterials, setUserHasMaterials] = useState<UserHasType>(
    userHasData ?? []
  );
  const [userHasEquipment, setUserHasEquipments] = useState<
    string[] | undefined
  >(userHasEquipments);

  // --- 装備カテゴリで絞る ---
  const filteredEquipments = useFilteredEquipments(equipments, activeCategory);

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
          {filteredEquipments.map((equipment) => (
            <CraftItemCard
              key={equipment.id}
              equipment={equipment}
              craftMethod={craftMethod}
              userHas={userHasMaterials}
              userHasEquipments={userHasEquipment ?? []}
              coin={coin}
              setCoins={setCoin}
              setUserHas={setUserHasMaterials}
              setUserHasEquipments={setUserHasEquipments}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
