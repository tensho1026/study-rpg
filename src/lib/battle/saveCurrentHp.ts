import { prisma } from "../prisma";

export default async function saveCurrentHp(userId: string, currentHp: number) {
  await prisma.battleStatus.update({
    where: {
      userId: userId,
    },
    data: {
      hp: currentHp,
    },
  });
}
