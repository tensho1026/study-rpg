"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Item {
  id: string
  name: string
  type: "weapon" | "armor" | "accessory"
  attack: number
  defense: number
  owned: boolean
  equipped: boolean
}

export default function EquipmentPage() {
  const [inventory, setInventory] = useState<Item[]>([
    { id: "1", name: "木の剣", type: "weapon", attack: 5, defense: 0, owned: true, equipped: true },
    { id: "2", name: "鉄の剣", type: "weapon", attack: 15, defense: 0, owned: true, equipped: false },
    { id: "3", name: "鋼の剣", type: "weapon", attack: 30, defense: 0, owned: true, equipped: false },
    { id: "4", name: "布の服", type: "armor", attack: 0, defense: 3, owned: true, equipped: true },
    { id: "5", name: "革の鎧", type: "armor", attack: 0, defense: 10, owned: true, equipped: false },
    { id: "6", name: "鉄の鎧", type: "armor", attack: 0, defense: 20, owned: false, equipped: false },
    { id: "7", name: "なし", type: "accessory", attack: 0, defense: 0, owned: true, equipped: true },
    { id: "8", name: "力の指輪", type: "accessory", attack: 8, defense: 0, owned: true, equipped: false },
    { id: "9", name: "知恵の眼鏡", type: "accessory", attack: 5, defense: 5, owned: false, equipped: false },
  ])

  const [selectedCategory, setSelectedCategory] = useState<"weapon" | "armor" | "accessory">("weapon")

  const handleEquip = (itemId: string) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, equipped: true }
        }
        if (item.type === selectedCategory && item.equipped) {
          return { ...item, equipped: false }
        }
        return item
      }),
    )
  }

  const equippedWeapon = inventory.find((item) => item.type === "weapon" && item.equipped)
  const equippedArmor = inventory.find((item) => item.type === "armor" && item.equipped)
  const equippedAccessory = inventory.find((item) => item.type === "accessory" && item.equipped)

  const totalAttack = (equippedWeapon?.attack || 0) + (equippedAccessory?.attack || 0)
  const totalDefense = (equippedArmor?.defense || 0) + (equippedAccessory?.defense || 0)

  const filteredItems = inventory.filter((item) => item.type === selectedCategory && item.owned)

  const getCategoryLabel = (type: string) => {
    switch (type) {
      case "weapon":
        return "武器"
      case "armor":
        return "防具"
      case "accessory":
        return "装飾品"
      default:
        return ""
    }
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-4xl text-foreground mb-2">装備管理</h1>
            <p className="text-xs md:text-sm text-muted-foreground">EQUIPMENT</p>
          </div>
          <Link href="/home">
            <Button className="rpg-button bg-secondary text-secondary-foreground hover:bg-secondary/90">戻る</Button>
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
                  <span className="text-card-foreground">⚔️ {equippedWeapon?.name}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 border border-border">
                  <span className="text-muted-foreground">防具</span>
                  <span className="text-card-foreground">🛡️ {equippedArmor?.name}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 border border-border">
                  <span className="text-muted-foreground">装飾品</span>
                  <span className="text-card-foreground">✨ {equippedAccessory?.name}</span>
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
                      style={{ width: `${Math.min((totalAttack / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-muted-foreground">防御力</span>
                    <span className="text-primary font-bold">{totalDefense}</span>
                  </div>
                  <div className="h-3 bg-muted border border-border overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${Math.min((totalDefense / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Inventory */}
          <div className="lg:col-span-2">
            <Card className="rpg-window bg-card p-4">
              <h2 className="text-sm md:text-base text-card-foreground border-b-2 border-border pb-2 mb-4">所持装備</h2>

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
                    {getCategoryLabel(selectedCategory)}を持っていません
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 border-2 transition-all ${
                        item.equipped
                          ? "bg-accent/20 border-accent"
                          : "bg-muted/30 border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm md:text-base text-card-foreground font-bold mb-1">
                            {item.name}
                            {item.equipped && (
                              <span className="ml-2 text-xs text-accent border border-accent px-2 py-0.5">装備中</span>
                            )}
                          </h3>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            {item.attack > 0 && <span>攻撃力 +{item.attack}</span>}
                            {item.defense > 0 && <span>防御力 +{item.defense}</span>}
                          </div>
                        </div>
                        <Button
                          onClick={() => handleEquip(item.id)}
                          disabled={item.equipped}
                          className="rpg-button bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-xs px-3 py-1"
                        >
                          {item.equipped ? "装備中" : "装備する"}
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
  )
}
