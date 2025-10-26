import { prisma } from "../prisma";

export default async function CreateFirstBattleStatus(userId: string) {
  await prisma.battleStatus.create({
    data: {
      userId: userId,
    },
  });
}
