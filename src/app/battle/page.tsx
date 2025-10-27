import Battle from "@/components/battle/Battle";
import getBattleData from "../actions/battle/getBattleData";

export default async function BattlePage() {
  const data = await getBattleData();

  if (!data || !data.battleStatus || !data.enemyData) return null;
  return <Battle userInfo={data.battleStatus} enemyData={data.enemyData} />;
}
