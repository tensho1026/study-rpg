import Craft from "@/components/craft/Craft";
import getCraftData from "../actions/craft/getCraftData";

export default async function CraftPage() {
  const data = await getCraftData();
  console.log(data?.userHasEquipments);

  return (
    <Craft
      userCoin={data?.userCoin ?? 0}
      equipmentsData={data?.mstData ?? []}
      userHasData={data?.userHasDropItems ?? []}
    />
  );
}
