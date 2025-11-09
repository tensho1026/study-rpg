import Craft from "@/components/craft/Craft";
import getCraftData from "../actions/craft/getCraftData";

export default async function CraftPage() {
  const data = await getCraftData();
  console.log(data?.userHasDropItems);
  return <Craft userCoin={data?.userCoin ?? 0} />;
}
