import { prisma } from "./prisma";

export default async function getCoins(userId:string) {
  const coins = await prisma.userStatus.findFirst({
    where:{
      userId:userId
    },
    select:{
      money:true
    }
  })

  return coins?.money
}