import Equipment from "@/components/equipment/Equipment";
import getEquipmentData from "../actions/equipment/getEquipmentData";

export default async function EquipmentPage() {
  const data = await getEquipmentData();
  return <Equipment userEquipments={data ?? []} />;
}
