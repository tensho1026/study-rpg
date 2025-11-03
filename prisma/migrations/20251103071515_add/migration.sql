/*
  Warnings:

  - A unique constraint covering the columns `[userId,nomalItemId]` on the table `UserHasDropItems` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,monsterItemId]` on the table `UserHasDropItems` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserHasDropItems_userId_nomalItemId_key" ON "UserHasDropItems"("userId", "nomalItemId");

-- CreateIndex
CREATE UNIQUE INDEX "UserHasDropItems_userId_monsterItemId_key" ON "UserHasDropItems"("userId", "monsterItemId");
