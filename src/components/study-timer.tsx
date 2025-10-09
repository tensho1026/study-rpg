"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StudyTimerProps {
  onStudyComplete: (minutes: number) => void
}

export function StudyTimer({ onStudyComplete }: StudyTimerProps) {
  const [inputHours, setInputHours] = useState("")
  const [inputMinutes, setInputMinutes] = useState("")
  const [selectedPreset, setSelectedPreset] = useState<number | null>(25)

  const handleSubmit = () => {
    const manualTotal = manualTotalMinutes
    const minutes = manualTotal > 0 ? manualTotal : selectedPreset ?? 0

    if (minutes > 0) {
      onStudyComplete(minutes)
      if (manualTotal > 0) {
        setInputHours("")
        setInputMinutes("")
        setSelectedPreset(null)
      }
    }
  }

  const handleQuickSelect = (mins: number) => {
    setSelectedPreset(mins)
    const hours = Math.floor(mins / 60)
    const minutes = mins % 60
    setInputHours(hours > 0 ? hours.toString() : "")
    setInputMinutes(minutes.toString())
  }

  const handleHoursChange = (value: string) => {
    if (value === "") {
      setInputHours("")
      setSelectedPreset(null)
      return
    }

    const numeric = Number.parseInt(value)
    if (Number.isNaN(numeric) || numeric < 0) {
      return
    }

    setInputHours(Math.min(23, numeric).toString())
    setSelectedPreset(null)
  }

  const handleMinutesChange = (value: string) => {
    if (value === "") {
      setInputMinutes("")
      setSelectedPreset(null)
      return
    }

    const numeric = Number.parseInt(value)
    if (Number.isNaN(numeric) || numeric < 0) {
      return
    }

    setInputMinutes(Math.min(59, numeric).toString())
    setSelectedPreset(null)
  }

  const adjustHours = (delta: number) => {
    const current = Number.parseInt(inputHours || "0")
    const safeValue = Number.isNaN(current) || current < 0 ? 0 : current
    const next = Math.min(23, Math.max(0, safeValue + delta))
    setInputHours(next.toString())
    setSelectedPreset(null)
  }

  const adjustMinutes = (delta: number) => {
    const current = Number.parseInt(inputMinutes || "0")
    const safeValue = Number.isNaN(current) || current < 0 ? 0 : current
    const next = Math.min(59, Math.max(0, safeValue + delta))
    setInputMinutes(next.toString())
    setSelectedPreset(null)
  }

  const manualTotalMinutes = (() => {
    const hoursValue = Number.parseInt(inputHours || "0")
    const minutesValue = Number.parseInt(inputMinutes || "0")
    const safeHours = Number.isNaN(hoursValue) || hoursValue < 0 ? 0 : hoursValue
    const safeMinutes = Number.isNaN(minutesValue) || minutesValue < 0 ? 0 : minutesValue
    return safeHours * 60 + safeMinutes
  })()
  const canSubmit = manualTotalMinutes > 0 || selectedPreset !== null

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
                  selectedPreset === mins ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {mins}分
              </Button>
            ))}
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
