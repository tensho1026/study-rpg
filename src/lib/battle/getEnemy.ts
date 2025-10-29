import { prisma } from "../prisma";

export default async function getEnemy() {
  const enemyCount = await prisma.mstEnemies.count();
  if (enemyCount === 0) return null;

  const randomIndex = String(Math.floor(Math.random() * enemyCount) + 1);

  const data = await prisma.mstEnemies.findFirst({
    where: {
      id: randomIndex,
    },
    include: {
      dropItem: true,
    },
  });

  return data;
}
