export type BattleItem = {
  id: string;
  name: string;
  description: string;
  type: "heal" | "attack" | "buff" | "material" | "key";
  healHp?: number | null;
  healMp?: number | null;
  price: number | null;
  rarity: number | null;
  quantity?: number;
};
