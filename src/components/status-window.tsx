import { Card } from "@/components/ui/card"

interface StatusWindowProps {
  level: number
  exp: number
  expToNextLevel: number
  coins: number
  totalStudyTime: number
}

export function StatusWindow() {


  return (
    <Card className="rpg-window bg-card p-4">
      <div className="space-y-3">
        <div className="border-b-2 border-border pb-2">
          <h2 className="text-xs md:text-sm text-card-foreground">ステータス</h2>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">レベル</span>
            <span className="text-card-foreground font-bold">1</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">EXP</span>
              <span className="text-card-foreground">
                1
              </span>
            </div>
            <div className="h-3 bg-input border-2 border-border">
              <div className="h-full bg-secondary transition-all duration-300" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">所持金</span>
            <span className="text-accent font-bold">1 G</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">総勉強時間</span>
            <span className="text-card-foreground">1 分</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
