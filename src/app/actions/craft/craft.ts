"use server";

import { authOptions } from "@/lib/auth";
import craftEquipments from "@/lib/craft/craftEquipment";
import { getServerSession } from "next-auth";

export default async function craft(equipmentId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  await craftEquipments(session.user.id, equipmentId);
}
