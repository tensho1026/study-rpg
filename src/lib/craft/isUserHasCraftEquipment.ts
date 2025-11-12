import { prisma } from "../prisma";

export default async function isUserHasCraftEquipment(userId: string) {
  const data = await prisma.equipment.findMany({
    where: {
      userId: userId,
      sourceType: "CRAFT",
    },
  });
  return data;
}
