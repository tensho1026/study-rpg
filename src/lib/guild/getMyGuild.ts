import { prisma } from "../prisma";

export default async function getMyGuild(userId: string) {
  return await prisma.userGuildStatus.findFirst({
    where: {
      userId,
    },
  });
}
