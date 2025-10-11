"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Equipment {
  weapon: string;
  armor: string;
  accessory: string;
}

const SHOP_ITEMS = [
  { name: "鉄の剣", type: "weapon", price: 100, emoji: "⚔️" },
  { name: "鋼の剣", type: "weapon", price: 500, emoji: "🗡️" },
  { name: "革の鎧", type: "armor", price: 150, emoji: "🛡️" },
  { name: "鉄の鎧", type: "armor", price: 600, emoji: "🛡️" },
  { name: "力の指輪", type: "accessory", price: 300, emoji: "💍" },
  { name: "知恵の眼鏡", type: "accessory", price: 400, emoji: "👓" },
];

export function EquipmentWindow() {
  const [showShop, setShowShop] = useState(false);

  return (
    <Card className="rpg-window bg-card p-4">
      <div className="space-y-3">
        <div className="border-b-2 border-border pb-2 flex justify-between items-center">
          <h2 className="text-xs md:text-sm text-card-foreground">装備</h2>
          <Button
            onClick={() => setShowShop(!showShop)}
            className="text-xs px-2 py-1 h-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {showShop ? "閉じる" : "ショップ"}
          </Button>
        </div>

        {!showShop ? (
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">武器</span>
              <span className="text-card-foreground">⚔️ aa</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">防具</span>
              <span className="text-card-foreground">🛡️ bb</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">装飾品</span>
              <span className="text-card-foreground">✨cc</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {SHOP_ITEMS.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center text-xs p-2 bg-muted/50 border border-border"
              >
                <div className="flex items-center gap-2">
                  <span>{item.emoji}</span>
                  <span className="text-card-foreground">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent">{item.price}G</span>
                  <Button className="text-xs px-2 py-1 h-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50">
                    購入
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
