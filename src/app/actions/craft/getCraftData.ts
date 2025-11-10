"use server";
import { authOptions } from "@/lib/auth";
import getCoins from "@/lib/common/getCoin";
import getMstData from "@/lib/craft/getMstData";
import getUserHasDropItems from "@/lib/craft/getUserHasDropItems";
import { getServerSession } from "next-auth";

export default async function getCraftData() {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userId = session.user.id;
  const userHasDropItems = await getUserHasDropItems(userId);
  const mstData = await getMstData();
  const userCoin = await getCoins(userId);
  return { userHasDropItems, mstData, userCoin };
}
