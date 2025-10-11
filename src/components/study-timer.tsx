"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveStudy } from "@/app/actions/study-record";

export function StudyTimer() {
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currrentHours, setCurrentHours] = useState(0);

  const handleTotal = () => {
    const totalTime = currrentHours * 60 + currentMinutes;
    console.log(totalTime);
    saveStudy(totalTime);
    setCurrentHours(0);
    setCurrentMinutes(0);
  };
  return (
    <Card className="rpg-window bg-card p-6">
      <div className="space-y-4">
        <div className="border-b-2 border-border pb-2">
          <h2 className="text-sm md:text-base text-card-foreground">
            今日の勉強時間を記録
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-md border-2 border-border bg-muted/50 p-4 text-center">
            <p className="text-xs md:text-sm text-muted-foreground">
              今日の累計勉強時間
            </p>
            <div className="mt-3 flex justify-center gap-6">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-secondary-foreground text-white">
                  0
                </p>
                <p className="text-xs text-muted-foreground">時間</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-secondary-foreground text-white">
                  0
                </p>
                <p className="text-xs text-muted-foreground">分</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-white">
              合計0 分
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <div className="relative w-24 md:w-28">
                <Input
                  type="number"
                  min="0"
                  max="23"
                  placeholder="0"
                  className="pr-12 text-center text-2xl md:text-4xl font-bold bg-background border-2 border-border text-card-foreground appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  value={currrentHours}
                  readOnly
                />
                <div className="absolute inset-y-1 right-1 flex flex-col overflow-hidden border border-border bg-muted/70">
                  <button
                    type="button"
                    className="flex-1 px-2 text-xs text-card-foreground hover:bg-muted"
                    aria-label="時間を増やす"
                    onClick={() => setCurrentHours((prev) => prev + 1)}
                  >
                    ▲
                  </button>
                  <div className="h-px bg-border" />
                  <button
                    type="button"
                    className="flex-1 px-2 text-xs text-card-foreground hover:bg-muted"
                    aria-label="時間を減らす"
                    onClick={() => setCurrentHours((prev) => prev - 1)}
                  >
                    ▼
                  </button>
                </div>
              </div>
              <span className="text-xl md:text-2xl text-card-foreground">
                時間
              </span>
              <div className="relative w-24 md:w-28">
                <Input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="0"
                  className="pr-12 text-center text-2xl md:text-4xl font-bold bg-background border-2 border-border text-card-foreground appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  value={currentMinutes}
                  readOnly
                />
                <div className="absolute inset-y-1 right-1 flex flex-col overflow-hidden border border-border bg-muted/70">
                  <button
                    type="button"
                    className="flex-1 px-2 text-xs text-card-foreground hover:bg-muted"
                    aria-label="分を増やす"
                    onClick={() => setCurrentMinutes((prev) => prev + 1)}
                  >
                    ▲
                  </button>
                  <div className="h-px bg-border" />
                  <button
                    type="button"
                    className="flex-1 px-2 text-xs text-card-foreground hover:bg-muted"
                    aria-label="分を減らす"
                    onClick={() => setCurrentMinutes((prev) => prev - 1)}
                  >
                    ▼
                  </button>
                </div>
              </div>
              <span className="text-xl md:text-2xl text-card-foreground">
                分
              </span>
            </div>

            <Button
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm md:text-base py-4 disabled:opacity-50"
              onClick={handleTotal}
            >
              ✓ 記録する
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
