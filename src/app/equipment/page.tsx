import Equipment from "@/components/equipment/Equipment";
import getEquipmentData from "../actions/equipment/getEquipmentData";

export default async function EquipmentPage() {
  const data = await getEquipmentData();
  // console.log(data);
  const cleaned =
    data
      ?.filter(
        (item) =>
          (item.equipmentId !== null && item.mstEquipment !== null) ||
          (item.craftEquipmentId !== null && item.mstCraft !== null)
      )
      .map((item) => ({
        equipmentId: item.equipmentId,
        isDraft: item.isDraft,
        mstEquipment: item.mstEquipment,
        craftEquipmentsId: item.craftEquipmentId,
        mstCraftEquipments: item.mstCraft,
      })) ?? [];
  // console.log(cleaned);

  return <Equipment userEquipments={cleaned ?? []} />;
}
