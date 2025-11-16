import { prisma } from "../prisma";

export default async function createGuild(
  name: string,
  description: string,
  userId: string
) {
  const guildId = await prisma.guild.create({
    data: {
      name,
      description,
      leaderId: userId,
    },
    select: {
      id: true,
    },
  });
  return guildId.id;
}
