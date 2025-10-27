import { prisma } from "../prisma";

export default async function getEquipmentCost(equipmentId: string) {
  const equipmentCost = await prisma.mstEquipment.findFirst({
    where: {
      id: equipmentId,
    },
    select: {
      price: true,
    },
  });

  return equipmentCost?.price;
}
