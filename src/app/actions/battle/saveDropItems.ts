"use server";

import { authOptions } from "@/lib/auth";
import saveDropItem from "@/lib/battle/saveDropItem";
import { getServerSession } from "next-auth";

export default async function saveDropItems(
  nomalId: string,
  monsterId: string
) {
  const session = await getServerSession(authOptions);
  if (!session) return;
  await saveDropItem(session.user.id, nomalId, monsterId);
}
