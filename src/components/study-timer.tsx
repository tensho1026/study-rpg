"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StudyTimerProps {
  onStudyComplete: (minutes: number) => void
}

export function StudyTimer({ onStudyComplete }: StudyTimerProps) {
  const [studyMinutes, setStudyMinutes] = useState("")
  const [selectedMinutes, setSelectedMinutes] = useState(25)

  const handleSubmit = () => {
    const minutes = studyMinutes ? Number.parseInt(studyMinutes) : selectedMinutes
    if (minutes > 0) {
      onStudyComplete(minutes)
      setStudyMinutes("")
    }
  }

  const handleQuickSelect = (mins: number) => {
    setSelectedMinutes(mins)
    setStudyMinutes(mins.toString())
  }

  return (
    <Card className="rpg-window bg-card p-6">
      <div className="space-y-4">
        <div className="border-b-2 border-border pb-2">
          <h2 className="text-sm md:text-base text-card-foreground">今日の勉強時間を記録</h2>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap justify-center">
            {[15, 25, 45, 60].map((mins) => (
              <Button
                key={mins}
                onClick={() => handleQuickSelect(mins)}
                className={`text-xs px-3 py-2 ${
                  selectedMinutes === mins ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {mins}分
              </Button>
            ))}
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Input
                type="number"
                min="1"
                max="999"
                value={studyMinutes}
                onChange={(e) => setStudyMinutes(e.target.value)}
                placeholder="時間を入力"
                className="w-32 text-center text-2xl md:text-4xl font-bold bg-background border-2 border-border text-card-foreground"
              />
              <span className="text-xl md:text-2xl text-card-foreground">分</span>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!studyMinutes && !selectedMinutes}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm md:text-base py-4 disabled:opacity-50"
            >
              ✓ 記録する
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
