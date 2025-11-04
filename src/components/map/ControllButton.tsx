import React, { ReactNode, useMemo, useRef } from "react";

type ControlButtonProps = {
  onMove: (dx: number, dy: number) => void;
  step?: number;
};

function ControlButton({ onMove, step = 30 }: ControlButtonProps) {
  const buttonClass =
    "relative flex h-14 w-14 select-none items-center justify-center rounded-sm border-2 border-slate-800 bg-[linear-gradient(135deg,#273449_0%,#121b2f_100%)] font-bold text-slate-100 shadow-[4px_4px_0_0_rgba(12,19,34,0.85)] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(12,19,34,0.85)] md:h-16 md:w-16";

  const pressTargets = useMemo(
    () => ({
      up: [0, -step] as const,
      down: [0, step] as const,
      left: [-step, 0] as const,
      right: [step, 0] as const,
    }),
    [step],
  );

  const touchActivatedRef = useRef(false);

  const handleTouch =
    (dx: number, dy: number) => (event: React.TouchEvent<HTMLButtonElement>) => {
      event.preventDefault();
      touchActivatedRef.current = true;
      onMove(dx, dy);
    };

  const handleClick =
    (dx: number, dy: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (touchActivatedRef.current) {
        touchActivatedRef.current = false;
        return;
      }
      onMove(dx, dy);
    };

  const renderButton = (
    direction: "up" | "down" | "left" | "right",
    [dx, dy]: readonly [number, number],
  ) => (
    <button
      key={direction}
      type="button"
      onClick={handleClick(dx, dy)}
      onTouchStart={handleTouch(dx, dy)}
      className={buttonClass}
      aria-label={`Move ${direction}`}
    >
      <ButtonChrome direction={direction} />
    </button>
  );

  return (
    <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 space-y-2 font-mono uppercase tracking-[0.3em] text-slate-100/80">
      <div className="text-center text-xs text-slate-200/80">Move</div>

      <div className="flex items-center justify-center">
        {renderButton("up", pressTargets.up)}
      </div>

      <div className="flex items-center justify-center gap-4">
        {renderButton("left", pressTargets.left)}
        {renderButton("right", pressTargets.right)}
      </div>

      <div className="flex items-center justify-center">
        {renderButton("down", pressTargets.down)}
      </div>
    </div>
  );
}

type ButtonChromeProps = {
  direction: "up" | "down" | "left" | "right";
  children?: ReactNode;
};

function ButtonChrome({ direction, children }: ButtonChromeProps) {
  const glyph =
    children ??
    ({
      up: "↑",
      down: "↓",
      left: "←",
      right: "→",
    }[direction] ?? direction);

  return (
    <>
      <span
        aria-hidden
        className="absolute -inset-[2px] -z-10 rounded border border-slate-900/70 bg-[linear-gradient(135deg,#0a0f1a_0%,#111c2b_100%)] shadow-[inset_0_0_6px_rgba(12,23,42,0.8)]"
      />
      <span
        aria-hidden
        className="absolute inset-[4px] rounded-[2px] border border-white/10 opacity-60"
      />
      <span className="relative z-10 text-xl drop-shadow-[0_0_6px_rgba(56,189,248,0.75)]">
        {glyph}
      </span>
    </>
  );
}

export default ControlButton;
