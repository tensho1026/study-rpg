export type Equipment = {
  equipmentId?: string | null
  craftEquipmentId?: string | null
  isDraft: boolean;
  mstEquipment: {
    id: string;
    attack?: number | null;
    defense?: number | null;
    description: string;
    name: string;
    type: "weapon" | "armor" | "accessory";
    price: number;
  } | null;
  mstCraftEquipments: {
    id: string;
    attack?: number | null;
    defense?: number | null;
    description: string;
    name: string;
    type: "weapon" | "armor" | "accessory";
    cost: number;
  } | null;
};
