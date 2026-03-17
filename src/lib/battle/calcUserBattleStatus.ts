import { BattleStatusType } from "@/types/battleStatus";
import { EquipmentType } from "@prisma/client";

type BattleEquipment = {
  mstEquipment: {
    type: EquipmentType;
    attack?: number | null;
    defense?: number | null;
  } | null;
  mstCraft: {
    type: EquipmentType;
    attack?: number | null;
    defense?: number | null;
  } | null;
};

export default function calcUserBattleStatus(
  battleStatus: BattleStatusType | null,

  userEquipments: BattleEquipment[] | null
) {
  if (!battleStatus) return { attack: 0, defense: 0 };

  const getMasterEquipment = (equipment: BattleEquipment | undefined) =>
    equipment?.mstEquipment ?? equipment?.mstCraft ?? null;

  const userWeapon = userEquipments?.find(
    (equip) =>
      equip.mstEquipment?.type === "weapon" || equip.mstCraft?.type === "weapon"
  );
  const userArmor = userEquipments?.find(
    (equip) =>
      equip.mstEquipment?.type === "armor" || equip.mstCraft?.type === "armor"
  );

  const userWeaponAttack = getMasterEquipment(userWeapon)?.attack ?? 0;
  const userArmorDefense = getMasterEquipment(userArmor)?.defense ?? 0;

  return {
    attack: (battleStatus.attack ?? 0) + userWeaponAttack,
    defense: (battleStatus.defense ?? 0) + userArmorDefense,
  };
}
