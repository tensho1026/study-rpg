"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ShopItem {
  id: string
  name: string
  type: "weapon" | "armor" | "accessory"
  price: number
  attack?: number
  defense?: number
  effect?: string
  description: string
}

const SHOP_ITEMS: ShopItem[] = [
  // 武器
  { id: "w1", name: "木の棒", type: "weapon", price: 50, attack: 5, description: "初心者向けの武器" },
  { id: "w2", name: "鉄の剣", type: "weapon", price: 200, attack: 15, description: "鉄製の頑丈な剣" },
  { id: "w3", name: "鋼の剣", type: "weapon", price: 800, attack: 30, description: "鋼で鍛えられた強力な剣" },
  { id: "w4", name: "炎の剣", type: "weapon", price: 2000, attack: 50, description: "炎の力を宿した伝説の剣" },
  {
    id: "w5",
    name: "聖剣エクスカリバー",
    type: "weapon",
    price: 5000,
    attack: 100,
    description: "選ばれし者のみが扱える聖剣",
  },

  // 防具
  { id: "a1", name: "布の服", type: "armor", price: 80, defense: 3, description: "普通の布でできた服" },
  { id: "a2", name: "革の鎧", type: "armor", price: 300, defense: 10, description: "革製の軽い鎧" },
  { id: "a3", name: "鉄の鎧", type: "armor", price: 1000, defense: 25, description: "鉄製の重厚な鎧" },
  {
    id: "a4",
    name: "ドラゴンメイル",
    type: "armor",
    price: 3000,
    defense: 60,
    description: "ドラゴンの鱗で作られた鎧",
  },
  { id: "a5", name: "神の鎧", type: "armor", price: 6000, defense: 120, description: "神々の加護を受けた究極の鎧" },

  // 装飾品
  {
    id: "ac1",
    name: "力の指輪",
    type: "accessory",
    price: 500,
    effect: "攻撃力+10",
    description: "力が湧いてくる指輪",
  },
  { id: "ac2", name: "守りの腕輪", type: "accessory", price: 500, effect: "防御力+10", description: "身を守る腕輪" },
  {
    id: "ac3",
    name: "知恵の眼鏡",
    type: "accessory",
    price: 800,
    effect: "経験値+20%",
    description: "学習効率が上がる眼鏡",
  },
  {
    id: "ac4",
    name: "幸運のお守り",
    type: "accessory",
    price: 1200,
    effect: "コイン+30%",
    description: "お金が貯まりやすくなるお守り",
  },
  {
    id: "ac5",
    name: "賢者の石",
    type: "accessory",
    price: 4000,
    effect: "全能力+50%",
    description: "全ての能力を高める伝説の石",
  },
]

export default function ShopPage() {
  const [selectedTab, setSelectedTab] = useState<"weapon" | "armor" | "accessory">("weapon")
  const [coins, setCoins] = useState(1000) // 仮のコイン数
  const [ownedItems, setOwnedItems] = useState<string[]>([])

  const filteredItems = SHOP_ITEMS.filter((item) => item.type === selectedTab)

  const handlePurchase = (item: ShopItem) => {
    if (coins >= item.price && !ownedItems.includes(item.id)) {
      setCoins(coins - item.price)
      setOwnedItems([...ownedItems, item.id])
    }
  }

  const getTabLabel = (type: "weapon" | "armor" | "accessory") => {
    switch (type) {
      case "weapon":
        return "武器"
      case "armor":
        return "防具"
      case "accessory":
        return "装飾品"
    }
  }

  const getItemIcon = (type: "weapon" | "armor" | "accessory") => {
    switch (type) {
      case "weapon":
        return "⚔️"
      case "armor":
        return "🛡️"
      case "accessory":
        return "💍"
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ヘッダー */}
        <Card className="rpg-window bg-card p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl md:text-2xl text-card-foreground mb-2">武器屋</h1>
              <p className="text-xs md:text-sm text-muted-foreground">いらっしゃい！良い装備が揃ってるよ</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">所持金</p>
              <p className="text-lg md:text-xl text-accent font-bold">{coins} G</p>
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
            const isOwned = ownedItems.includes(item.id)
            const canAfford = coins >= item.price

            return (
              <Card key={item.id} className="rpg-window bg-card p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getItemIcon(item.type)}</span>
                      <h3 className="text-sm md:text-base text-card-foreground font-bold">{item.name}</h3>
                      {isOwned && (
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">所持中</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                    <div className="flex gap-4 text-xs">
                      {item.attack && <span className="text-destructive">攻撃力 +{item.attack}</span>}
                      {item.defense && <span className="text-primary">防御力 +{item.defense}</span>}
                      {item.effect && <span className="text-accent">{item.effect}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg md:text-xl text-accent font-bold">{item.price} G</p>
                    </div>
                    <Button
                      onClick={() => handlePurchase(item)}
                      disabled={!canAfford || isOwned}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm px-4 md:px-6"
                    >
                      {isOwned ? "購入済み" : canAfford ? "購入する" : "お金が足りない"}
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* 戻るボタン */}
        <div className="flex justify-center">
          <Link href="/">
            <Button className="bg-muted text-muted-foreground hover:bg-muted/80 text-sm px-8">戻る</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
