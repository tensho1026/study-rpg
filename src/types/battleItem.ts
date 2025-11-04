export type BattleItem = {
  id: string;
  name: string;
  effect: string;
  type: "heal" | "attack" | "buff" | "material" | "key";
  heal?: { hp?: number; mp?: number }; // ← mpをオプションとして定義
  price: number;
  rarity: number;
};