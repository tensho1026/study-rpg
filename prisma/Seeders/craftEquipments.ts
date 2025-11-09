import { craftEquipmentsData } from "@/constant/craftEquipmentsData";
import { prisma } from "@/lib/prisma";


export default async function seedCraftEquipments() {
  for (const equip of craftEquipmentsData) {
    await prisma.mstCraftEquipments.upsert({
      where: { id: equip.id },
      update: {
        name: equip.name,
        type: equip.type,
        attack: equip.attack ?? null,
        defense: equip.defense ?? null,
        rarity: equip.rarity,
        description: equip.description,
        cost: equip.craftCost,
      },
      create: {
        id: equip.id,
        name: equip.name,
        type: equip.type,
        attack: equip.attack ?? null,
        defense: equip.defense ?? null,
        rarity: equip.rarity,
        description: equip.description,
        cost: equip.craftCost,
      },
    });
  }

  console.log("✅ MstCraftEquipments seeding complete");
}
