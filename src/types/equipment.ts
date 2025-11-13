export type Equipment = {
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
  } | null

};
