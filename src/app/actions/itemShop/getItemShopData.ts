"use server";

import { authOptions } from "@/lib/auth";
import getCoin from "@/lib/common/getCoin";
import getUserHasAmount from "@/lib/itemShop/getUserHasAmount";
import { getServerSession } from "next-auth";

export default async function getItemShopData() {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const howUserHas = await getUserHasAmount(session.user.id);
  const userCoins = await getCoin(session.user.id);

  return { howUserHas, userCoins };
}
