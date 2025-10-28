import { normalDropItemsData } from "@/constant/nomalDropItem";
import { prisma } from "@/lib/prisma";

export default async function seedNormalDropItems() {
  for (const item of normalDropItemsData) {
    await prisma.mstNomalDropitem.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
}
