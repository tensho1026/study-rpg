import { prisma } from "../prisma";

export default async function getUsetHasItems(userId: string) {
  const data = await prisma.userHasBattleItem.findMany({
    where: {
      userId: userId,
    },
    include: {
      battleItem: true,
    },
  });

  const merged = data.map((entry) => ({
    ...entry.battleItem, // マスタのデータ
    quantity: entry.quantity, // 所持数
  }));
  return merged;
}
