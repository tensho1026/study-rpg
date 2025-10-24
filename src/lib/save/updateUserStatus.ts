import { prisma } from "../prisma";

export default async function updateUserStautusFunction(
  userId: string,
  minutes: number
) {
  const updatedStatus = await prisma.userStatus.update({
    where: {
      userId: userId,
    },
    data: {
      totalStudy: { increment: minutes },
      money: { increment: minutes * 5 },
      exp: { increment: minutes },
    },
    select: {
      totalStudy: true,
    },
  });

  return updatedStatus;
}
