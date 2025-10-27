import Battle from "@/components/battle/Battle";
import getBattleData from "../actions/battle/getBattleData";

export default async function BattlePage() {
  const enemy = await getBattleData;
  return <Battle />;
}
