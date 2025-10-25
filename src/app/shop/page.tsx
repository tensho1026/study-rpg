"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import getEquipmentData from "../actions/shop/getShopData";
import { ShopItem } from "@/types/shopItems";
import purchaseEquipment from "../actions/shop/purchaseEquipment";
import { useSession } from "next-auth/react";
import Header from "@/components/shop/Header";
import Return from "@/components/shop/Return";
import SelectTab from "@/components/shop/SelectTab";
import { getItemIcon } from "@/utils/getIcon-Label";

type UserEquipments = {
  equipmentId: string;
  isDraft: boolean;
};

export default function ShopPage() {
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

  const filteredItems = shopItems.filter((item) => item.type === selectedTab);

  const handlePurchase = async (equipmentsId: string) => {
    await purchaseEquipment(equipmentsId);
    const updated = await getEquipmentData();
    setUserCoins(updated?.userCoins ?? 0);
    setUserEquipments(updated?.userEquipments ?? []);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ヘッダー */}
        <Header userCoins={userCoins ?? 0} />

        <SelectTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* アイテムリスト */}
        <div className="grid gap-4">
          {filteredItems.map((item) => {
            const alreadyOwned = userEquipments.some(
              (eq) => eq.equipmentId === item.id
            );
            return (
              <Card key={item.id} className="rpg-window bg-card p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getItemIcon(item.type)}</span>
                      <h3 className="text-sm md:text-base text-card-foreground font-bold">
                        {item.name}
                      </h3>

                      {alreadyOwned ? (
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                          所持中
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    <div className="flex gap-4 text-xs">
                      {item.attack && (
                        <span className="text-destructive">
                          攻撃力 +{item.attack}
                        </span>
                      )}
                      {item.defense && (
                        <span className="text-primary">
                          防御力 +{item.defense}
                        </span>
                      )}
                      {item.effect && (
                        <span className="text-accent">{item.effect}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg md:text-xl text-accent font-bold">
                        {item.price} G
                      </p>
                    </div>

                    <Button
                      className={`text-xs md:text-sm px-4 md:px-6 
              ${
                alreadyOwned
                  ? "bg-muted text-muted-foreground shadow-inner cursor-not-allowed"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              }
            `}
                      onClick={() => handlePurchase(item.id)}
                      disabled={alreadyOwned}
                    >
                      {alreadyOwned ? "購入済" : "購入する"}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* 戻るボタン */}
        <Return />
      </div>
    </div>
  );
}
