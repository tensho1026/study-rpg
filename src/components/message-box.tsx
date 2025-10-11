import { Card } from "@/components/ui/card"



export function MessageBox() {
  return (
    <Card className="rpg-window bg-card p-4">
      <div className="flex items-start gap-2">
        <span className="text-accent blink">▶</span>
        <p className="text-xs md:text-sm text-card-foreground leading-relaxed">レベルが上がった！</p>
      </div>
    </Card>
  )
}
