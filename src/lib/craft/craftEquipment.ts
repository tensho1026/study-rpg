import { prisma } from "../prisma";

export default async function craftEquipments(
  userId: string,
  equipmentId: string
) {
  await prisma.equipment.create({
    data: {
      craftEquipmentId: equipmentId,
      sourceType: "CRAFT",
      userId: userId,
      isDraft: false,
      mstEquipment: undefined,
    },
  });
}
