import { prisma } from "@/lib/prisma";
import { levelBorder } from "@/constant/levelBorder";

export default async function updateUserLevel(
  userId: string,
  totalStudy: number
) {
  const total = totalStudy ?? 0;

  const levelIndex = levelBorder.findLastIndex((time) => total >= time);
  const newLevel = Math.max(1, levelIndex + 1);

  await prisma.userStatus.update({
    where: { userId },
    data: { level: newLevel },
  });

  return newLevel;
}
