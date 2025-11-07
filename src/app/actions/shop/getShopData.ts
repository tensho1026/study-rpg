"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import getUserEquipments from "@/lib/equipment/getUserEquipments";
import { fetchEquipments } from "@/lib/equipment/getMstEquipment";
import getCoins from "@/lib/common/getCoin";

export default async function getEquipmentData() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session.user.id;

  const [equipments, userCoins, userEquipments] = await Promise.all([
    fetchEquipments(),
    getCoins(userId),
    getUserEquipments(userId),
  ]);

  return { equipments, userCoins, userEquipments };
}
