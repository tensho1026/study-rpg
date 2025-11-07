import { prisma } from "@/lib/prisma";
import { battleItems } from "@/constant/battleItems";

export default async function seedBattleItemData() {
  for (const item of battleItems) {
    await prisma.mstBattleItem.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        description: item.description, // Prisma側ではdescription
        type: item.type,
        healHp: item.healHp ?? null,
        healMp: item.healMp ?? null,
        price: item.price,
        rarity: item.rarity,
      },
      create: {
        id: item.id,
        name: item.name,
        description: item.description,
        type: item.type,
        healHp: item.healHp ?? null,
        healMp: item.healMp ?? null,
        price: item.price,
        rarity: item.rarity,
      },
    });
  }
}
