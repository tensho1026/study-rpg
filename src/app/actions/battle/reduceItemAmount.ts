"use server";

import { authOptions } from "@/lib/auth";
import reduceBattleItemAmount from "@/lib/battle/reduceBattleItemAmount";
import { getServerSession } from "next-auth";

export default async function reduceItemAmount(itemId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return;
  await reduceBattleItemAmount(session.user.id, itemId);
}
