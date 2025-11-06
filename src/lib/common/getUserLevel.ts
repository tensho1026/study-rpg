"use server";

import { prisma } from "../prisma";

export async function getUserLevel(userId: string) {
  const level = await prisma.userStatus.findFirst({
    where: { userId: userId },
    select: {
      level: true,
    },
  });

  return level;
}
