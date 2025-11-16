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
  const [equipments, setEquipments] = useState<EquipmentItem[]>(userEquipments);

  // ---- マスター情報を共通化する安全関数 ----
  const getMaster = (item: EquipmentItem | undefined) =>
    item?.mstEquipment ?? item?.mstCraftEquipments ?? null;

  const {
    equippedWeapon,
    equippedArmor,
    equippedAccessory,
    totalAttack,
    totalDefense,
  } = useMemo(() => {
    const equippedWeapon = equipments.find(
      (item) =>
        item.isDraft &&
        (item.mstEquipment?.type === "weapon" ||
          item.mstCraftEquipments?.type === "weapon")
    );

    const equippedArmor = equipments.find(
      (item) =>
        item.isDraft &&
        (item.mstEquipment?.type === "armor" ||
          item.mstCraftEquipments?.type === "armor")
    );

    const equippedAccessory = equipments.find(
      (item) =>
        item.isDraft &&
        (item.mstEquipment?.type === "accessory" ||
          item.mstCraftEquipments?.type === "accessory")
    );

    const w = getMaster(equippedWeapon);
    const a = getMaster(equippedArmor);
    const acc = getMaster(equippedAccessory);

    const totalAttack =
      (w?.attack ?? 0) + (acc?.attack ?? 0);

    const totalDefense =
      (a?.defense ?? 0) + (acc?.defense ?? 0);

    return {
      equippedWeapon,
      equippedArmor,
      equippedAccessory,
      totalAttack,
      totalDefense,
    };
  }, [equipments]);

  const weaponMaster = getMaster(equippedWeapon);
  const armorMaster = getMaster(equippedArmor);
  const accessoryMaster = getMaster(equippedAccessory);

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4">
        <Title />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-4">
            <CurrentEquipment
              equippedWeapon={weaponMaster?.name ?? "なし"}
              equippedArmor={armorMaster?.name ?? "なし"}
              equippedAccessory={accessoryMaster?.name ?? "なし"}
            />

            <BattleStatus
              totalAttack={totalAttack}
              totalDefense={totalDefense}
            />
          </div>

          <Inventory setEquipments={setEquipments} equipments={equipments} />
        </div>
      </div>
    </main>
  );
}
