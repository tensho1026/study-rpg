import Battle from "@/components/battle/Battle";
import getBattleData from "../actions/battle/getBattleData";

export default async function BattlePage() {
  const data = await getBattleData();
  console.log(data?.userBattleStatus, "デーーーーーーーーーた");

  if (!data || !data.battleStatus || !data.enemyData) {
    return null;
  }

  const enemy = {
    name: data.enemyData.name,
    hp: data.enemyData.hp,
    maxHp: data.enemyData.maxHp,
    attack: data.enemyData.attack,
    exp: data.enemyData.exp,
    coin: data.enemyData.gold,
  };

  console.log(enemy, "enemy");

  const monsterDrop = data.enemyData.dropItem
    ? {
        id: data.enemyData.dropItem.id,
        name: data.enemyData.dropItem.name,
        rare: data.enemyData.dropItem.rare,
        description: data.enemyData.dropItem.description,
      }
    : {
        id: "monster-drop-none",
        name: "ドロップなし",
        rare: 0,
        description: "",
      };

  console.log(monsterDrop, "敵専用ドロップ");

  const normalDrop = data.dropItem
    ? {
        id: data.dropItem.id,
        name: data.dropItem.name,
        rare: data.dropItem.rare,
        description: data.dropItem.description,
      }
    : {
        id: "normal-drop-none",
        name: "ドロップなし",
        rare: 0,
        description: "",
      };
  console.log(normalDrop, "ノーマルドロップ");

  console.log(data.userBattleStatus);

  return (
    <Battle
      userInfo={data.battleStatus}
      enemyData={enemy}
      dropItems={{ monsterDrop: monsterDrop, nomalDrop: normalDrop }}
      userAttackStatus={data.userBattleStatus.attack}
      userDefenseStatus={data.userBattleStatus.defense}
    />
  );
}
