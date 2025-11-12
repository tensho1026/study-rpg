/*
  Warnings:

  - A unique constraint covering the columns `[userId,craftEquipmentId]` on the table `Equipment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "EquipmentSourceType" AS ENUM ('SHOP', 'CRAFT');

-- DropForeignKey
ALTER TABLE "public"."Equipment" DROP CONSTRAINT "Equipment_equipmentId_fkey";

-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "craftEquipmentId" TEXT,
ADD COLUMN     "sourceType" "EquipmentSourceType" NOT NULL DEFAULT 'SHOP',
ALTER COLUMN "equipmentId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_userId_craftEquipmentId_key" ON "Equipment"("userId", "craftEquipmentId");

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "MstEquipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_craftEquipmentId_fkey" FOREIGN KEY ("craftEquipmentId") REFERENCES "MstCraftEquipments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
