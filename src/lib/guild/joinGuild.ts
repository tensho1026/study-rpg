import { prisma } from "../prisma";

export default async function joinGuildFunction(
  userId: string,
  guildId: string
) {
  await prisma.userGuildStatus.create({
    data: {
      userId,
      guildId,
    },
  });
}
