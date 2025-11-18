import { prisma } from "../prisma";

export default async function getGuildData() {
  return await prisma.guild.findMany({
    include: {
      leader: true,
      members: true,
    },
  });
}
