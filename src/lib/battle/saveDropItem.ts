import { prisma } from "../prisma";

export default async function saveDropItem(
  userId: string,
  nomalId: string,
  monsterId: string
) {
  await prisma.userHasDropItems.upsert({
    where: {
      userId_nomalItemId: {
        userId,
        nomalItemId: nomalId,
      },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      userId: userId,
      nomalItemId: nomalId,
    },
  });

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
