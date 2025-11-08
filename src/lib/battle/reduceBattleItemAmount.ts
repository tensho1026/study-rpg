import { prisma } from "../prisma";

export default async function reduceBattleItemAmount(
  userId: string,
  battleItemId: string
) {
  const updatedQuantity = await prisma.userHasBattleItem.update({
    where: {
      userId_battleItemId: {
        userId,
        battleItemId,
      },
    },
    data: {
      quantity: { decrement: 1 },
    },
    select: {
      quantity: true,
      
    },
  });

  return updatedQuantity.quantity
}
