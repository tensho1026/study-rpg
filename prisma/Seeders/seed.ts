import { prisma } from "@/lib/prisma";
import seedEquipmentData from "./equipment";
import seedEnemyData from "./enemy";

async function main() {
  await seedEquipmentData();
  await seedEnemyData();
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
