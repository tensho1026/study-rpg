import React from "react";

type ControlButtonProps = {
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
};

function ControlButton({ setX, setY }: ControlButtonProps) {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 space-y-2">
      <div className="flex justify-center">
        <button
          onClick={() => setY((prev) => prev - 30)}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          ↑
        </button>
      </div>
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setX((prev) => prev - 30)}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          ←
        </button>
        <button
          onClick={() => setX((prev) => prev + 30)}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          →
        </button>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setY((prev) => prev + 30)}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          ↓
        </button>
      </div>
    </div>
  );
}

export default ControlButton;
