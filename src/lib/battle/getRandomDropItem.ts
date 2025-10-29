import { prisma } from "../prisma";

export default async function getRandomDropItem() {
  const total = await prisma.mstNomalDropitem.count();

  if (total === 0) return;
  const randomIndex = Math.floor(Math.random() * total);

  const dropItem = await prisma.mstNomalDropitem.findFirst({
    skip: randomIndex,
  });

  return dropItem;
}
