import { prisma } from "@/lib/prisma";
import { levelBorder } from "@/constant/levelBorder";

export default async function updateUserLevel(
  userId: string,
  totalStudy: number
) {
  const total = totalStudy ?? 0;

  const newLevel = levelBorder.filter((time) => total >= time).length - 1;

  await prisma.userStatus.update({
    where: { userId },
    data: { level: newLevel },
  });

  return newLevel;
}
