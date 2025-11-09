-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('ENEMY', 'NORMAL');

-- CreateTable
CREATE TABLE "MstCraftEquipments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EquipmentType" NOT NULL,
    "attack" INTEGER,
    "defense" INTEGER,
    "rarity" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MstCraftEquipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MstEquipmentRecipe" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "materialType" "MaterialType" NOT NULL,
    "monsterMaterialId" TEXT,
    "normalMaterialId" TEXT,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "MstEquipmentRecipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MstEquipmentRecipe" ADD CONSTRAINT "MstEquipmentRecipe_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "MstCraftEquipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MstEquipmentRecipe" ADD CONSTRAINT "MstEquipmentRecipe_monsterMaterialId_fkey" FOREIGN KEY ("monsterMaterialId") REFERENCES "MstMonsterDropItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MstEquipmentRecipe" ADD CONSTRAINT "MstEquipmentRecipe_normalMaterialId_fkey" FOREIGN KEY ("normalMaterialId") REFERENCES "MstNomalDropitem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
