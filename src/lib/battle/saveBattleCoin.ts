import { prisma } from "../prisma";

export default async function saveBattleCoin(userId: string, coin: number) {
  await prisma.battleStatus.update({
    where: {
      userId: userId,
    },
    data: {
      battleCoin: { increment: coin },
    },
  });
}
