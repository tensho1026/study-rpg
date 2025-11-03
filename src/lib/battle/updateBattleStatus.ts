import { prisma } from "../prisma";

export default async function updateBattleStatus(
  userId: string,
  userLevel: number
) {
  await prisma.battleStatus.update({
    where: {
      userId: userId,
    },
    data: {
      maxHp: 10 * userLevel + 100,
      attack: 10 * userLevel,
      defense: 10 * userLevel,
    },
  });
}
