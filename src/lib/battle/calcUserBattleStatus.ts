// lib/battle/calcUserBattleStatus.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function calcUserBattleStatus(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  battleStatus: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userEquipments: any
) {
  if (!battleStatus) return { attack: 0, defense: 0 };

  const userWeapon = userEquipments?.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (equip: any) => equip.mstEquipment.type === "weapon"
  );
  const userArmor = userEquipments?.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (equip: any) => equip.mstEquipment.type === "armor"
  );

  const userWeaponAttack = userWeapon?.[0]?.mstEquipment?.attack ?? 0;
  const userArmorDefense = userArmor?.[0]?.mstEquipment?.defense ?? 0;

  return {
    attack: (battleStatus.attack ?? 0) + userWeaponAttack,
    defense: (battleStatus.defense ?? 0) + userArmorDefense,
  };
}
