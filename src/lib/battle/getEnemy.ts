"use server";
import { prisma } from "../prisma";

export default async function getEnemy(type: string) {
  const enemys = await prisma.mstEnemies.findMany({
    where: {
      mapId: type,
    },
    include: {
      dropItem: true,
    },
  });

  const randomEnemy = enemys[Math.floor(Math.random() * enemys.length)];

  return randomEnemy;
}
