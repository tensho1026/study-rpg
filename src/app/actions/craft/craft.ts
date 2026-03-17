"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function craft(
  equipmentId: string,
  normalId: string | null,
  monsterId: string | null
) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userId = session.user.id;

  return prisma.$transaction(async (tx) => {
    const [craftEquipment, userStatus, ownedEquipment] = await Promise.all([
      tx.mstCraftEquipments.findUnique({
        where: {
          id: equipmentId,
        },
        select: {
          cost: true,
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
          craftEquipmentId: equipmentId,
        },
        select: {
          id: true,
        },
      }),
    ]);

    if (!craftEquipment) {
      throw new Error("クラフト装備データが見つかりません。");
    }

    if (ownedEquipment) {
      return {
        equippedId: null,
        money: { money: userStatus.money },
        materialQuantity: null,
      };
    }

    if (userStatus.money < craftEquipment.cost) {
      throw new Error("残高不足です。");
    }

    const recipe = await tx.mstEquipmentRecipe.findFirst({
      where: {
        equipmentId,
        monsterMaterialId: monsterId,
        normalMaterialId: normalId,
      },
      select: {
        quantity: true,
      },
    });

    if (!recipe) {
      throw new Error("クラフトに必要な素材設定が見つかりません。");
    }

    if (!normalId && !monsterId) {
      throw new Error("素材情報が不足しています。");
    }

    const currentMaterial = normalId
      ? await tx.userHasDropItems.findUnique({
          where: {
            userId_nomalItemId: {
              userId,
              nomalItemId: normalId,
            },
          },
          select: {
            quantity: true,
          },
        })
      : await tx.userHasDropItems.findUnique({
          where: {
            userId_monsterItemId: {
              userId,
              monsterItemId: monsterId!,
            },
          },
          select: {
            quantity: true,
          },
        });

    if (!currentMaterial || currentMaterial.quantity < recipe.quantity) {
      throw new Error("素材が不足しています。");
    }

    await tx.equipment.create({
      data: {
        craftEquipmentId: equipmentId,
        sourceType: "CRAFT",
        userId,
        isDraft: false,
      },
    });

    const updatedMoney = await tx.userStatus.update({
      where: {
        userId,
      },
      data: {
        money: { decrement: craftEquipment.cost },
      },
      select: {
        money: true,
      },
    });

    const updatedMaterial = normalId
      ? await tx.userHasDropItems.update({
          where: {
            userId_nomalItemId: {
              userId,
              nomalItemId: normalId,
            },
          },
          data: {
            quantity: { decrement: recipe.quantity },
          },
          select: {
            quantity: true,
          },
        })
      : await tx.userHasDropItems.update({
          where: {
            userId_monsterItemId: {
              userId,
              monsterItemId: monsterId!,
            },
          },
          data: {
            quantity: { decrement: recipe.quantity },
          },
          select: {
            quantity: true,
          },
        });

    return {
      equippedId: equipmentId,
      money: updatedMoney,
      materialQuantity: {
        nomalId: normalId,
        monsterId,
        quantity: updatedMaterial.quantity,
      },
    };
  });
}
