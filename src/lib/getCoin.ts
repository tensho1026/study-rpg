import { prisma } from "./prisma";

export default async function getCoins(userId:string) {
  const coins = await prisma.userStatus.findFirst({
    where:{
      userId:userId
    }
  })

  return coins
}