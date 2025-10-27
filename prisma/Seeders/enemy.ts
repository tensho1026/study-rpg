import { enemiesData } from "@/constant/enemies";
import { prisma } from "@/lib/prisma";

export default async function seedEnemyData() {
  const enemies = enemiesData;

  for (const enemy of enemies) {
    await prisma.mstEnemies.upsert({
      where: { id: enemy.id },
      update: {
        name: enemy.name,
        hp: enemy.hp,
        maxHp: enemy.maxHp,
        attack: enemy.attack,
        defense: enemy.defense,
        exp: enemy.exp,
        gold: enemy.gold,
      },
      create: {
        id: enemy.id,
        name: enemy.name,
        hp: enemy.hp,
        maxHp: enemy.maxHp,
        attack: enemy.attack,
        defense: enemy.defense,
        exp: enemy.exp,
        gold: enemy.gold,
      },
    });
  }
}
