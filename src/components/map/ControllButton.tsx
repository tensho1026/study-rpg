import React from "react";

type ControlButtonProps = {
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
};

function ControlButton({ setX, setY }: ControlButtonProps) {
  const buttonClass =
    "relative flex h-14 w-14 select-none items-center justify-center rounded-sm border-2 border-slate-800 bg-[linear-gradient(135deg,#273449_0%,#121b2f_100%)] font-bold text-slate-100 shadow-[4px_4px_0_0_rgba(12,19,34,0.85)] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(12,19,34,0.85)] md:h-16 md:w-16";

  const handlePress =
    (fn: () => void) => (event: React.SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault();
      fn();
    };

  const moveUp = () => setY((prev) => prev - 30);
  const moveDown = () => setY((prev) => prev + 30);
  const moveLeft = () => setX((prev) => prev - 30);
  const moveRight = () => setX((prev) => prev + 30);

  return (
    <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 space-y-2 font-mono uppercase tracking-[0.3em] text-slate-100/80">
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handlePress(moveUp)}
          onTouchStart={handlePress(moveUp)}
          className={buttonClass}
          aria-label="Move up"
        >
          <span
            aria-hidden
            className="absolute -inset-[2px] -z-10 rounded border border-slate-900/70 bg-[linear-gradient(135deg,#0a0f1a_0%,#111c2b_100%)] shadow-[inset_0_0_6px_rgba(12,23,42,0.8)]"
          />
          <span
            aria-hidden
            className="absolute inset-[4px] rounded-[2px] border border-white/10 opacity-60"
          />
          <span className="relative z-10 drop-shadow-[0_0_6px_rgba(56,189,248,0.75)]">
            ↑
          </span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handlePress(moveLeft)}
          onTouchStart={handlePress(moveLeft)}
          className={buttonClass}
          aria-label="Move left"
        >
          <span
            aria-hidden
            className="absolute -inset-[2px] -z-10 rounded border border-slate-900/70 bg-[linear-gradient(135deg,#0a0f1a_0%,#111c2b_100%)] shadow-[inset_0_0_6px_rgba(12,23,42,0.8)]"
          />
          <span
            aria-hidden
            className="absolute inset-[4px] rounded-[2px] border border-white/10 opacity-60"
          />
          <span className="relative z-10 drop-shadow-[0_0_6px_rgba(56,189,248,0.75)]">
            ←
          </span>
        </button>
        <button
          type="button"
          onClick={handlePress(moveRight)}
          onTouchStart={handlePress(moveRight)}
          className={buttonClass}
          aria-label="Move right"
        >
          <span
            aria-hidden
            className="absolute -inset-[2px] -z-10 rounded border border-slate-900/70 bg-[linear-gradient(135deg,#0a0f1a_0%,#111c2b_100%)] shadow-[inset_0_0_6px_rgba(12,23,42,0.8)]"
          />
          <span
            aria-hidden
            className="absolute inset-[4px] rounded-[2px] border border-white/10 opacity-60"
          />
          <span className="relative z-10 drop-shadow-[0_0_6px_rgba(56,189,248,0.75)]">
            →
          </span>
        </button>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handlePress(moveDown)}
          onTouchStart={handlePress(moveDown)}
          className={buttonClass}
          aria-label="Move down"
        >
          <span
            aria-hidden
            className="absolute -inset-[2px] -z-10 rounded border border-slate-900/70 bg-[linear-gradient(135deg,#0a0f1a_0%,#111c2b_100%)] shadow-[inset_0_0_6px_rgba(12,23,42,0.8)]"
          />
          <span
            aria-hidden
            className="absolute inset-[4px] rounded-[2px] border border-white/10 opacity-60"
          />
          <span className="relative z-10 drop-shadow-[0_0_6px_rgba(56,189,248,0.75)]">
            ↓
          </span>
        </button>
      </div>
    </div>
  );
}

export default ControlButton;
