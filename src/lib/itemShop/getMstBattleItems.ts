import { prisma } from "../prisma";

export default async function getMstBattleItems() {
  const data = await prisma.mstBattleItem.findMany();
  return data;
}
