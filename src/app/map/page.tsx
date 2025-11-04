"use client";
import ControlButton from "@/components/map/ControllButton";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  const [x, setX] = useState(680);
  const [y, setY] = useState(360);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 背景画像 */}
      <Image
        src="/maps/grassland.png"
        alt="map"
        fill
        className="object-cover z-0"
        priority
      />

      {/* キャラ */}
      <Image
        src="/hero/image.png"
        alt="hero"
        width={90}
        height={200}
        className="absolute z-10 transition-all duration-100"
        style={{
          top: y,
          left: x,
        }}
      />

      {/* 移動ボタン */}
      <ControlButton setX={setX} setY={setY} />
    </div>
  );
}
