/*
  Warnings:

  - A unique constraint covering the columns `[dropItemId]` on the table `MstEnemies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MstEnemies" ADD COLUMN     "dropItemId" TEXT;

-- CreateTable
CREATE TABLE "MstMonsterDropItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rare" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MstMonsterDropItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MstNomalDropitem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rare" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "MstNomalDropitem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MstEnemies_dropItemId_key" ON "MstEnemies"("dropItemId");

-- AddForeignKey
ALTER TABLE "MstEnemies" ADD CONSTRAINT "MstEnemies_dropItemId_fkey" FOREIGN KEY ("dropItemId") REFERENCES "MstMonsterDropItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
