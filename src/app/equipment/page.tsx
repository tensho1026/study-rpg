import Equipment from "@/components/equipment/Equipment";
import getEquipmentData from "../actions/equipment/getEquipmentData";

export default async function EquipmentPage() {
  const data = await getEquipmentData();
  const cleaned =
    data
      ?.filter(
        (item) =>
          (item.equipmentId !== null && item.mstEquipment !== null) ||
          (item.craftEquipmentId !== null && item.mstCraft !== null)
      )
      .map((item) => ({
        equipmentId: item.equipmentId,
        craftEquipmentId: item.craftEquipmentId,
        isDraft: item.isDraft,
        mstEquipment: item.mstEquipment,
        mstCraftEquipments: item.mstCraft,
      })) ?? [];

  return <Equipment userEquipments={cleaned ?? []} />;
}
