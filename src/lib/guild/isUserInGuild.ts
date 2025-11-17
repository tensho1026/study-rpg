"use server";

import { prisma } from "../prisma";

export default async function isUserInGuild(userId: string) {
  const count = await prisma.userGuildStatus.count({
    where: {
      userId,
    },
  });
  return count > 0;
}
