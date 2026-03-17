"use server";

import { authOptions } from "@/lib/auth";
import calcUserBattleStatus from "@/lib/battle/calcUserBattleStatus";
import CreateFirstBattleStatus from "@/lib/battle/createFirstBattleStatus";
import getBattleStatus from "@/lib/battle/getBattleStatus";
import getEnemy from "@/lib/battle/getEnemy";
import getRandomDropItem from "@/lib/battle/getRandomDropItem";
import getUserHasItems from "@/lib/battle/getUserHasItems";
import getBattleBaseStats from "@/lib/battle/getBattleBaseStats";
import updateBattleStatus from "@/lib/battle/updateBattleStatus";
import { getServerSession } from "next-auth";

export default async function getBattleData(mapId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userId = session.user.id;
  let battleStatus = await getBattleStatus(userId);

  if (!battleStatus) {
    await CreateFirstBattleStatus(userId);
    battleStatus = await getBattleStatus(userId);
  }

  if (battleStatus) {
    const expectedStats = getBattleBaseStats(battleStatus.level);
    const needsSync =
      battleStatus.maxHp !== expectedStats.maxHp ||
      battleStatus.attack !== expectedStats.attack ||
      battleStatus.defense !== expectedStats.defense;

    if (needsSync) {
      await updateBattleStatus(userId, battleStatus.level);
      battleStatus = await getBattleStatus(userId);
    }
  }

  const userEquipments = battleStatus?.user.equipments;
  const userBattleStatus = calcUserBattleStatus(
    battleStatus,
    userEquipments ?? null
  );

  const [enemyData, dropItem, battleItems] = await Promise.all([
    getEnemy(mapId),
    getRandomDropItem(),
    getUserHasItems(userId),
  ]);

  return { battleStatus, enemyData, dropItem, userBattleStatus, battleItems };
}
