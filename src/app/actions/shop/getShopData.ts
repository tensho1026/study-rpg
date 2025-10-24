"use server";
import getCoins from "@/lib/getCoin";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function getEquipmentData() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const equipments = await prisma.mstEquipment.findMany();
  const userCoins = await getCoins(session?.user.id);

  return { equipments, userCoins };
}
