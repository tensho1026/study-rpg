import { Prisma } from "@prisma/client";

export type MstCraftEquipmentsWithRecipes =
  Prisma.MstCraftEquipmentsGetPayload<{
    include: {
      recipes: {
        include: {
          monsterMaterial: true;
          normalMaterial: true;
        };
      };
    };
  }>;
