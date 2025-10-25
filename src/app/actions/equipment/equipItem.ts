"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { EquipmentType } from "@prisma/client";

export default async function equipItem(equipmentId: string, type: string) {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session.user.id;

  // つけている装備検索
  const draftedItemId = await prisma.equipment.findFirst({
    where: {
      userId: session.user.id,
      isDraft: true,
      mstEquipment: {
        type: type as EquipmentType,
      },
    },
    select: {
      equipmentId: true,
    },
  });

  if (draftedItemId) {
    // つけていた装備を外す
    await prisma.equipment.update({
      where: {
        userId_equipmentId: {
          userId: session.user.id,
          equipmentId: draftedItemId.equipmentId,
        },
      },
      data: {
        isDraft: !true,
      },
    });
  }

  await prisma.equipment.update({
    where: { userId_equipmentId: { userId, equipmentId } },
    data: {
      isDraft: true,
    },
  });
}
