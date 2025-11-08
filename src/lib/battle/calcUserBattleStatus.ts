import { BattleStatusType } from "@/types/battleStatus";

type BattleEquipment = {
  mstEquipment: {
    type: "weapon" | "armor";
    attack?: number;
    defense?: number;
  };
};

export default function calcUserBattleStatus(
  battleStatus: BattleStatusType | null,

  userEquipments: BattleEquipment[] | null
) {
  if (!battleStatus) return { attack: 0, defense: 0 };

  const userWeapon = userEquipments?.find(
    (equip) => equip.mstEquipment.type === "weapon"
  );
  const userArmor = userEquipments?.find(
    (equip) => equip.mstEquipment.type === "armor"
  );

  const userWeaponAttack = userWeapon?.mstEquipment?.attack ?? 0;
  const userArmorDefense = userArmor?.mstEquipment?.defense ?? 0;

  return {
    attack: (battleStatus.attack ?? 0) + userWeaponAttack,
    defense: (battleStatus.defense ?? 0) + userArmorDefense,
  };
}
