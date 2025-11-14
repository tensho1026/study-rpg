"use server";

import { authOptions } from "@/lib/auth";
import craftEquipments from "@/lib/craft/craftEquipment";
import decreaseMaterial from "@/lib/craft/decreaseMaterial";
import decreaseUserCoins from "@/lib/study/decreaseUserCoins";
import { getServerSession } from "next-auth";

export default async function craft(
  equipmentId: string,
  cost: number,
  normalId: string | null,
  monsterId: string | null,
  quantity: number
) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  await craftEquipments(session.user.id, equipmentId);
  await decreaseUserCoins(session.user.id, cost);
  await decreaseMaterial(session.user.id, normalId, monsterId, quantity);
}
