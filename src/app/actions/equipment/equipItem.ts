"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { EquipmentType } from "@prisma/client";
import findDraftedEquipment from "@/lib/equipment/findDraftedEquipment";
import { unequipEquipment } from "@/lib/equipment/unequipEquipment";
import { equipEquipment } from "@/lib/equipment/equipEquipment";

export default async function equipItem(
  equipmentId: string,
  type: EquipmentType
) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  // つけている装備検索
  const draftedItemId = await findDraftedEquipment(session.user.id, type);

  // つけていた装備を外す
  if (draftedItemId) {
    if (draftedItemId.equipmentId) {
      await unequipEquipment(session.user.id, draftedItemId.equipmentId);
    }
    if (draftedItemId.craftEquipmentId) {
      await unequipEquipment(session.user.id, draftedItemId.craftEquipmentId);
    }
  }

  await equipEquipment(session.user.id, equipmentId);

  return { equippedId: equipmentId, unequippedId: draftedItemId };
}
