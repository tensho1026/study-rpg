"use client";

import ControlButton from "@/components/map/ControllButton";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const HERO_WIDTH = 90;
const HERO_HEIGHT = 200;
const STEP_SIZE = 30;
const SAFE_TOP_OFFSET = 16;
const MOBILE_BREAKPOINT = 640;

export default function Page() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLImageElement | null>(null);
  const initializedRef = useRef(false);

  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const safeBottomOffset = useMemo(() => {
    if (!bounds.width) {
      return 0;
    }
    return bounds.width <= MOBILE_BREAKPOINT ? 180 : 60;
  }, [bounds.width]);

  const clampPosition = useCallback(
    (x: number, y: number) => {
      if (!bounds.width || !bounds.height) {
        return { x, y };
      }

      const maxX = Math.max(0, bounds.width - HERO_WIDTH);
      const availableVerticalSpace = bounds.height - HERO_HEIGHT;
      const maxY = Math.max(
        SAFE_TOP_OFFSET,
        availableVerticalSpace - safeBottomOffset
      );

      return {
        x: Math.min(Math.max(x, 0), maxX),
        y: Math.min(Math.max(y, SAFE_TOP_OFFSET), maxY),
      };
    },
    [bounds.height, bounds.width, safeBottomOffset]
  );

  useEffect(() => {
    const updateBounds = () => {
      const node = containerRef.current;
      if (!node) {
        return;
      }
      setBounds({ width: node.clientWidth, height: node.clientHeight });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  useEffect(() => {
    if (!bounds.width || !bounds.height) {
      return;
    }

    setPosition((prev) => {
      if (!initializedRef.current) {
        initializedRef.current = true;
        const centeredX = (bounds.width - HERO_WIDTH) / 2;
        const centeredY = (bounds.height - HERO_HEIGHT) / 2;
        return clampPosition(centeredX, centeredY);
      }
      return clampPosition(prev.x, prev.y);
    });
  }, [bounds.height, bounds.width, clampPosition]);

  const followHeroOnMobile = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    const isMobile = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT}px)`
    ).matches;
    if (!isMobile) {
      return;
    }

    requestAnimationFrame(() => {
      heroRef.current?.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth",
      });
    });
  }, []);

  const moveHero = useCallback(
    (dx: number, dy: number) => {
      setPosition((prev) => {
        const next = clampPosition(prev.x + dx, prev.y + dy);
        return next;
      });
      followHeroOnMobile();
    },
    [clampPosition, followHeroOnMobile]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <Image
        src="/maps/grassland.png"
        alt="map"
        fill
        className="z-0 object-cover"
        priority
      />

      <Image
        ref={heroRef}
        src="/hero/image.png"
        alt="hero"
        width={HERO_WIDTH}
        height={HERO_HEIGHT}
        className="absolute z-10 transition-all duration-100"
        style={{
          top: position.y,
          left: position.x,
        }}
      />

      <ControlButton onMove={moveHero} step={STEP_SIZE} />
    </div>
  );
}
