"use server";

import { authOptions } from "@/lib/auth";
import createEquipment from "@/lib/create/createEquipment";
import getEquipmentCost from "@/lib/get/getEquipmentCost";
import decreaseUserCoins from "@/lib/save/decreaseUserCoins";
import { getServerSession } from "next-auth";

export default async function purchaseEquipment(equipmentId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  await createEquipment(session.user.id, equipmentId);

  const equipmentCost = await getEquipmentCost(equipmentId);
  if (equipmentCost === undefined || equipmentCost === null) return;

  await decreaseUserCoins(session.user.id, equipmentCost);

  console.log(equipmentId, "を購入しました");
}
