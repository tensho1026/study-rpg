import { prisma } from "../prisma";

export default async function getBattleStatus(userId: string) {
  const battleStatus = await prisma.battleStatus.findFirst({
    where: {
      userId: userId,
    },
    include: {
      user: {
        include: {
          equipments: {
            where: {
              isDraft: true,
            },
            include: {
              mstEquipment: true,
            },
          },
        },
      },
    },
  });

  return battleStatus;
}

