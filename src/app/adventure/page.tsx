import Adventure from "@/components/adventure/Adventure";
import { getLevel } from "../actions/adventure/getLevel";

export default async function Adventurepage() {
  const level = await getLevel();
  return <Adventure level={level ?? 0} />;
}
