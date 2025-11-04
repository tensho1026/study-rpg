-- CreateTable
CREATE TABLE "MstBattleItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "healHp" INTEGER,
    "healMp" INTEGER,
    "removeStatus" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "element" TEXT,
    "power" INTEGER,
    "durationTurn" INTEGER,
    "targetType" TEXT,
    "price" INTEGER,
    "rarity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MstBattleItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHasBattleItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "battleItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "obtainedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHasBattleItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MstBattleItem_name_key" ON "MstBattleItem"("name");

-- AddForeignKey
ALTER TABLE "UserHasBattleItem" ADD CONSTRAINT "UserHasBattleItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasBattleItem" ADD CONSTRAINT "UserHasBattleItem_battleItemId_fkey" FOREIGN KEY ("battleItemId") REFERENCES "MstBattleItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
