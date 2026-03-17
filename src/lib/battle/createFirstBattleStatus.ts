import { prisma } from "../prisma";
import getBattleBaseStats from "./getBattleBaseStats";

export default async function CreateFirstBattleStatus(userId: string) {
  const initialStats = getBattleBaseStats(1);

  await prisma.battleStatus.create({
    data: {
      userId: userId,
      hp: initialStats.maxHp,
      maxHp: initialStats.maxHp,
      attack: initialStats.attack,
      defense: initialStats.defense,
    },
  });
}
