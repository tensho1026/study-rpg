import { prisma } from "@/lib/prisma";
import { enemiesData } from "@/constant/enemies";
import { enemyDropItemsData } from "@/constant/enemyDropitem";


export default async function seedEnemiesAndDrops() {
  // 1. 固有ドロップ素材登録
  for (const mat of enemyDropItemsData) {
    const item = mat.item; // ネストを展開
    await prisma.mstMonsterDropItem.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }

  // 3. 敵登録＋ドロップ素材紐付け
  for (const enemy of enemiesData) {
    const drop = enemyDropItemsData.find((d) => d.enemyId === enemy.id);

    await prisma.mstEnemies.upsert({
      where: { id: enemy.id },
      update: {
        ...enemy,
        dropItemId: drop ? drop.item.id : null,
      },
      create: {
        ...enemy,
        dropItemId: drop ? drop.item.id : null,
      },
    });
  }

  console.log("✅ Seeding completed successfully");
}
