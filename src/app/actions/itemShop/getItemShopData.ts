"use server";

import { authOptions } from "@/lib/auth";
import getCoin from "@/lib/common/getCoin";
import getUserHasAmount from "@/lib/itemShop/getUserHasAmount";
import { getServerSession } from "next-auth";

export default async function getItemShopData() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session.user.id;

  const [howUserHas, userCoins] = await Promise.all([
    getUserHasAmount(userId),
    getCoin(userId),
  ]);

  return { howUserHas, userCoins };
}
