import { prisma } from "./prisma";

export default async function getUserEquipments(userId:string) {
  const equipments = await prisma.equipment.findMany({
    where:{
      userId:userId
    },
    select:{
      equipmentId:true,
      isDraft:true
    }

  })
  return equipments
}