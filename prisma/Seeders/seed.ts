import { prisma } from "@/lib/prisma";
import seedEquipmentData from "./equipment";
import seedEnemiesAndDrops from "./monsterDropItem";
import seedNormalDropItems from "./nomalDropItem";

async function main() {
  await seedEquipmentData();
  await seedNormalDropItems();
  await seedEnemiesAndDrops();
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
