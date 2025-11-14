import Craft from "@/components/craft/Craft";
import getCraftData from "../actions/craft/getCraftData";

export default async function CraftPage() {
  const data = await getCraftData();

  const userHasEquipmentsIds =
    data?.userHasEquipments
      .map((item) => item.craftEquipmentId)
      .filter((id): id is string => id !== null) ?? undefined;

  return (
    <Craft
      userCoin={data?.userCoin ?? 0}
      equipmentsData={data?.mstData ?? []}
      userHasData={data?.userHasDropItems ?? []}
      userHasEquipments={userHasEquipmentsIds}
    />
  );
}
