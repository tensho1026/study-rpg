import ItemShop from "@/components/itemShop/ItemShop";
import React from "react";
import getItemShopData from "../actions/itemShop/getItemShopData";

export default async function ItemShopPage() {
  const data = await getItemShopData();
  console.log(data);
  return (
    <ItemShop coin={data?.userCoins ?? 0} mstData={data?.howUserHas ?? []} />
  );
}
