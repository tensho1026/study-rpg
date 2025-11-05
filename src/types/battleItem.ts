export type BattleItem = {
  id: string;
  name: string;
  description: string;
  type: "heal" | "attack" | "buff" | "material" | "key";
  heal?: { hp?: number; mp?: number }; // ← mpをオプションとして定義
  price: number | null;
  rarity: number | null;
  quantity?: number;
};
