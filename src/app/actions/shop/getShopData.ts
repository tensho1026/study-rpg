"use server";
import getCoins from "@/lib/getCoin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchEquipments } from "@/lib/getMstEquipment";
import getUserEquipments from "@/lib/getUserEquipments";

export default async function getEquipmentData() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const equipments = await fetchEquipments();
  const userCoins = await getCoins(session?.user.id);
  const userEquipments = await getUserEquipments(session?.user.id);

  return { equipments, userCoins, userEquipments };
}
