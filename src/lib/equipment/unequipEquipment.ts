import { prisma } from "../prisma";

export async function unequipEquipment(userId: string, equipmentId: string) {
  await prisma.equipment.updateMany({
    where: {
      userId,
      OR: [{ equipmentId }, { craftEquipmentId: equipmentId }],
    },
    data: { isDraft: false },
  });
}
