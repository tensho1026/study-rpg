import ItemShop from "@/components/itemShop/ItemShop";
import getItemShopData from "../actions/itemShop/getItemShopData";
import { redirect } from "next/navigation";

export default async function ItemShopPage() {
  const data = await getItemShopData();
  if (!data) {
    redirect("/auth/signin");
  }
  return (
    <ItemShop coin={data?.userCoins ?? 0} mstData={data?.howUserHas ?? []} />
  );
}
