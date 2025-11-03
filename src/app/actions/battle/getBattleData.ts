"use server";

import { authOptions } from "@/lib/auth";
import calcUserBattleStatus from "@/lib/battle/calcUserBattleStatus";
import CreateFirstBattleStatus from "@/lib/battle/createFirstBattleStatus";
import getBattleStatus from "@/lib/battle/getBattleStatus";
import getEnemy from "@/lib/battle/getEnemy";
import getRandomDropItem from "@/lib/battle/getRandomDropItem";
import { getServerSession } from "next-auth";

export default async function getBattleData() {
  const session = await getServerSession(authOptions);
  if (!session) return;

  let battleStatus = await getBattleStatus(session.user.id);

  if (!battleStatus) {
    await CreateFirstBattleStatus(session.user.id);
    battleStatus = await getBattleStatus(session.user.id);
  }

  const userEquipments = await battleStatus?.user.equipments;
  const userBattleStatus = calcUserBattleStatus(battleStatus, userEquipments);

  const enemyData = await getEnemy();

  const dropItem = await getRandomDropItem();

  return { battleStatus, enemyData, dropItem, userBattleStatus };
}
