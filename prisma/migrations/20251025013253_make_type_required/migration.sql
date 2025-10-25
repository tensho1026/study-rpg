/*
  Warnings:

  - Made the column `type` on table `MstEquipment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MstEquipment" ALTER COLUMN "type" SET NOT NULL;
