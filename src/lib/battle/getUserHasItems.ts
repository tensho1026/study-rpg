import { prisma } from "../prisma";

export default async function getUsetHasItems(userId: string) {
  const data = await prisma.userHasBattleItem.findMany({
    where: {
      userId: userId,
    },
    include: {
      battleItem: true,
    },
  });
  return data;
}
