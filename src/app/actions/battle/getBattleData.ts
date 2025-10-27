"use server";

import { authOptions } from "@/lib/auth";
import CreateFirstBattleStatus from "@/lib/battle/createFirstBattleStatus";
import getBattleStatus from "@/lib/battle/getBattleStatus";
import getEnemy from "@/lib/battle/getEnemy";
import { getServerSession } from "next-auth";

export default async function getBattleData() {
  const session = await getServerSession(authOptions);
  if (!session) return;

  let battleStatus = await getBattleStatus(session.user.id);

  if (!battleStatus) {
    await CreateFirstBattleStatus(session.user.id);
    battleStatus = await getBattleStatus(session.user.id);
  }

  const enemyData = await getEnemy();

  return { battleStatus, enemyData };
}
