'use server'
import { prisma } from "../../../lib/prisma";

export default async function getEquipmentData() {
  const equipments = await prisma.mstEquipment.findMany()

  return equipments;
}
