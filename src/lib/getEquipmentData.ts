import { prisma } from "./prisma";

export default async function getEquipmentData() {
  const equipments = await prisma.mstEquipment.findMany;

  return equipments;
}
