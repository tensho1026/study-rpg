"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function purchaseEquipment(equipmentId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session.user.id;

  return prisma.$transaction(async (tx) => {
    const [equipment, userStatus, ownedEquipment] = await Promise.all([
      tx.mstEquipment.findUnique({
        where: {
          id: equipmentId,
        },
        select: {
          price: true,
        },
      }),
      tx.userStatus.upsert({
        where: {
          userId,
        },
        update: {},
        create: {
          userId,
        },
        select: {
          money: true,
        },
      }),
      tx.equipment.findFirst({
        where: {
          userId,
          equipmentId,
        },
        select: {
          id: true,
        },
      }),
    ]);

    if (!equipment) {
      throw new Error("装備データが見つかりません。");
    }

    if (ownedEquipment) {
      return {
        alreadyOwned: true,
        newMoney: userStatus.money,
      };
    }

    if (userStatus.money < equipment.price) {
      throw new Error("残高不足です。");
    }

    await tx.equipment.create({
      data: {
        equipmentId,
        userId,
        isDraft: false,
      },
    });

    const updatedStatus = await tx.userStatus.update({
      where: {
        userId,
      },
      data: {
        money: { decrement: equipment.price },
      },
      select: {
        money: true,
      },
    });

    return {
      alreadyOwned: false,
      newMoney: updatedStatus.money,
    };
  });
}
