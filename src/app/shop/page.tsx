"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getEquipmentData from "../actions/shop/getShopData";
import { ShopItem } from "@/types/shopItems";

export default function ShopPage() {
  const [selectedTab, setSelectedTab] = useState<
    "weapon" | "armor" | "accessory"
  >("weapon");
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [userCoins, setUserCoins] = useState<number | null>(0);
  useEffect(() => {
    const fetchItems = async () => {
      const data = await getEquipmentData();
      console.log(data, "取得データ");

      setShopItems(data?.equipments ?? []);
      setUserCoins(data?.userCoins ?? 0);
    };
    fetchItems();
  }, []);

  const filteredItems = shopItems.filter((item) => item.type === selectedTab);

  const getTabLabel = (type: "weapon" | "armor" | "accessory") => {
    switch (type) {
      case "weapon":
        return "武器";
      case "armor":
        return "防具";
      case "accessory":
        return "装飾品";
    }
  };

  const getItemIcon = (type: "weapon" | "armor" | "accessory") => {
    switch (type) {
      case "weapon":
        return "⚔️";
      case "armor":
        return "🛡️";
      case "accessory":
        return "💍";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ヘッダー */}
        <Card className="rpg-window bg-card p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl md:text-2xl text-card-foreground mb-2">
                武器屋
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                いらっしゃい！良い装備が揃ってるよ
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">所持金</p>
              <p className="text-lg md:text-xl text-accent font-bold">
                {userCoins} G
              </p>
            </div>
          </div>
        </Card>

        {/* タブ */}
        <Card className="rpg-window bg-card p-4">
          <div className="flex gap-2">
            {(["weapon", "armor", "accessory"] as const).map((tab) => (
              <Button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex-1 text-xs md:text-sm ${
                  selectedTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {getItemIcon(tab)} {getTabLabel(tab)}
              </Button>
            ))}
          </div>
        </Card>

        {/* アイテムリスト */}
        <div className="grid gap-4">
          {filteredItems.map((item) => {
            return (
              <Card key={item.id} className="rpg-window bg-card p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getItemIcon(item.type)}</span>
                      <h3 className="text-sm md:text-base text-card-foreground font-bold">
                        {item.name}
                      </h3>

                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        所持中
                      </span>
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
                    <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm px-4 md:px-6">
                      購入する
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* 戻るボタン */}
        <div className="flex justify-center">
          <Link href="/">
            <Button className="bg-muted text-muted-foreground hover:bg-muted/80 text-sm px-8">
              戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
