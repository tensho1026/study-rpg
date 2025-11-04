/*
  Warnings:

  - A unique constraint covering the columns `[userId,battleItemId]` on the table `UserHasBattleItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserHasBattleItem_userId_battleItemId_key" ON "UserHasBattleItem"("userId", "battleItemId");
