export const MAPS = [
  {
    id: "grassland",
    name: "陽だまり草原",
    tagline: "風と陽光に包まれて、冒険の肩慣らしに最適なルート。",
    atmosphere:
      "広がる草原と澄んだ青空。小川や小花が点在し、遠くに古代遺跡が見える。",
    difficulty: "やさしい",
    recommendedLevel: "Lv.12 〜 18",
    monsters: ["スライム", "草原ゴブリン", "サンビートル", "フィールドウルフ"],
    gearTip: "行動しやすい軽装と、遠距離攻撃用の弓や魔導書があると安心。",
    travelTime: "北西の関所を抜けて 35 分",
    image: "/maps/grassland.png",
  },
  {
    id: "cave",
    name: "碧晶の洞窟",
    tagline: "きらめく鉱石が導く、静寂と探求の旅へ。",
    atmosphere:
      "しっとりとした空気と滴る水音が響く洞窟。壁面に散らばる晶石が薄明かりを放つ。",
    difficulty: "普通",
    recommendedLevel: "Lv.8 〜 14",
    monsters: ["クリスタルスライム", "ナイトバット", "洞窟トカゲ", "マグマエレメント"],
    gearTip: "たいまつと魔法灯を忘れずに。滑り止め付きの靴がおすすめ。",
    travelTime: "拠点から南東へ 20 分",
    image: "/maps/cave.png",
  },
  {
    id: "dungeon",
    name: "星影ダンジョン",
    tagline: "複雑に入り組んだ古代遺構。挑戦者を選ぶ試練の間。",
    atmosphere:
      "ほの暗い通路に魔法陣が点在する地下迷宮。天井からは星屑のような光が降り注ぐ。",
    difficulty: "難しい",
    recommendedLevel: "Lv.20 〜",
    monsters: ["アークスペクター", "ルーンナイト", "次元の番犬", "ドラゴンロード"],
    gearTip:
      "聖属性の攻撃と状態異常耐性が鍵。回復アイテムをしっかり準備しよう。",
    travelTime: "転移門を利用して 15 分",
    image: "/maps/dungeon.png",
  },
] as const;
