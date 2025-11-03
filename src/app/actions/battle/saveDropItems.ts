"use server";

import { authOptions } from "@/lib/auth";
import saveMonsterItem from "@/lib/battle/saveMonsterDropItem";
import saveNomalItem from "@/lib/battle/saveNomalItem";
import { getServerSession } from "next-auth";

export default async function saveDropItems(
  nomalId: string,
  monsterId: string
) {
  const session = await getServerSession(authOptions);
  if (!session) return;
  await saveNomalItem(session.user.id, nomalId);
  await saveMonsterItem(session.user.id, monsterId);
}
