import { prisma } from "../prisma";

export default async function getUserHasDropItems(userId: string) {
  const data = await prisma.userHasDropItems.findMany({
    where: {
      userId: userId,
    },
    select: {
      nomalItemId: true,
      monsterItemId: true,
      quantity: true,
    },
  });

  return data;
}
