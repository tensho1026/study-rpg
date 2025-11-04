"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

interface LevelUpNotificationProps {
  level: number;
}

export function LevelUpNotification({ level }: LevelUpNotificationProps) {
  const prevLevelRef = useRef(level);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (level > prevLevelRef.current) {
      setVisible(true);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
    prevLevelRef.current = level;

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [level]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-1/2 top-4 z-50 w-full max-w-md -translate-x-1/2 transition-all duration-300 ease-out",
        visible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      )}
    >
      <div className="flex items-center gap-3 rounded-xl border border-emerald-400/40 bg-slate-900/90 px-5 py-3 text-emerald-100 shadow-lg shadow-emerald-500/20 backdrop-blur">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
          <Sparkles className="size-5" />
        </span>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">
            Level Up
          </span>
          <span className="text-sm font-semibold">
            レベルが {level} に上がりました！
          </span>
        </div>
      </div>
    </div>
  );
}
