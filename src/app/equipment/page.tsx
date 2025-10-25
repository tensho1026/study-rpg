"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import getEquipmentData from "../actions/equipment/getEquipmentData";
import { Equipment } from "@/types/equipment";
import CurrentEquipment from "@/components/equipment/CurrentEquipment";
import Title from "@/components/equipment/Title";
import BattleStatus from "@/components/equipment/BattleStatus";
import SelectTab from "@/components/common/SelectTab";
import OwnedEquipmentsList from "@/components/equipment/OwnedEquipmentsList";

export default function EquipmentPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  useEffect(() => {
    const fetchUserEquipments = async () => {
      const data = await getEquipmentData();
      console.log(data, "装備情報");
      setEquipments(data ?? []);
    };
    fetchUserEquipments();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<
    "weapon" | "armor" | "accessory"
  >("weapon");

  const equippedWeapon = equipments.find(
    (item) => item.mstEquipment.type === "weapon" && item.isDraft
  );
  const equippedArmor = equipments.find(
    (item) => item.mstEquipment.type === "armor" && item.isDraft
  );
  const equippedAccessory = equipments.find(
    (item) => item.mstEquipment.type === "accessory" && item.isDraft
  );

  const totalAttack =
    (equippedWeapon?.mstEquipment.attack || 0) +
    (equippedAccessory?.mstEquipment.attack || 0);
  const totalDefense =
    (equippedArmor?.mstEquipment.defense || 0) +
    (equippedAccessory?.mstEquipment.defense || 0);

  const filteredItems = equipments.filter(
    (item) => item.mstEquipment.type === selectedCategory
  );

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Title */}
        <Title />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Current Equipment & Stats */}
          <div className="space-y-4">
            {/* Current Equipment */}
            <CurrentEquipment
              equippedWeapon={equippedWeapon?.mstEquipment.name}
              equippedArmor={equippedArmor?.mstEquipment.name}
              equippedAccessory={equippedAccessory?.mstEquipment.name}
            />

            {/* Battle Stats */}
            <BattleStatus
              totalAttack={totalAttack}
              totalDefense={totalDefense}
            />
          </div>

          {/* Right Column - Inventory */}
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
        </div>
      </div>
    </main>
  );
}
