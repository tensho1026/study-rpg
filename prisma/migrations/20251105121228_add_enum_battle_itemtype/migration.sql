/*
  Warnings:

  - Made the column `type` on table `MstBattleItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MstBattleItem" ALTER COLUMN "type" SET NOT NULL;
