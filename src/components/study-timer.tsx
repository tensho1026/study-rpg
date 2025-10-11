"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StudyTimerProps {
  onStudyComplete: (minutes: number) => void
  todayTotalMinutes: number
}

export function StudyTimer({ onStudyComplete, todayTotalMinutes }: StudyTimerProps) {
  const [inputHours, setInputHours] = useState("")
  const [inputMinutes, setInputMinutes] = useState("")

  const handleSubmit = () => {
    if (manualTotalMinutes <= 0) {
      return
    }

    onStudyComplete(manualTotalMinutes)
    setInputHours("")
    setInputMinutes("")
  }

  const handleHoursChange = (value: string) => {
    if (value === "") {
      setInputHours("")
      return
    }

    const numeric = Number.parseInt(value)
    if (Number.isNaN(numeric) || numeric < 0) {
      return
    }

    setInputHours(Math.min(23, numeric).toString())
  }

  const handleMinutesChange = (value: string) => {
    if (value === "") {
      setInputMinutes("")
      return
    }

    const numeric = Number.parseInt(value)
    if (Number.isNaN(numeric) || numeric < 0) {
      return
    }

    setInputMinutes(Math.min(59, numeric).toString())
  }

  const adjustHours = (delta: number) => {
    const current = Number.parseInt(inputHours || "0")
    const safeValue = Number.isNaN(current) || current < 0 ? 0 : current
    const next = Math.min(23, Math.max(0, safeValue + delta))
    setInputHours(next.toString())
  }

  const adjustMinutes = (delta: number) => {
    const current = Number.parseInt(inputMinutes || "0")
    const safeValue = Number.isNaN(current) || current < 0 ? 0 : current
    const next = Math.min(59, Math.max(0, safeValue + delta))
    setInputMinutes(next.toString())
  }

  const manualTotalMinutes = (() => {
    const hoursValue = Number.parseInt(inputHours || "0")
    const minutesValue = Number.parseInt(inputMinutes || "0")
    const safeHours = Number.isNaN(hoursValue) || hoursValue < 0 ? 0 : hoursValue
    const safeMinutes = Number.isNaN(minutesValue) || minutesValue < 0 ? 0 : minutesValue
    return safeHours * 60 + safeMinutes
  })()
  const canSubmit = manualTotalMinutes > 0
  const todayHours = Math.floor(todayTotalMinutes / 60)
  const todayMinutes = todayTotalMinutes % 60

  return (
    <Card className="rpg-window bg-card p-6">
      <div className="space-y-4">
        <div className="border-b-2 border-border pb-2">
          <h2 className="text-sm md:text-base text-card-foreground">今日の勉強時間を記録</h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-md border-2 border-border bg-muted/50 p-4 text-center">
            <p className="text-xs md:text-sm text-muted-foreground">今日の累計勉強時間</p>
            <div className="mt-3 flex justify-center gap-6">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-secondary-foreground text-white">
                  {todayHours.toString().padStart(2, "0")}
                </p>
                <p className="text-xs text-muted-foreground">時間</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-secondary-foreground text-white">
                  {todayMinutes.toString().padStart(2, "0")}
                </p>
                <p className="text-xs text-muted-foreground">分</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-white">合計 {todayTotalMinutes} 分</p>
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <div className="relative w-24 md:w-28">
                <Input
                  type="number"
                  min="0"
                  max="23"
                  value={inputHours}
                  onChange={(e) => handleHoursChange(e.target.value)}
                  placeholder="0"
                  className="pr-12 text-center text-2xl md:text-4xl font-bold bg-background border-2 border-border text-card-foreground appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <div className="absolute inset-y-1 right-1 flex flex-col overflow-hidden border border-border bg-muted/70">
                  <button
                    type="button"
                    onClick={() => adjustHours(1)}
                    className="flex-1 px-2 text-xs text-card-foreground hover:bg-muted"
                    aria-label="時間を増やす"
                  >
                    ▲
                  </button>
                  <div className="h-px bg-border" />
                  <button
                    type="button"
                    onClick={() => adjustHours(-1)}
                    className="flex-1 px-2 text-xs text-card-foreground hover:bg-muted"
                    aria-label="時間を減らす"
                  >
                    ▼
                  </button>
                </div>
              </div>
              <span className="text-xl md:text-2xl text-card-foreground">時間</span>
              <div className="relative w-24 md:w-28">
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={inputMinutes}
                  onChange={(e) => handleMinutesChange(e.target.value)}
                  placeholder="0"
                  className="pr-12 text-center text-2xl md:text-4xl font-bold bg-background border-2 border-border text-card-foreground appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <div className="absolute inset-y-1 right-1 flex flex-col overflow-hidden border border-border bg-muted/70">
                  <button
                    type="button"
                    onClick={() => adjustMinutes(1)}
                    className="flex-1 px-2 text-xs text-card-foreground hover:bg-muted"
                    aria-label="分を増やす"
                  >
                    ▲
                  </button>
                  <div className="h-px bg-border" />
                  <button
                    type="button"
                    onClick={() => adjustMinutes(-1)}
                    className="flex-1 px-2 text-xs text-card-foreground hover:bg-muted"
                    aria-label="分を減らす"
                  >
                    ▼
                  </button>
                </div>
              </div>
              <span className="text-xl md:text-2xl text-card-foreground">分</span>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
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
