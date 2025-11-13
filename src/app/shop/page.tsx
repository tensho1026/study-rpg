import Shop from "@/components/shop/Shop";
import getEquipmentData from "../actions/shop/getShopData";

export default async function ShopPage() {
  const data = await getEquipmentData();
  const cleanedUserEquipments = (data?.userEquipments ?? [])
    .filter((e) => e.equipmentId !== null)
    .map((e) => ({
      equipmentId: e.equipmentId!, // ← string に確定
      isDraft: e.isDraft,
    }));

  return (
    <Shop
      shopEquipments={data?.equipments ?? []}
      coin={data?.userCoins ?? 0}
      userEquipment={cleanedUserEquipments ?? []}
    />
  );
}
