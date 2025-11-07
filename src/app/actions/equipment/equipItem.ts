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

  if (draftedItemId) {
    // つけていた装備を外す
    await unequipEquipment(session.user.id, draftedItemId.equipmentId);
  }

  await equipEquipment(session.user.id, equipmentId);
}
