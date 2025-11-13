import Equipment from "@/components/equipment/Equipment";
import getEquipmentData from "../actions/equipment/getEquipmentData";

export default async function EquipmentPage() {
  const data = await getEquipmentData();
  const cleaned =
    data
      ?.filter(
        (item) => item.equipmentId !== null && item.mstEquipment !== null
      )
      .map((item) => ({
        equipmentId: item.equipmentId!,
        isDraft: item.isDraft,
        mstEquipment: item.mstEquipment!, 
      })) ?? [];

  return <Equipment userEquipments={cleaned ?? []} />;
}
