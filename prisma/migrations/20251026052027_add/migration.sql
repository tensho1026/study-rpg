-- CreateTable
CREATE TABLE "BattleStatus" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "maxHp" INTEGER NOT NULL DEFAULT 100,
    "hp" INTEGER NOT NULL DEFAULT 100,
    "attack" INTEGER NOT NULL DEFAULT 1,
    "defense" INTEGER NOT NULL DEFAULT 1,
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BattleStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BattleStatus" ADD CONSTRAINT "BattleStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
