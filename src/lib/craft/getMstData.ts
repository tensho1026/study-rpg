import { prisma } from "../prisma";

export default async function getMstData() {
  const data = await prisma.mstCraftEquipments.findMany({
    include: {
      recipes: {
       include:{
        monsterMaterial:true,
        normalMaterial:true
       }
      }
    },
  });
  return data;
}
