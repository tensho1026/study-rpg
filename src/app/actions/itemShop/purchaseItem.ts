"use server";

import { authOptions } from "@/lib/auth";
import purchaseBattleItem from "@/lib/itemShop/purchaseBattleItem";
import decreaseUserCoins from "@/lib/study/decreaseUserCoins";
import { getServerSession } from "next-auth";

export default async function purchaseItem(itemId: string, cost: number) {
  const session = await getServerSession(authOptions);
  if (!session) return;
  await purchaseBattleItem(session.user.id, itemId);
  await decreaseUserCoins(session.user.id, cost);
}
