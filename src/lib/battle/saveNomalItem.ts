import { prisma } from "../prisma";

export default async function saveNomalItem(userId: string, nomalId: string) {
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
}
