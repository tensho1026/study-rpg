"use server";

import { authOptions } from "@/lib/auth";
import getCoin from "@/lib/common/getCoin";
import getMstBattleItems from "@/lib/itemShop/getMstBattleItems";
import getUserHasAmount from "@/lib/itemShop/getUserHasAmount";
import { getServerSession } from "next-auth";

export default async function getItemShopData() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const mstData = await getMstBattleItems();
  const howUserHas = getUserHasAmount();
  const userCoins = await getCoin(session.user.id);

  return { mstData, howUserHas, userCoins };
}
