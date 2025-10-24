import { prisma } from "../prisma";

export default async function getUserEquipments(userId: string) {
  const equipments = await prisma.equipment.findMany({
    where: {
      userId: userId,
    },
    select: {
      equipmentId: true,
      isDraft: true,
      mstEquipment: {
        select: {
          id: true,
          name: true,
          type: true,
          price: true,
          attack: true,
          defense: true,
          description: true,
        },
      },
    },
  });
  return equipments;
}
