import { prisma } from "@/lib/prisma";

export async function equipEquipment(userId: string, equipmentId: string) {
  await prisma.equipment.updateMany({
   where: {
      userId,
      OR: [
        { equipmentId },
        { craftEquipmentId: equipmentId },
      ],
    },
    // where: { userId_equipmentId: { userId, equipmentId } },
    data: { isDraft: true },
  });
}





