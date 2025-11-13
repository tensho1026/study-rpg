import { getTabLabel } from "@/utils/getIcon-Label";
import { Button } from "../ui/button";
import equipItem from "@/app/actions/equipment/equipItem";
import { EquipmentType } from "@prisma/client";
import { Equipment } from "@/types/equipment";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setEquipments: Dispatch<SetStateAction<Equipment[]>>;
  filteredItems: Equipment[];
  selectedCategory: EquipmentType;
};

export default function OwnedEquipmentsList({
  setEquipments,
  filteredItems,
  selectedCategory,
}: Props) {
  const handleEquipItem = async (equipmentId: string, type: EquipmentType) => {
    const result = await equipItem(equipmentId, type);
    if (!result) return;

    setEquipments((prev) =>
      prev.map((item) => {
        if (item.equipmentId === result.equippedId) {
          // 今回新しく装備したもの
          return { ...item, isDraft: true };
        }
        if (item.equipmentId === result.unequippedId?.equipmentId) {
          // 今まで装備していたもの
          return { ...item, isDraft: false };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {filteredItems.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          {getTabLabel(selectedCategory)}を持っていません
        </div>
      ) : (
        filteredItems.map((item) => {
          if (!item.mstEquipment) return null;

          return (
            <div
              key={item.mstEquipment.id}
              className={`p-3 border-2 transition-all ${
                item.isDraft
                  ? "bg-accent/20 border-accent"
                  : "bg-muted/30 border-border hover:border-accent/50"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-sm md:text-base text-card-foreground font-bold mb-1">
                    {item.mstEquipment.name}
                    {item.isDraft && (
                      <span className="ml-2 text-xs text-accent border border-accent px-2 py-0.5">
                        装備中
                      </span>
                    )}
                  </h3>

                  <div className="flex gap-4 text-xs text-muted-foreground">
                    {(item.mstEquipment.attack ?? 0) > 0 && (
                      <span>攻撃力 +{item.mstEquipment.attack}</span>
                    )}
                    {(item.mstEquipment.defense ?? 0) > 0 && (
                      <span>防御力 +{item.mstEquipment.defense}</span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() =>
                    handleEquipItem(item.equipmentId, item.mstEquipment!.type)
                  }
                  disabled={item.isDraft}
                  className="rpg-button bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-xs px-3 py-1"
                >
                  {item.isDraft ? "装備中" : "装備する"}
                </Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
