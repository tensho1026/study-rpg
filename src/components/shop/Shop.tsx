"use client";

import { useState } from "react";
import { ShopItem } from "@/types/shopItems";
import Header from "@/components/shop/Header";
import Return from "@/components/shop/Return";
import SelectTab from "@/components/common/SelectTab";
import ItemLists from "@/components/shop/ItemLists";

type UserEquipments = {
  equipmentId: string;
  isDraft: boolean;
};

type Props = {
  shopEquipments: ShopItem[];
  coin: number | null;
  userEquipment: UserEquipments[];
};

export default function Shop({ shopEquipments, coin, userEquipment }: Props) {
  const [selectedTab, setSelectedTab] = useState<
    "weapon" | "armor" | "accessory"
  >("weapon");
  const [shopItems, setShopItems] = useState<ShopItem[]>(shopEquipments ?? []);
  const [userCoins, setUserCoins] = useState<number | null>(coin ?? 0);
  const [userEquipments, setUserEquipments] = useState<UserEquipments[]>(
    userEquipment ?? []
  );

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
