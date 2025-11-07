import getBattleData from "@/app/actions/battle/getBattleData";
import Battle from "@/components/battle/Battle";
type Props = {
  params: {
    id: string;
  };
};

export default async function BattlePage({ params }: Props) {
  const { id } = params;
  const data = await getBattleData(id);

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

  return (
    <Battle
      userInfo={data.battleStatus}
      enemyData={enemy}
      dropItems={{ monsterDrop: monsterDrop, nomalDrop: normalDrop }}
      userAttackStatus={data.userBattleStatus.attack}
      userDefenseStatus={data.userBattleStatus.defense}
      items={data.battleItems ?? []}
    />
  );
}
