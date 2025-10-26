import { Prisma } from "@prisma/client";

export type BattleStatusType = Prisma.BattleStatusGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        equipments: {
          where: {
            isDraft: true;
          };
          include: {
            mstEquipment: true;
          };
        };
      };
    };
  };
}>;
