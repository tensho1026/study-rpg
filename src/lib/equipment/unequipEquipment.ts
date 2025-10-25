import { prisma } from "../prisma";


export async function unequipEquipment(userId: string, equipmentId: string) {
  await prisma.equipment.update({
    where: { userId_equipmentId: { userId, equipmentId } },
    data: { isDraft: false },
  });
}
