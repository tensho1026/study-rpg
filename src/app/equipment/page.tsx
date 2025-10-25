"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getEquipmentData from "../actions/equipment/getEquipmentData";
import { getTabLabel } from "@/utils/getIcon-Label";

type Equipment = {
  equipmentId: string;
  isDraft: boolean;
  mstEquipment: {
    id: string;
    attack?: number | null;
    defense?: number | null;
    description: string;
    name: string;
    type: "weapon" | "armor" | "accessory";
    price: number;
  };
};

export default function EquipmentPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  useEffect(() => {
    const fetchUserEquipments = async () => {
      const data = await getEquipmentData();
      console.log(data, "装備情報");
      setEquipments(data ?? []);
    };
    fetchUserEquipments();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<
    "weapon" | "armor" | "accessory"
  >("weapon");

  const handleEquip = (itemId: string) => {
    setEquipments((prev) =>
      prev.map((item) => {
        if (item.mstEquipment.id === itemId) {
          return { ...item, isDraft: true };
        }
        if (item.mstEquipment.type === selectedCategory && item.isDraft) {
          return { ...item, isDraft: false };
        }
        return item;
      })
    );
  };

  const equippedWeapon = equipments.find(
    (item) => item.mstEquipment.type === "weapon" && item.isDraft
  );
  const equippedArmor = equipments.find(
    (item) => item.mstEquipment.type === "armor" && item.isDraft
  );
  const equippedAccessory = equipments.find(
    (item) => item.mstEquipment.type === "accessory" && item.isDraft
  );

  const totalAttack =
    (equippedWeapon?.mstEquipment.attack || 0) +
    (equippedAccessory?.mstEquipment.attack || 0);
  const totalDefense =
    (equippedArmor?.mstEquipment.defense || 0) +
    (equippedAccessory?.mstEquipment.defense || 0);

  const filteredItems = equipments.filter(
    (item) => item.mstEquipment.type === selectedCategory
  );



  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-4xl text-foreground mb-2">
              装備管理
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              EQUIPMENT
            </p>
          </div>
          <Link href="/home">
            <Button className="rpg-button bg-secondary text-secondary-foreground hover:bg-secondary/90">
              戻る
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Current Equipment & Stats */}
          <div className="space-y-4">
            {/* Current Equipment */}
            <Card className="rpg-window bg-card p-4">
              <h2 className="text-sm md:text-base text-card-foreground border-b-2 border-border pb-2 mb-3">
                現在の装備
              </h2>
              <div className="space-y-3 text-xs md:text-sm">
                <div className="flex justify-between items-center p-2 bg-muted/30 border border-border">
                  <span className="text-muted-foreground">武器</span>
                  <span className="text-card-foreground">
                    ⚔️ {equippedWeapon?.mstEquipment.name}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 border border-border">
                  <span className="text-muted-foreground">防具</span>
                  <span className="text-card-foreground">
                    🛡️ {equippedArmor?.mstEquipment.name}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 border border-border">
                  <span className="text-muted-foreground">装飾品</span>
                  <span className="text-card-foreground">
                    ✨ {equippedAccessory?.mstEquipment.name}
                  </span>
                </div>
              </div>
            </Card>

            {/* Combat Stats */}
            <Card className="rpg-window bg-card p-4">
              <h2 className="text-sm md:text-base text-card-foreground border-b-2 border-border pb-2 mb-3">
                戦闘ステータス
              </h2>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-muted-foreground">攻撃力</span>
                    <span className="text-accent font-bold">{totalAttack}</span>
                  </div>
                  <div className="h-3 bg-muted border border-border overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{
                        width: `${Math.min((totalAttack / 50) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-muted-foreground">防御力</span>
                    <span className="text-primary font-bold">
                      {totalDefense}
                    </span>
                  </div>
                  <div className="h-3 bg-muted border border-border overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{
                        width: `${Math.min((totalDefense / 50) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Inventory */}
          <div className="lg:col-span-2">
            <Card className="rpg-window bg-card p-4">
              <h2 className="text-sm md:text-base text-card-foreground border-b-2 border-border pb-2 mb-4">
                所持装備
              </h2>

              {/* Category Tabs */}
              <div className="flex gap-2 mb-4">
                <Button
                  onClick={() => setSelectedCategory("weapon")}
                  className={`rpg-button flex-1 ${
                    selectedCategory === "weapon"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  ⚔️ 武器
                </Button>
                <Button
                  onClick={() => setSelectedCategory("armor")}
                  className={`rpg-button flex-1 ${
                    selectedCategory === "armor"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  🛡️ 防具
                </Button>
                <Button
                  onClick={() => setSelectedCategory("accessory")}
                  className={`rpg-button flex-1 ${
                    selectedCategory === "accessory"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  ✨ 装飾品
                </Button>
              </div>

              {/* Item List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    {getTabLabel(selectedCategory)}を持っていません
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.mstEquipment.id}
                      className={`p-3 border-2 transition-all ${
                        item.isDraft
                          ? "bg-accent/20 border-accent"
                          : "bg-muted/30 border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm md:text-base text-card-foreground font-bold mb-1">
                            {item.mstEquipment.name}
                            {item.isDraft && (
                              <span className="ml-2 text-xs text-accent border border-accent px-2 py-0.5">
                                装備中
                              </span>
                            )}
                          </h3>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            {(item.mstEquipment?.attack ?? 0) > 0 && (
                              <span>攻撃力 +{item.mstEquipment.attack}</span>
                            )}
                            {(item.mstEquipment.defense ?? 0) > 0 && (
                              <span>防御力 +{item.mstEquipment.defense}</span>
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={() => handleEquip(item.mstEquipment.id)}
                          disabled={item.isDraft}
                          className="rpg-button bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-xs px-3 py-1"
                        >
                          {item.isDraft ? "装備中" : "装備する"}
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
