import { MstCraftEquipmentsWithRecipes } from "@/types/MstCraftEquipmentsWithRecipes";
import { useMemo } from "react";

export default function useFilteredEquipments(
  equipments: MstCraftEquipmentsWithRecipes[],
  activeCategory: "weapon" | "armor"
) {
  return useMemo(() => {
    return equipments.filter((item) => item.type === activeCategory);
  }, [activeCategory, equipments]);
}
