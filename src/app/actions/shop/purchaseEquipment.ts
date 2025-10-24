"use server";

import { prisma } from "@/lib/prisma";

export default async function purchaseEquipment(
  equipmentId: string,
  userId: string
) {
  await prisma.equipment.create({
    data: {
      equipmentId: equipmentId,
      userId: userId,
      isDraft: false,
    },
  });
  const equipmentCost = await prisma.mstEquipment.findFirst({
    where: {
      id: equipmentId,
    },
    select: {
      price: true,
    },
  });

  if (equipmentCost === null || undefined) return;

  await prisma.userStatus.update({
    where: {
      userId: userId,
    },
    data: {
      money: { decrement: equipmentCost.price },
    },
  });

  console.log(equipmentId, "を購入しました");
}
