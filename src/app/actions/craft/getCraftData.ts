"use server";
import { authOptions } from "@/lib/auth";
import getCoins from "@/lib/common/getCoin";
import getMstData from "@/lib/craft/getMstData";
import getUserHasDropItems from "@/lib/craft/getUserHasDropItems";
import isUserHasCraftEquipment from "@/lib/craft/isUserHasCraftEquipment";
import { getServerSession } from "next-auth";

export default async function getCraftData() {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userId = session.user.id;
  const userHasDropItems = await getUserHasDropItems(userId);
  const mstData = await getMstData();
  const userCoin = await getCoins(userId);
  const userHasEquipments = await isUserHasCraftEquipment(session.user.id);
  return { userHasDropItems, mstData, userCoin,userHasEquipments };
}
