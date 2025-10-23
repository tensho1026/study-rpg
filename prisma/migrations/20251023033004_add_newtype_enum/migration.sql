-- CreateEnum
CREATE TYPE "EquipmentType" AS ENUM ('weapon', 'armor', 'accessory');

-- AlterTable
ALTER TABLE "MstEquipment" ADD COLUMN     "newType" "EquipmentType";
