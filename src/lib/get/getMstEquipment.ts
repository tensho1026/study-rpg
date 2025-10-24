import { prisma } from "../prisma";


export async function fetchEquipments() {
  return prisma.mstEquipment.findMany();
}