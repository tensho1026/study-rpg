import Battle from "@/components/battle/Battle";
import getBattleData from "../actions/battle/getBattleData";

export default async function BattlePage() {
  const data = await getBattleData();
  console.log(data?.enemyData,'敵情報');

  if (!data || !data.battleStatus || !data.enemyData) return null;
  return <Battle userInfo={data.battleStatus} enemyData={data.enemyData} />;
}
