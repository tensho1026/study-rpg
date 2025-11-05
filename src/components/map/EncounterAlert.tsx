"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface EncounterAlertProps {
  message?: string;
  visible?: boolean;
  autoHideAfter?: number;
  onHide?: () => void;
}

export function EncounterAlert({
  message = "敵が現れた！",
  visible = false,
  autoHideAfter = 2500,
  onHide,
}: EncounterAlertProps) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);

    if (!visible) {
      return;
    }

    if (!autoHideAfter) {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      onHide?.();
    }, autoHideAfter);

    return () => clearTimeout(timer);
  }, [visible, autoHideAfter, onHide]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
      <div className="pointer-events-auto flex min-w-[280px] max-w-sm flex-col items-center gap-4 rounded-2xl border border-emerald-300/50 bg-slate-950/95 px-8 py-6 text-center text-emerald-100 shadow-[0_25px_40px_rgba(12,74,110,0.5)] ring-1 ring-emerald-200/20 transition-all duration-300 ease-out">
        <div className="flex items-center justify-center gap-2 text-sm uppercase tracking-[0.3em] text-emerald-200/80">
          <Sparkles className="size-4 text-emerald-300 drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
          Encounter
        </div>
        <p className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_14px_rgba(16,185,129,0.45)]">
          {message}
        </p>
        <p className="text-xs text-emerald-200/70">
          落ち着いて行動を選ぼう…
        </p>
      </div>
    </div>
  );
}
