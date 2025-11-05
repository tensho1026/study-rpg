import { prisma } from "../prisma";

export default async function getUserHasAmount(userId: string) {
  const mstItems = await prisma.mstBattleItem.findMany({
    include: {
      userHas: {
        where: {
          userId: userId,
        },
        select: {
          quantity: true,
        },
      },
    },
  });
  return mstItems.map((item) => ({
    ...item,
    quantity: item.userHas[0]?.quantity ?? 0,
  }));
}
