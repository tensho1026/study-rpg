import { prisma } from "../prisma";

export default async function reduceBattleItemAmount(
  userId: string,
  battleItemId: string
) {
  await prisma.userHasBattleItem.update({
    where: {
      userId_battleItemId: {
        userId,
        battleItemId,
      },
    },
    data: {
      quantity: { decrement: 1 },
    },
  });
}
