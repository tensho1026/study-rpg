import { prisma } from "../prisma";

export async function getOrCreateUserStatusFunction(userId: string) {
  const status = await prisma.userStatus.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
    },
  });

  return status;
}
