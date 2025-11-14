import { prisma } from "../prisma";

export default async function decreaseMaterial(
  userId: string,
  nomalId: string | null,
  monsterId: string | null,
  quantity: number
) {
  if (nomalId) {
    await prisma.userHasDropItems.update({
      where: {
        userId_nomalItemId: {
          userId: userId,
          nomalItemId: nomalId,
        },
      },
      data: {
        quantity: { decrement: quantity },
      },
    });
    return;
  } else if (monsterId) {
    await prisma.userHasDropItems.update({
      where: {
        userId_monsterItemId: {
          userId: userId,
          monsterItemId: monsterId,
        },
      },
      data: {
        quantity: { decrement: quantity },
      },
    });
    return;
  } else return;
}
