import { EquipmentType } from "@prisma/client";

export type BattleStatusType = {
  id: string;
  userId: string;
  maxHp: number;
  hp: number;
  attack: number;
  defense: number;
  level: number;
  exp: number;
  user: {
    equipments: {
      id: string;
      equipmentId: string;
      isDraft: boolean;
      createdAt: string; 
      updatedAt: string;
      mstEquipment: {
        id: string;
        name: string;
        type: EquipmentType;
        attack: number | null;
        defense: number | null;
        price: number;
        description: string;
      };
    }[];
  };
};
