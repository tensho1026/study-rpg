"use client";

import { Dispatch, SetStateAction } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getItemIcon } from "@/utils/getIcon-Label";
import purchaseEquipment from "@/app/actions/shop/purchaseEquipment";
import getEquipmentData from "@/app/actions/shop/getShopData";
import { ShopItem } from "@/types/shopItems";

type UserEquipment = {
  equipmentId: string;
  isDraft: boolean;
};

type ItemListsProps = {
  shopItems: ShopItem[];
  selectedTab: "weapon" | "armor" | "accessory";
  userEquipments: UserEquipment[];
  setUserEquipments: Dispatch<SetStateAction<UserEquipment[]>>;
  setUserCoins: Dispatch<SetStateAction<number | null>>;
};

function ItemLists({
  shopItems,
  selectedTab,
  userEquipments,
  setUserEquipments,
  setUserCoins,
}: ItemListsProps) {
  const filteredItems = shopItems.filter((item) => item.type === selectedTab);

  const handlePurchase = async (equipmentId: string) => {
    await purchaseEquipment(equipmentId);
    const updated = await getEquipmentData();
    setUserCoins(updated?.userCoins ?? 0);
    setUserEquipments(updated?.userEquipments ?? []);
  };

  return (
    <div className="grid gap-4">
      {filteredItems.map((item) => {
        const alreadyOwned = userEquipments.some(
          (equipment) => equipment.equipmentId === item.id
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
                    <span className="text-primary">防御力 +{item.defense}</span>
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
                  className={`text-xs md:text-sm px-4 md:px-6 ${
                    alreadyOwned
                      ? "bg-muted text-muted-foreground shadow-inner cursor-not-allowed"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  }`}
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
  );
}

export default ItemLists;
