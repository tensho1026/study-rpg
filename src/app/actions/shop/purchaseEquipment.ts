"use server";

import { authOptions } from "@/lib/auth";
import createEquipment from "@/lib/equipment/createEquipment";
import getEquipmentCost from "@/lib/equipment/getEquipmentCost";
import decreaseUserCoins from "@/lib/study/decreaseUserCoins";
import { getServerSession } from "next-auth";

export default async function purchaseEquipment(equipmentId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session.user.id;

  const equipmentCost = await getEquipmentCost(equipmentId);
  if (equipmentCost == null) return;

  await Promise.all([
    createEquipment(userId, equipmentId),
    decreaseUserCoins(userId, equipmentCost),
  ]);
}
