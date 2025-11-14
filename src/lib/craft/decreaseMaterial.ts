import { prisma } from "../prisma";

export default async function decreaseMaterial(
  userId: string,
  nomalId: string | null,
  monsterId: string | null,
  quantity: number
) {
  if (nomalId) {
    const updated = await prisma.userHasDropItems.update({
      where: {
        userId_nomalItemId: {
          userId,
          nomalItemId: nomalId,
        },
      },
      data: {
        quantity: { decrement: quantity },
      },
      select: {
        quantity: true,
      },
    });

    return {
      nomalId,
      monsterId: null,
      quantity: updated.quantity,
    };
  }

  if (monsterId) {
    const updated = await prisma.userHasDropItems.update({
      where: {
        userId_monsterItemId: {
          userId,
          monsterItemId: monsterId,
        },
      },
      data: {
        quantity: { decrement: quantity },
      },
      select: {
        quantity: true,
      },
    });

    return {
      nomalId: null,
      monsterId,
      quantity: updated.quantity,
    };
  }

  return null;
}
