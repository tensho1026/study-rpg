"use client";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { getItemIcon, getTabLabel } from "@/utils/getIcon-Label";

type Props = {
  selectedTab: "weapon" | "armor" | "accessory";
  setSelectedTab: React.Dispatch<
    React.SetStateAction<"weapon" | "armor" | "accessory">
  >;
};

function SelectTab({ selectedTab, setSelectedTab }: Props) {
  return (
    <Card className="rpg-window bg-card p-4">
      <div className="flex gap-2">
        {(["weapon", "armor", "accessory"] as const).map((tab) => (
          <Button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`flex-1 text-xs md:text-sm ${
              selectedTab === tab
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {getItemIcon(tab)} {getTabLabel(tab)}
          </Button>
        ))}
      </div>
    </Card>
  );
}

export default SelectTab;
