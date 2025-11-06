"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { AppMenuButton } from "@/components/common/app-menu-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MAPS } from "@/constant/mapDescriptions";
import Link from "next/link";

type MapId = (typeof MAPS)[number]["id"];

export default function AdventurePage() {
  const [selectedMapId, setSelectedMapId] = useState<MapId>("grassland");

  const selectedMap = useMemo(
    () => MAPS.find((map) => map.id === selectedMapId) ?? MAPS[0],
    [selectedMapId]
  );

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto flex max-w-5xl flex-col space-y-6 md:space-y-8">
        <Card className="rpg-window bg-card p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3 md:items-center">
              <AppMenuButton
                className="mt-1 border-border bg-background/70 text-card-foreground/80 hover:bg-background/90 hover:text-card-foreground"
                triggerLabel="アプリメニューを開く"
              />
              <div>
                <span className="text-xs md:text-sm tracking-[0.4em] text-accent uppercase">
                  Adventure
                </span>
                <h1 className="mt-1 text-2xl text-card-foreground md:text-3xl">
                  冒険マップを選ぶ
                </h1>
              </div>
            </div>
            <div className="rounded-xl border-2 border-border bg-background/70 px-4 py-3 text-right text-xs text-muted-foreground md:text-sm">
              <p className="text-muted-foreground">現在のレベル</p>
              <p className="text-xl font-semibold text-card-foreground md:text-2xl">
                Lv. 17
              </p>
            </div>
          </div>
        </Card>

        <Card className="rpg-window bg-card p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm text-card-foreground md:text-base">
                行き先を選択
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {MAPS.map((map) => {
                const isActive = map.id === selectedMapId;
                return (
                  <Button
                    key={map.id}
                    type="button"
                    variant={isActive ? "default" : "secondary"}
                    className={
                      isActive
                        ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(236,72,153,0.35)] hover:bg-primary/90"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }
                    onClick={() => setSelectedMapId(map.id)}
                  >
                    {map.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </Card>

        <Card className="rpg-window overflow-hidden bg-card md:p-0">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full overflow-hidden border-b-2 border-border md:w-1/2 md:border-b-0 md:border-r-2">
              <div className="relative h-56 w-full md:h-full md:min-h-[340px]">
                <Image
                  src={selectedMap.image}
                  alt={`${selectedMap.name} の風景`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 60vw, 92vw"
                  priority
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 text-white">
                <p className="text-lg font-semibold md:text-xl">
                  {selectedMap.name}
                </p>
                <p className="text-xs text-white/80 md:text-sm">
                  {selectedMap.tagline}
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 p-5 text-xs text-muted-foreground md:w-1/2 md:p-6 md:text-sm">
              <div className="space-y-3">
                <p className="text-sm text-card-foreground md:text-base">
                  {selectedMap.atmosphere}
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="bg-background border-2 border-border p-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 md:text-xs">
                      難易度
                    </p>
                    <p className="text-base font-semibold text-card-foreground">
                      {selectedMap.difficulty}
                    </p>
                  </div>
                  <div className="bg-background border-2 border-border p-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 md:text-xs">
                      推奨レベル
                    </p>
                    <p className="text-base font-semibold text-card-foreground">
                      {selectedMap.recommendedLevel}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 bg-background border-2 border-border p-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 md:text-xs">
                  出現モンスター
                </p>
                <ul className="space-y-1 text-sm text-card-foreground/90 md:text-base">
                  {selectedMap.monsters.map((monster) => (
                    <li key={monster}>・{monster}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 border-t border-border pt-3 md:flex-row md:items-center md:justify-center">
                <Link href={`/map/${selectedMap.id}`}>
                  <Button className="px-6 text-sm md:text-base">
                    {selectedMap.name} へ出発する
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
