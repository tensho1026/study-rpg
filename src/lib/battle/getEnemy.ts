"use server";
import { prisma } from "../prisma";

export default async function getEnemy(type: string) {
  const enemys = await prisma.mstEnemies.findMany({
    where: {
      mapId: type,
    },
  });

  const randomEnemy = enemys[Math.floor(Math.random() * enemys.length)];

  // const randomIndex = String(Math.floor(Math.random() * enemyCount) + 1);

  // const data = await prisma.mstEnemies.findFirst({
  //   where: {
  //     id: randomIndex,
  //   },
  //   include: {
  //     dropItem: true,
  //   },
  // });

  return randomEnemy;
}
