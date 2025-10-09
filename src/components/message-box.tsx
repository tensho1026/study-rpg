import { Card } from "@/components/ui/card"

interface MessageBoxProps {
  message: string
}

export function MessageBox({ message }: MessageBoxProps) {
  return (
    <Card className="rpg-window bg-card p-4">
      <div className="flex items-start gap-2">
        <span className="text-accent blink">▶</span>
        <p className="text-xs md:text-sm text-card-foreground leading-relaxed">{message}</p>
      </div>
    </Card>
  )
}
