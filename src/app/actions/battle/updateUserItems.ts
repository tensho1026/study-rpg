"use server";

import { authOptions } from "@/lib/auth";
import getUserHasItems from "@/lib/battle/getUserHasItems";
import { getServerSession } from "next-auth";

export default async function updateUserBattleItems() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const battleItems = await getUserHasItems(session.user.id);

  return battleItems;
}
