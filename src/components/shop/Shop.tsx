"use client";

import { useEffect, useState } from "react";
import { ShopItem } from "@/types/shopItems";
import Header from "@/components/shop/Header";
import Return from "@/components/shop/Return";
import SelectTab from "@/components/common/SelectTab";
import ItemLists from "@/components/shop/ItemLists";
import getEquipmentData from "@/app/actions/shop/getShopData";

type UserEquipments = {
  equipmentId: string;
  isDraft: boolean;
};

function Shop() {
  const [selectedTab, setSelectedTab] = useState<
    "weapon" | "armor" | "accessory"
  >("weapon");
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [userCoins, setUserCoins] = useState<number | null>(0);
  const [userEquipments, setUserEquipments] = useState<UserEquipments[]>([]);
  useEffect(() => {
    const fetchItems = async () => {
      const data = await getEquipmentData();
      console.log(data, "取得データ");

      setShopItems(data?.equipments ?? []);
      setUserCoins(data?.userCoins ?? 0);
      setUserEquipments(data?.userEquipments ?? []);
    };
    fetchItems();
  }, []);
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ヘッダー */}
        <Header userCoins={userCoins ?? 0} />

        <SelectTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* アイテムリスト */}
        <ItemLists
          shopItems={shopItems}
          selectedTab={selectedTab}
          userEquipments={userEquipments}
          setUserEquipments={setUserEquipments}
          setUserCoins={setUserCoins}
        />

        {/* 戻るボタン */}
        <Return />
      </div>
    </div>
  );
}

export default Shop;
