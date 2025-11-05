import { prisma } from "../prisma";

export default async function getUserHasAmount() {
  const data = await prisma.userHasBattleItem.findMany();
  return data;
}
