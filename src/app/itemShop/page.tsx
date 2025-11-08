import ItemShop from "@/components/itemShop/ItemShop";
import getItemShopData from "../actions/itemShop/getItemShopData";

export default async function ItemShopPage() {
  const data = await getItemShopData();
  return (
    <ItemShop coin={data?.userCoins ?? 0} mstData={data?.howUserHas ?? []} />
  );
}
