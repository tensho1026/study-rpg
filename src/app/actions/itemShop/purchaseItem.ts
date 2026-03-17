"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function purchaseItem(itemId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  return await prisma.$transaction(async (tx) => {
    const [user, item] = await Promise.all([
      tx.userStatus.upsert({
        where: {
          userId: session.user.id,
        },
        update: {},
        create: {
          userId: session.user.id,
        },
        select: {
          money: true,
        },
      }),
      tx.mstBattleItem.findUnique({
        where: {
          id: itemId,
        },
        select: {
          price: true,
        },
      }),
    ]);

    if (!item || item.price == null) {
      throw new Error("アイテム価格が取得できません。");
    }
    if (user.money < item.price) {
      throw new Error("残高不足です。");
    }

    const updatedItem = await tx.userHasBattleItem.upsert({
      where: {
        userId_battleItemId: {
          userId: session.user.id,
          battleItemId: itemId,
        },
      },
      update: {
        quantity: { increment: 1 },
      },
      create: {
        userId: session.user.id,
        battleItemId: itemId,
      },
      select: {
        battleItemId: true,
        quantity: true,
      },
    });

    const updatedMoney = await tx.userStatus.update({
      where: {
        userId: session.user.id,
      },
      data: {
        money: { decrement: item.price },
      },
      select: {
        money: true,
      },
    });

    return {
      updatedItem,
      newMoney: updatedMoney.money,
    };
  });
}
