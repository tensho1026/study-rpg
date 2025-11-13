"use client";

import { useMemo, useState } from "react";
import type { Equipment as EquipmentItem } from "@/types/equipment";
import CurrentEquipment from "@/components/equipment/CurrentEquipment";
import Title from "@/components/equipment/Title";
import BattleStatus from "@/components/equipment/BattleStatus";
import Inventory from "@/components/equipment/Inventory";

type Props = {
  userEquipments: EquipmentItem[];
};

export default function Equipment({ userEquipments }: Props) {
  const [equipments, setEquipments] = useState<EquipmentItem[]>(
    userEquipments ?? []
  );

  const {
    equippedWeapon,
    equippedArmor,
    equippedAccessory,
    totalAttack,
    totalDefense,
  } = useMemo(() => {
    const equippedWeapon = equipments.find(
      (item) => item.mstEquipment?.type === "weapon" && item.isDraft
    );
    const equippedArmor = equipments.find(
      (item) => item.mstEquipment?.type === "armor" && item.isDraft
    );
    const equippedAccessory = equipments.find(
      (item) => item.mstEquipment?.type === "accessory" && item.isDraft
    );

    const totalAttack =
      (equippedWeapon?.mstEquipment.attack || 0) +
      (equippedAccessory?.mstEquipment.attack || 0);
    const totalDefense =
      (equippedArmor?.mstEquipment.defense || 0) +
      (equippedAccessory?.mstEquipment.defense || 0);

    return {
      equippedWeapon,
      equippedArmor,
      equippedAccessory,
      totalAttack,
      totalDefense,
    };
  }, [equipments]);

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
          <Inventory setEquipments={setEquipments} equipments={equipments} />
        </div>
      </div>
    </main>
  );
}
