import { prisma } from "../prisma";

export default async function decreaseUserCoins(userId: string, cost: number) {
  const moneyQuantity = await prisma.userStatus.update({
    where: {
      userId: userId,
    },
    data: {
      money: { decrement: cost },
    },
    select: {
      money: true,
    },
  });
  return moneyQuantity;
}
