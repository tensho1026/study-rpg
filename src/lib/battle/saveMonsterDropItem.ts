import { prisma } from "../prisma";

export default async function saveMonsterItem(
  userId: string,
  monsterId: string
) {
  await prisma.userHasDropItems.upsert({
    where: {
      userId_monsterItemId: {
        userId,
        monsterItemId: monsterId,
      },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      userId: userId,
      monsterItemId: monsterId,
    },
  });
}
