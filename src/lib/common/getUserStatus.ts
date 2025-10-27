import { prisma } from "../prisma";

async function getUserStatusFunction(userId: string) {
  return await prisma.userStatus.findFirst({
    where: { userId: userId },
  });
}

export async function getOrCreateUserStatusFunction(userId: string) {
  let  status = await getUserStatusFunction(userId);
  if (!status) {
    status = await prisma.userStatus.create({
      data: {
        userId: userId,
      },
    });
  }
  return status;
}
