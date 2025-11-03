import { levelBorder } from "@/constant/levelBorder";
import { prisma } from "../prisma";

export default async function updateBattleLevel(
  userId: string,
  totalExp: number
) {
  const total = totalExp ?? 0;

  const levelIndex = levelBorder.findLastIndex((exp) => total >= exp);
  const newLevel = Math.max(1, levelIndex + 1);

  await prisma.battleStatus.update({
    where: { userId },
    data: { level: newLevel },
  });

  return newLevel;
}
