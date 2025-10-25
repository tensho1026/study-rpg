import { Card } from "../ui/card";
type Props = {
  equippedWeapon?: string;
  equippedArmor?: string;
  equippedAccessory?: string;
};
export default function CurrentEquipments({
  equippedWeapon,
  equippedArmor,
  equippedAccessory,
}: Props) {
  return (
    <Card className="rpg-window bg-card p-4">
      <h2 className="text-sm md:text-base text-card-foreground border-b-2 border-border pb-2 mb-3">
        現在の装備
      </h2>
      <div className="space-y-3 text-xs md:text-sm">
        <div className="flex justify-between items-center p-2 bg-muted/30 border border-border">
          <span className="text-muted-foreground">武器</span>
          <span className="text-card-foreground">⚔️ {equippedWeapon}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-muted/30 border border-border">
          <span className="text-muted-foreground">防具</span>
          <span className="text-card-foreground">🛡️ {equippedArmor}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-muted/30 border border-border">
          <span className="text-muted-foreground">装飾品</span>
          <span className="text-card-foreground">✨ {equippedAccessory}</span>
        </div>
      </div>
    </Card>
  );
}
