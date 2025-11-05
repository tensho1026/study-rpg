import { prisma } from "../prisma";

export default async function purchaseBattleItem(
  userId: string,
  itemId: string
) {
  await prisma.userHasBattleItem.upsert({
    where: {
      userId_battleItemId: {
        userId: userId,
        battleItemId: itemId,
      },
    },
    update: {
      quantity: { increment: 1 }, 
    },
    create: {
      userId: userId,
      battleItemId: itemId,
    },
  });
}
