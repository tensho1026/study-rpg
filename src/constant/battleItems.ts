import { BattleItem } from "@/types/battleItem";

export const battleItems: BattleItem[] = [
  {
    id: "1",
    name: "ポーション",
    description: "HPを50回復",
    type: "heal",
    healHp: 50,
    price: 50,
    rarity: 1,
  },
  {
    id: "2",
    name: "ハイポーション",
    description: "HPを200回復",
    type: "heal",
    healHp: 200,
    price: 150,
    rarity: 2,
  },
];
