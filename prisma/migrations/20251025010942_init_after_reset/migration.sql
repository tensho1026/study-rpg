/*
  Warnings:

  - You are about to drop the column `newType` on the `MstEquipment` table. All the data in the column will be lost.
  - The `type` column on the `MstEquipment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,equipmentId]` on the table `Equipment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MstEquipment" DROP COLUMN "newType",
DROP COLUMN "type",
ADD COLUMN     "type" "EquipmentType";

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_userId_equipmentId_key" ON "Equipment"("userId", "equipmentId");
