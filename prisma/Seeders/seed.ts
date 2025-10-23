import { SHOP_ITEMS } from "@/constant/equipments";
import { prisma } from "@/lib/prisma";

async function main() {
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

main()
  .then(async () => {
    console.log("Seed completed");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });