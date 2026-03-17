import { prisma } from "../prisma";
import getBattleBaseStats from "./getBattleBaseStats";

export default async function updateBattleStatus(
  userId: string,
  userLevel: number
) {
  const nextStats = getBattleBaseStats(userLevel);
  const currentStatus = await prisma.battleStatus.findUnique({
    where: {
      userId,
    },
    select: {
      hp: true,
    },
  });

  await prisma.battleStatus.update({
    where: {
      userId: userId,
    },
    data: {
      hp: Math.min(currentStatus?.hp ?? nextStats.maxHp, nextStats.maxHp),
      maxHp: nextStats.maxHp,
      attack: nextStats.attack,
      defense: nextStats.defense,
    },
  });
}
