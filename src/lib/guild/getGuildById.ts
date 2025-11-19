import { prisma } from "../prisma";

export default async function getGuildByid(id: string) {
  const data = await prisma.guild.findFirst({
    where: {
      id,
    },
    include: {
      leader: true,
      members: true,
    },
  });
  return data;
}
