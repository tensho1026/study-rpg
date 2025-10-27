import { SHOP_ITEMS } from "@/constant/equipments";
import { prisma } from "@/lib/prisma";

export default async function seedEquipmentData() {
  const equipments = SHOP_ITEMS;

  for (const equipment of equipments) {
    await prisma.mstEquipment.upsert({
      where: {
        id: equipment.id,
      },
      update: {
        name: equipment.name,
        type: equipment.type,
        price: equipment.price,
        attack: equipment.attack ?? null,
        defense: equipment.defense ?? null,
        description: equipment.description,
      },
      create: {
        id: equipment.id,
        name: equipment.name,
        type: equipment.type,
        price: equipment.price,
        attack: equipment.attack ?? null,
        defense: equipment.defense ?? null,
        description: equipment.description,
      },
    });
  }
}
