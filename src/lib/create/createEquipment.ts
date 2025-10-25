import { prisma } from "../prisma";

export default async function createEquipment(userId:string,equipmentId:string) {
   await prisma.equipment.create({
      data: {
        equipmentId: equipmentId,
        userId: userId,
        isDraft: false,
      },
    });
}