-- 1. 一時的に新しい enum を作る
CREATE TYPE "BattleItemType" AS ENUM ('attack', 'heal', 'buff', 'material', 'key');

-- 2. 一時カラムを作る
ALTER TABLE "MstBattleItem" ADD COLUMN "type_tmp" "BattleItemType";

-- 3. 旧 string カラムの内容をコピー（値が enum に一致する前提）
UPDATE "MstBattleItem" SET "type_tmp" = "type"::"BattleItemType";

-- 4. 旧カラムを削除して、新しい enum カラムに置き換える
ALTER TABLE "MstBattleItem" DROP COLUMN "type";
ALTER TABLE "MstBattleItem" RENAME COLUMN "type_tmp" TO "type";
