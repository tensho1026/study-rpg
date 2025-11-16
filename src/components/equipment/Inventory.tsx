"use client";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import SelectTab from "../common/SelectTab";
import { Card } from "../ui/card";
import OwnedEquipmentsList from "./OwnedEquipmentsList";
import { Equipment } from "@/types/equipment";

type Props = {
  setEquipments: Dispatch<SetStateAction<Equipment[]>>;
  equipments: Equipment[];
};

function Inventory({ equipments, setEquipments }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<
    "weapon" | "armor" | "accessory"
  >("weapon");

  const filteredItems = useMemo(() => {
    const filteredItems = equipments.filter(
      (item) =>
        item.mstEquipment?.type === selectedCategory ||
        item.mstCraftEquipments?.type === selectedCategory
    );
    return filteredItems;
  }, [equipments, selectedCategory]);
  

  return (
    <div className="lg:col-span-2">
      <Card className="rpg-window bg-card p-4">
        <h2 className="text-sm md:text-base text-card-foreground border-b-2 border-border pb-2 mb-4">
          所持装備
        </h2>

        {/* Category Tabs */}

        <SelectTab
          selectedTab={selectedCategory}
          setSelectedTab={setSelectedCategory}
        />

        {/* Item List */}
        <OwnedEquipmentsList
          selectedCategory={selectedCategory}
          filteredItems={filteredItems}
          setEquipments={setEquipments}
        />
      </Card>
    </div>
  );
}

export default Inventory;
