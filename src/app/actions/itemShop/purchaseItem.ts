"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function purchaseItem(itemId: string, cost: number) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  // ↓前に使ってたやつ
  // await purchaseBattleItem(session.user.id, itemId);
  // await decreaseUserCoins(session.user.id, cost);

  // transactionを使うようにした;
  return await prisma.$transaction(async (tx) => {
    const user = await tx.userStatus.findFirst({
      where: {
        userId: session.user.id,
      },
      select: {
        money: true,
      },
    });

    if (!user) {
      throw new Error("ユーザーが存在しません。");
    }
    if (user.money < cost) {
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
        money: { decrement: cost },
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
