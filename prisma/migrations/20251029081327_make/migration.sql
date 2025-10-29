-- CreateTable
CREATE TABLE "UserHasDropItems" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nomalItemId" TEXT,
    "monsterItemId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "obtainedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHasDropItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserHasDropItems" ADD CONSTRAINT "UserHasDropItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasDropItems" ADD CONSTRAINT "UserHasDropItems_monsterItemId_fkey" FOREIGN KEY ("monsterItemId") REFERENCES "MstMonsterDropItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasDropItems" ADD CONSTRAINT "UserHasDropItems_nomalItemId_fkey" FOREIGN KEY ("nomalItemId") REFERENCES "MstNomalDropitem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
