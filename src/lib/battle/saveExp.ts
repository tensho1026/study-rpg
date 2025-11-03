import { prisma } from "../prisma";

export default async function saveExp(userId: string, exp: number) {
  await prisma.battleStatus.update({
    where: {
      userId: userId,
    },
    data: {
      exp: { increment: exp },
    },
  });
}
