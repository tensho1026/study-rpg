"use server";

import { authOptions } from "@/lib/auth";
import saveBattleCoin from "@/lib/battle/saveBattleCoin";
import saveCurrentHp from "@/lib/battle/saveCurrentHp";
import saveExp from "@/lib/battle/saveExp";
import saveMonsterItem from "@/lib/battle/saveMonsterDropItem";
import saveNomalItem from "@/lib/battle/saveNomalItem";
import updateBattleLevel from "@/lib/battle/updateBattleLevel";
import updateBattleStatus from "@/lib/battle/updateBattleStatus";
import { getServerSession } from "next-auth";

export default async function saveRewards(
  nomalId: string,
  monsterId: string,
  coin: number,
  exp: number,
  currentHp: number
): Promise<number | undefined> {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session.user.id;

  const [, , , totalExp] = await Promise.all([
    saveNomalItem(userId, nomalId),
    saveMonsterItem(userId, monsterId),
    saveBattleCoin(userId, coin),
    saveExp(userId, exp),
  ]);

  const newLevel = await updateBattleLevel(userId, totalExp);
  await updateBattleStatus(userId, newLevel);

  await saveCurrentHp(userId, currentHp);

  return newLevel;
}
