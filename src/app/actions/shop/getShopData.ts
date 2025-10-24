"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import getUserEquipments from "@/lib/get/getUserEquipments";
import { fetchEquipments } from "@/lib/get/getMstEquipment";
import getCoins from "@/lib/get/getCoin";

export default async function getEquipmentData() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const equipments = await fetchEquipments();
  const userCoins = await getCoins(session?.user.id);
  const userEquipments = await getUserEquipments(session?.user.id);

  return { equipments, userCoins, userEquipments };
}
