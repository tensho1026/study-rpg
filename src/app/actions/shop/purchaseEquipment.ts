"use server";

import { authOptions } from "@/lib/auth";
import createEquipment from "@/lib/equipment/createEquipment";
import getEquipmentCost from "@/lib/equipment/getEquipmentCost";
import decreaseUserCoins from "@/lib/study/decreaseUserCoins";
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
