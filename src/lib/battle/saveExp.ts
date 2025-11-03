import { prisma } from "../prisma";

export default async function saveExp(userId: string, exp: number) {
  // レベル保存のためにexpの合計は返すようにしておく
  const totalExp = await prisma.battleStatus.update({
    where: {
      userId: userId,
    },
    data: {
      exp: { increment: exp },
    },
    select: {
      exp: true,
    },
  });
  return totalExp.exp;
}
