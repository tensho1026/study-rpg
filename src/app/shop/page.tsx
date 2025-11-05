import Shop from "@/components/shop/Shop";
import getEquipmentData from "../actions/shop/getShopData";

export default async function ShopPage() {
  const data = await getEquipmentData();
  return (
    <Shop
      shopEquipments={data?.equipments ?? []}
      coin={data?.userCoins ?? 0}
      userEquipment={data?.userEquipments ?? []}
    />
  );
}
