"use client"

import { useMemo, useState } from "react"
import Image from "next/image"

import { AppMenuButton } from "@/components/common/app-menu-button"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const MAPS = [
  {
    id: "cave",
    name: "碧晶の洞窟",
    tagline: "きらめく鉱石が導く、静寂と探求の旅へ。",
    atmosphere: "しっとりとした空気と滴る水音が響く洞窟。壁面に散らばる晶石が薄明かりを放つ。",
    difficulty: "やさしい",
    recommendedLevel: "Lv.8 〜 14",
    monsters: ["クリスタルスライム", "ナイトバット", "洞窟トカゲ"],
    gearTip: "たいまつと魔法灯を忘れずに。滑り止め付きの靴がおすすめ。",
    travelTime: "拠点から南東へ 20 分",
    image: "/maps/cave.png",
  },
  {
    id: "grassland",
    name: "陽だまり草原",
    tagline: "風と陽光に包まれて、冒険の肩慣らしに最適なルート。",
    atmosphere: "広がる草原と澄んだ青空。小川や小花が点在し、遠くに古代遺跡が見える。",
    difficulty: "ふつう",
    recommendedLevel: "Lv.12 〜 18",
    monsters: ["フィールドウルフ", "サンビートル", "草原ゴブリン"],
    gearTip: "行動しやすい軽装と、遠距離攻撃用の弓や魔導書があると安心。",
    travelTime: "北西の関所を抜けて 35 分",
    image: "/maps/grassland.png",
  },
  {
    id: "dungeon",
    name: "星影ダンジョン",
    tagline: "複雑に入り組んだ古代遺構。挑戦者を選ぶ試練の間。",
    atmosphere: "ほの暗い通路に魔法陣が点在する地下迷宮。天井からは星屑のような光が降り注ぐ。",
    difficulty: "ハード",
    recommendedLevel: "Lv.20 〜",
    monsters: ["アークスペクター", "ルーンナイト", "次元の番犬"],
    gearTip: "聖属性の攻撃と状態異常耐性が鍵。回復アイテムをしっかり準備しよう。",
    travelTime: "転移門を利用して 15 分",
    image: "/maps/dungeon.png",
  },
] as const

type MapId = (typeof MAPS)[number]["id"]

export default function AdventurePage() {
  const [selectedMapId, setSelectedMapId] = useState<MapId>("cave")

  const selectedMap = useMemo(
    () => MAPS.find((map) => map.id === selectedMapId) ?? MAPS[0],
    [selectedMapId]
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-4 md:p-8">
      <div className="mx-auto flex max-w-5xl flex-col space-y-6 md:space-y-8">
        <Card className="rpg-window border-primary/40 bg-white/80 p-5 shadow-lg shadow-sky-100/40 backdrop-blur md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3 md:items-center">
              <AppMenuButton
                className="mt-1 border-primary/30 bg-emerald-200/40 text-slate-700 hover:bg-emerald-200/70 hover:text-slate-900"
                triggerLabel="アプリメニューを開く"
              />
              <div>
                <span className="text-xs tracking-[0.4em] text-emerald-500 md:text-sm uppercase">Adventure</span>
                <h1 className="mt-1 text-2xl font-semibold text-slate-900 md:text-3xl">冒険マップの準備</h1>
                <p className="mt-2 text-xs text-slate-600 md:text-sm">
                  行き先を選択して、現地の雰囲気や出現モンスターを確認しよう。
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-primary/30 bg-white/70 px-4 py-3 text-right text-xs text-slate-600 md:text-sm">
              <p className="font-medium text-slate-500">現在パーティ</p>
              <p className="text-xl font-semibold text-slate-900 md:text-2xl">平均 Lv. 17</p>
              <p className="text-[11px] text-slate-500 md:text-xs">推奨レンジと装備を確認してから出発しよう。</p>
            </div>
          </div>
        </Card>

        <Card className="rpg-window border-primary/30 bg-white/85 p-5 shadow-md shadow-emerald-100/40 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-slate-900 md:text-base">行き先を選択</h2>
              <p className="text-xs text-slate-600 md:text-sm">気になるマップをクリックすると詳細が表示されます。</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {MAPS.map((map) => {
                const isActive = map.id === selectedMapId
                return (
                  <Button
                    key={map.id}
                    type="button"
                    variant={isActive ? "default" : "outline"}
                    className={
                      isActive
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-300/60 hover:bg-emerald-500/90"
                        : "border-emerald-500/40 text-slate-700 hover:bg-emerald-100/60"
                    }
                    onClick={() => setSelectedMapId(map.id)}
                  >
                    {map.name}
                  </Button>
                )
              })}
            </div>
          </div>
        </Card>

        <Card className="rpg-window overflow-hidden border-primary/40 bg-white/90 shadow-xl shadow-sky-100/50 md:p-0">
          <div className="grid gap-6 p-5 md:grid-cols-[1.1fr_1fr] md:p-6">
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-emerald-100 via-white to-sky-100">
              <Image
                src={selectedMap.image}
                alt={`${selectedMap.name} の風景`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 480px, (min-width: 768px) 60vw, 90vw"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-4 text-white">
                <p className="text-xs uppercase tracking-[0.4em] text-emerald-100/90">Current Map</p>
                <p className="text-lg font-semibold md:text-xl">{selectedMap.name}</p>
                <p className="text-xs text-emerald-100/90 md:text-sm">{selectedMap.tagline}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-emerald-50/70 p-4 text-slate-800 md:p-6">
              <div className="space-y-3">
                <p className="text-sm text-slate-600 md:text-base">{selectedMap.atmosphere}</p>
                <div className="grid grid-cols-1 gap-3 text-sm text-slate-700 md:grid-cols-2">
                  <div className="space-y-1 rounded-lg border border-emerald-200 bg-white/80 p-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-500 md:text-xs">
                      Difficulty
                    </p>
                    <p className="text-base font-semibold text-slate-900">{selectedMap.difficulty}</p>
                  </div>
                  <div className="space-y-1 rounded-lg border border-emerald-200 bg-white/80 p-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-500 md:text-xs">
                      Recommended Lv.
                    </p>
                    <p className="text-base font-semibold text-slate-900">{selectedMap.recommendedLevel}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-white/80 p-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-500 md:text-xs">
                  出現モンスター
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700 md:text-base">
                  {selectedMap.monsters.map((monster) => (
                    <li key={monster}>・{monster}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 rounded-lg border border-emerald-200 bg-white/80 p-3 text-sm text-slate-700 md:text-base">
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-500 md:text-xs">旅のヒント</p>
                <p>{selectedMap.gearTip}</p>
                <p className="text-xs text-slate-500 md:text-sm">アクセス: {selectedMap.travelTime}</p>
              </div>

              <div className="flex flex-col gap-2 border-t border-emerald-200 pt-3 md:flex-row md:items-center md:justify-between">
                <p className="text-xs text-slate-500 md:text-sm">準備ができたら冒険へ！物資チェックも忘れずに。</p>
                <Button className="bg-emerald-500 px-6 text-sm text-white shadow-md shadow-emerald-300/60 hover:bg-emerald-500/90">
                  {selectedMap.name} へ出発する
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
