"use server";

import { authOptions } from "@/lib/auth";
import getUserEquipments from "@/lib/equipment/getUserEquipments";
import { getServerSession } from "next-auth";

export default async function getEquipmentData() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userEquipments = await getUserEquipments(session?.user.id);

  return userEquipments;
}
