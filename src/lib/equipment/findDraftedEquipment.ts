import { EquipmentType } from "@prisma/client";
import { prisma } from "../prisma";

export default async function findDraftedEquipment(
  userId: string,
  type: EquipmentType
) {
  const draftedItemId = await prisma.equipment.findFirst({
    where: {
      userId: userId,
      isDraft: true,
      mstEquipment: {
        type: type,
      },
    },
    select: {
      equipmentId: true,
    },
  });
  return draftedItemId;
}
