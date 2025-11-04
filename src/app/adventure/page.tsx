"use client";

import { ReactNode, useEffect, useRef } from "react";
import type { MouseEvent, TouchEvent } from "react";
import {
  Application,
  Container,
  Graphics,
  Sprite,
  Texture,
  SCALE_MODES,
} from "pixi.js";

type TileType =
  | "grass"
  | "forest"
  | "fields"
  | "water"
  | "bridge"
  | "mountain"
  | "path"
  | "sand";

type DecorationType = "hero";
type Position = {
  x: number;
  y: number;
};

const TILE_SIZE = 48;
const PIXEL_SIZE = 4;
const GRID_SIZE = TILE_SIZE / PIXEL_SIZE;

type PixelArtPattern = {
  palette: Record<string, number>;
  rows: string[];
};

const TILE_SYMBOLS: Record<string, TileType> = {
  ".": "grass",
  G: "grass",
  T: "forest",
  F: "fields",
  W: "water",
  B: "bridge",
  M: "mountain",
  P: "path",
  S: "sand",
};

const MAP_TEMPLATE = [
  "MMMMMMFFFFFFFFTTTTTTTTWWWWGGGGGGSSSSSSSSSSSSSSSS",
  "MMMMMMFFFFFFFFTTTTTTTTWWWWGGGGGGSSSSSSSSSSSSSSSS",
  "MMMMMMFFFFFFFFTTTTTTTTWWWWGGGGGGSSSSSSSSSSSSSSSS",
  "MMMMMMFFFFFFFFTTTTTTTTWWWWGGGGGGSSSSSSSSSSSSSSSS",
  "MMMMMMFFFFFFFFTTTTTTTTWWWWGGGGGGGGSSSSSSSSSSSSSS",
  "MMMMMMFFFFFFFFTTTTTTTTWWWWGGGGGGGGSSSSSSSSSSSSSS",
  "MMMMFFFFFFFFFFTTTTTTTBBBBBBGGGGGGGSSSSSSSSSSSSSS",
  "MMMMFFFFFFFFFFTTTTTTTTWWWWGGGGGGGGSSSSSSSSSSSSSS",
  "MMMMFFFFTTTTTTTTTTGGGGWWWWGGGGGGGGSSSSSSSSSSSSSS",
  "MMMMGGGGTTTTTTTTTTGGGGWWWWGGGGGGGGSSSSSSSSSSSSSS",
  "MMMMGGGGTTTTTTTTTTGGGWWWWWWGGGGGGGSSSSSSSSSSSSSS",
  "MMMMGGGGTTTTTTTTTTGGGWWWWWWGGGGGGGSSSSSSSSSSSSSS",
  "GGGGGGGGTTTTTTTTTTGGGBBBBBBGGGGGGGGGSSSSSSSSSSSS",
  "GGGGGGGGTTTTTTTTTTGGGWWWWWWGGGGGGGGGSSSSSSSSSSSS",
  "GGGGGGGGTTTTTTTTTTWWWWWWWWWGGGGGGGGGSSSSSSSSSSSS",
  "GGGGGGGGTTTTTTTTTTWWWWWWWWWGGGGGGGGGSSSSSSSSSSSS",
  "GGGGGGGGTTTTTTTTTTWWWWWWWWWGGGGGGGGGSSSSSSSSSSSS",
  "GGGGGGGGTTTTTTTTTTWWWWWWWWWGGGGGGGGGSSSSSSSSSSSS",
  "GGGGGGGGGGGGPPPPPPPPGBBBBBBGGGGGGGGGSSSSSSSSSSSS",
  "GGGGGGGGGGGGPPPPPPPPGWWWWWWGGGGGGGGGSSSSSSSSSSSS",
  "GGGGFFFFFFFFPPPPPPPPGGWWWWGGGGPPPPGGSSSSSSSSSSSS",
  "GGGGFFFFFFFFPPPPPPPPGGWWWWGGGGPPPPGGSSSSSSSSSSSS",
  "MMMMMMMFFFFFPPPPPPPPGGWWWWGGGGPPPPGGSSSSSSSSSSSS",
  "MMMMMMMFFFFFPPPPPPPPGGWWWWGGGGPPPPGGSSSSSSSSSSSS",
  "MMMMMMMFFFFFPPPPPPPPPPPPPPPPPPPPPPPPSSSSSSSSSSSS",
  "MMMMMMMFFFFFPPPPPPPPPPWWWWPPPPPPPPPPSSSSSSSSSSSS",
  "MMMMMMMGGGGGPPPPPPPPPPWWWWPPPPPPPPPPSSSSSSSSSSSS",
  "MMMMMMMGGGGGPPPPPPPPPPWWWWPPPPPPPPPPSSSSSSSSSSSS",
  "MMMMMMMGGGGGPPPPPPPPGGWWWWGGGGGGGGGGSSSSSSSSSSSS",
  "MMMMMMMGGGGGPPPPPPPPGGWWWWGGGGGGGGGGSSSSSSSSSSSS",
  "MMMMMMMGGGGGGGGGGGGGGGWWWWGGGGGGGGGGSSSSSSSSSSSS",
  "MMMMMMMGGGGGGGGGGGGGGGWWWWGGGGGGGGGGSSSSSSSSSSSS",
] as const;

const MAP_BLUEPRINT: TileType[][] = MAP_TEMPLATE.map((row) =>
  row.split("").map((symbol) => TILE_SYMBOLS[symbol] ?? "grass")
);

const MAP_WIDTH = MAP_BLUEPRINT[0]?.length ?? 0;
const MAP_HEIGHT = MAP_BLUEPRINT.length;
const HERO_START_POSITION: Position = { x: 20, y: 24 };
const WALKABLE_TILES = new Set<TileType>([
  "grass",
  "forest",
  "fields",
  "bridge",
  "path",
  "sand",
]);

const DECORATION_PATTERNS: Record<DecorationType, PixelArtPattern> = {
  hero: {
    palette: {
      o: 0x1f2937,
      a: 0xcbd5f5,
      v: 0x38bdf8,
      b: 0x1e3a8a,
      h: 0xf8fafc,
    },
    rows: [
      "....oooo....",
      "...oaaaao...",
      "..oaaaaaao..",
      "..oavvvvao..",
      ".ooahhaaaoo.",
      ".oaaahaaao..",
      ".oaaobbaaao.",
      ".oaaobbaaao.",
      "..oab..bao..",
      "..oab..bao..",
      "...oo..oo...",
      "............",
    ],
  },
};

export default function AdventurePage() {
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const heroGraphicRef = useRef<Graphics | null>(null);
  const heroPositionRef = useRef<Position>({ ...HERO_START_POSITION });
  const moveHeroRef = useRef<(dx: number, dy: number) => void | null>(null);

  useEffect(() => {
    let isDisposed = false;
    const app = new Application();

    const init = async () => {
      const width = (MAP_BLUEPRINT[0]?.length ?? 0) * TILE_SIZE;
      const height = MAP_BLUEPRINT.length * TILE_SIZE;

      await app.init({
        width,
        height,
        backgroundAlpha: 0,
        antialias: false,
      });

      if (isDisposed) {
        return;
      }

      const mountNode = canvasHostRef.current;
      if (!mountNode) {
        app.destroy();
        return;
      }

      mountNode.innerHTML = "";
      mountNode.appendChild(app.canvas);
      const canvasStyle = app.canvas.style;
      canvasStyle.display = "block";
      canvasStyle.margin = "0 auto";
      canvasStyle.imageRendering = "pixelated";
      canvasStyle.boxShadow = "0 0 40px rgba(0,0,0,0.45)";

      const textures = buildTileTextures(app);
      const tileLayer = new Container();
      const decorationLayer = new Container();
      app.stage.addChild(tileLayer);
      app.stage.addChild(decorationLayer);

      drawMap(tileLayer, textures);
      heroGraphicRef.current = placeDecorations(
        decorationLayer,
        heroPositionRef.current
      );

      moveHeroRef.current = (dx, dy) => {
        const graphic = heroGraphicRef.current;
        if (!graphic) {
          return;
        }

        const current = heroPositionRef.current;
        const nextX = Math.min(
          Math.max(current.x + dx, 0),
          Math.max(MAP_WIDTH - 1, 0)
        );
        const nextY = Math.min(
          Math.max(current.y + dy, 0),
          Math.max(MAP_HEIGHT - 1, 0)
        );

        if (nextX === current.x && nextY === current.y) {
          return;
        }

        const targetTile = MAP_BLUEPRINT[nextY]?.[nextX];
        if (!targetTile || !WALKABLE_TILES.has(targetTile)) {
          return;
        }

        heroPositionRef.current = { x: nextX, y: nextY };
        graphic.position.set(nextX * TILE_SIZE, nextY * TILE_SIZE);
      };
    };

    init();

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const lower = key.toLowerCase();
      const keyMap: Record<string, [number, number]> = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        w: [0, -1],
        s: [0, 1],
        a: [-1, 0],
        d: [1, 0],
      };

      const direction =
        keyMap[key] ?? (key !== lower ? keyMap[lower] : undefined);

      if (!direction) {
        return;
      }

      event.preventDefault();
      moveHeroRef.current?.(direction[0], direction[1]);
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      isDisposed = true;
      window.removeEventListener("keydown", handleKeyDown);
      moveHeroRef.current = undefined;
      heroGraphicRef.current = null;
      app.destroy(true, {
        children: true,
        texture: true,
        textureSource: true,
      });
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute left-1/2 top-8 z-10 -translate-x-1/2 rounded-md border border-amber-500/40 bg-slate-900/70 px-6 py-2 font-mono text-2xl font-bold tracking-[0.4em] text-amber-300 shadow-[0_0_24px_rgba(248,181,0,0.35)]">
        ADVENTURE MAP
      </div>
      <div
        ref={canvasHostRef}
        className="h-full w-full overflow-auto px-8 pb-12 pt-24 sm:px-12 lg:px-16"
      />
      <div className="pointer-events-none absolute bottom-12 left-1/2 z-20 -translate-x-1/2 sm:bottom-16">
        <div className="flex flex-col items-center gap-3">
          <span className="text-center text-xs uppercase tracking-[0.3em] text-slate-200/80">
            MOVE
          </span>
          <div className="grid grid-cols-3 gap-3">
            <span />
            <DirectionalButton
              label="Move up"
              onMove={() => moveHeroRef.current?.(0, -1)}
            >
              ↑
            </DirectionalButton>
            <span />
            <DirectionalButton
              label="Move left"
              onMove={() => moveHeroRef.current?.(-1, 0)}
            >
              ←
            </DirectionalButton>
            <span />
            <DirectionalButton
              label="Move right"
              onMove={() => moveHeroRef.current?.(1, 0)}
            >
              →
            </DirectionalButton>
            <span />
            <DirectionalButton
              label="Move down"
              onMove={() => moveHeroRef.current?.(0, 1)}
            >
              ↓
            </DirectionalButton>
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

type DirectionalButtonProps = {
  onMove: () => void;
  children: ReactNode;
  label: string;
};

function DirectionalButton({
  onMove,
  children,
  label,
}: DirectionalButtonProps) {
  const handleTouchStart = (event: TouchEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onMove();
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onMove();
  };

  return (
    <button
      type="button"
      className="pointer-events-auto flex h-14 w-14 select-none items-center justify-center rounded-full bg-slate-900/80 text-xl font-semibold text-slate-100 shadow-[0_8px_20px_rgba(15,23,42,0.45)] ring-1 ring-white/10 backdrop-blur transition active:scale-95 sm:h-16 sm:w-16"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      aria-label={label}
    >
      {children}
    </button>
  );
}

function buildTileTextures(app: Application): Record<TileType, Texture> {
  return {
    grass: createGrassTexture(app),
    forest: createForestTexture(app),
    fields: createFieldTexture(app),
    water: createWaterTexture(app),
    bridge: createBridgeTexture(app),
    mountain: createMountainTexture(app),
    path: createPathTexture(app),
    sand: createSandTexture(app),
  };
}

function drawMap(layer: Container, textures: Record<TileType, Texture>) {
  layer.removeChildren();

  MAP_BLUEPRINT.forEach((row, y) => {
    row.forEach((tile, x) => {
      const texture = textures[tile] ?? textures.grass;
      const sprite = new Sprite(texture);
      sprite.x = x * TILE_SIZE;
      sprite.y = y * TILE_SIZE;
      sprite.roundPixels = true;
      layer.addChild(sprite);
    });
  });
}

function placeDecorations(layer: Container, heroPosition: Position): Graphics {
  layer.removeChildren();

  const graphic = createDecorationGraphic("hero");
  graphic.position.set(heroPosition.x * TILE_SIZE, heroPosition.y * TILE_SIZE);
  layer.addChild(graphic);
  return graphic;
}

function createDecorationGraphic(type: DecorationType): Graphics {
  const graphic = baseGraphic();
  const pattern = DECORATION_PATTERNS[type];

  if (!pattern) {
    return graphic;
  }

  drawPixelPattern(graphic, pattern);
  return graphic;
}

function baseGraphic() {
  const g = new Graphics();
  g.rect(0, 0, TILE_SIZE, TILE_SIZE).fill({ color: 0x000000, alpha: 0 });
  return g;
}

function createGrassTexture(app: Application) {
  return textureFromGraphics(app, paintGrassPattern);
}

function createForestTexture(app: Application) {
  return textureFromGraphics(app, paintForestPattern);
}

function createFieldTexture(app: Application) {
  return textureFromGraphics(app, paintFieldPattern);
}

function createWaterTexture(app: Application) {
  return textureFromGraphics(app, paintWaterPattern);
}

function createBridgeTexture(app: Application) {
  return textureFromGraphics(app, paintBridgePattern);
}

function createMountainTexture(app: Application) {
  return textureFromGraphics(app, paintMountainPattern);
}

function createPathTexture(app: Application) {
  return textureFromGraphics(app, paintPathPattern);
}

function createSandTexture(app: Application) {
  return textureFromGraphics(app, paintSandPattern);
}

function textureFromGraphics(
  app: Application,
  draw: (graphics: Graphics) => void
): Texture {
  const graphics = new Graphics();
  draw(graphics);
  const texture = app.renderer.generateTexture(graphics);
  texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
  graphics.destroy();
  return texture;
}

function drawPixel(
  graphics: Graphics,
  gridX: number,
  gridY: number,
  color: number,
  width = 1,
  height = 1
) {
  graphics
    .rect(
      gridX * PIXEL_SIZE,
      gridY * PIXEL_SIZE,
      width * PIXEL_SIZE,
      height * PIXEL_SIZE
    )
    .fill(color);
}

function drawPixelPattern(graphics: Graphics, pattern: PixelArtPattern) {
  pattern.rows.forEach((row, y) => {
    if (y >= GRID_SIZE) {
      return;
    }
    const limit = Math.min(row.length, GRID_SIZE);
    for (let x = 0; x < limit; x += 1) {
      const key = row[x];
      if (key === ".") {
        continue;
      }
      const color = pattern.palette[key];
      if (color === undefined) {
        continue;
      }
      drawPixel(graphics, x, y, color);
    }
  });
}

function paintGrassPattern(graphics: Graphics) {
  graphics.clear();
  graphics.rect(0, 0, TILE_SIZE, TILE_SIZE).fill(0x4f9f4d);

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      if ((x + y) % 5 === 0) {
        drawPixel(graphics, x, y, 0x3f7f38);
      } else if ((x * 2 + y) % 7 === 0) {
        drawPixel(graphics, x, y, 0x6fdc6f);
      }
    }
  }

  [
    [2, 2],
    [9, 3],
    [5, 8],
  ].forEach(([x, y]) => {
    drawPixel(graphics, x, y, 0xfef9c3);
    if (x + 1 < GRID_SIZE) {
      drawPixel(graphics, x + 1, y, 0xffffff);
    }
  });
}

function paintForestPattern(graphics: Graphics) {
  graphics.clear();
  graphics.rect(0, 0, TILE_SIZE, TILE_SIZE).fill(0x2f6134);

  for (let baseX = 1; baseX < GRID_SIZE; baseX += 4) {
    const trunkX = Math.min(baseX, GRID_SIZE - 2);
    for (let y = 5; y < GRID_SIZE; y += 1) {
      drawPixel(graphics, trunkX, y, 0x3f2f1f);
      drawPixel(graphics, trunkX + 1, y, 0x3f2f1f);
    }
    for (let y = 1; y < 5; y += 1) {
      const left = Math.max(0, trunkX - 1);
      drawPixel(graphics, left, y, 0x34703e);
      drawPixel(graphics, left + 1, y - 1 >= 0 ? y - 1 : y, 0x4fa75a);
      drawPixel(graphics, Math.min(left + 2, GRID_SIZE - 1), y, 0x2c5f34);
    }
  }

  for (let y = 0; y < GRID_SIZE; y += 3) {
    for (let x = 0; x < GRID_SIZE; x += 3) {
      if ((x + y) % 2 === 0) {
        drawPixel(graphics, x, y, 0x24502a);
      }
    }
  }
}

function paintFieldPattern(graphics: Graphics) {
  graphics.clear();
  graphics.rect(0, 0, TILE_SIZE, TILE_SIZE).fill(0xad7a2b);

  for (let y = 1; y < GRID_SIZE; y += 3) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      drawPixel(graphics, x, y, 0xcf9b47);
    }
  }
  for (let x = 0; x < GRID_SIZE; x += 4) {
    for (let y = 0; y < GRID_SIZE; y += 1) {
      drawPixel(graphics, x, y, 0x8c5b24);
    }
  }
  for (let x = 2; x < GRID_SIZE; x += 4) {
    for (let y = 0; y < GRID_SIZE; y += 2) {
      drawPixel(graphics, x, y, 0xe5b76b);
    }
  }
}

function paintWaterPattern(graphics: Graphics) {
  graphics.clear();
  graphics.rect(0, 0, TILE_SIZE, TILE_SIZE).fill(0x1e63c9);

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      if ((x + y) % 5 === 0) {
        drawPixel(graphics, x, y, 0x2d79de);
      } else if ((x + y * 2) % 7 === 0) {
        drawPixel(graphics, x, y, 0x55b6ff);
      }
    }
  }

  [
    [1, 3],
    [6, 1],
    [10, 4],
    [4, 8],
  ].forEach(([x, y]) => {
    drawPixel(graphics, x, y, 0xffffff);
  });
}

function paintBridgePattern(graphics: Graphics) {
  paintWaterPattern(graphics);

  const deckTop = Math.floor(GRID_SIZE / 2) - 2;
  for (let y = deckTop; y < deckTop + 4; y += 1) {
    const plankColor = y === deckTop || y === deckTop + 3 ? 0xe0c38a : 0xba843c;
    for (let x = 1; x < GRID_SIZE - 1; x += 1) {
      drawPixel(graphics, x, y, plankColor);
      if (y === deckTop + 1 && x % 2 === 0) {
        drawPixel(graphics, x, y, 0xf5d49a);
      }
    }
  }

  for (let x = 1; x < GRID_SIZE - 1; x += 3) {
    for (let y = deckTop; y < deckTop + 4; y += 1) {
      if (y === deckTop + 1) {
        continue;
      }
      drawPixel(graphics, x, y, 0x8f5a27);
    }
  }

  for (let x = 1; x < GRID_SIZE - 1; x += 3) {
    drawPixel(graphics, x, deckTop - 1, 0x5b3412);
    drawPixel(graphics, x, deckTop + 4, 0x5b3412);
  }
}

function paintMountainPattern(graphics: Graphics) {
  graphics.clear();
  graphics.rect(0, 0, TILE_SIZE, TILE_SIZE).fill(0x2f2739);

  for (let y = 2; y < GRID_SIZE; y += 1) {
    const span = GRID_SIZE - Math.floor(y * 0.6);
    const left = Math.max(0, Math.floor((GRID_SIZE - span) / 2));
    const right = Math.min(GRID_SIZE, left + span);

    for (let x = left; x < right; x += 1) {
      let color = 0x6d5c76;
      if (y < 4) {
        color = 0xf1eff8;
      } else if (y < 6) {
        color = 0x9285a0;
      } else if (x <= left + 1) {
        color = 0x55445f;
      } else if (x >= right - 2) {
        color = 0x4a3f56;
      }
      drawPixel(graphics, x, y, color);
    }
  }

  for (let x = 0; x < GRID_SIZE; x += 3) {
    drawPixel(graphics, x, GRID_SIZE - 1, 0x3a2f44);
  }
}

function paintPathPattern(graphics: Graphics) {
  graphics.clear();
  graphics.rect(0, 0, TILE_SIZE, TILE_SIZE).fill(0xc58c56);

  for (let x = 0; x < GRID_SIZE; x += 1) {
    drawPixel(graphics, x, 0, 0x8f5a27);
    drawPixel(graphics, x, GRID_SIZE - 1, 0x8f5a27);
  }
  for (let y = 0; y < GRID_SIZE; y += 1) {
    drawPixel(graphics, 0, y, 0x8f5a27);
    drawPixel(graphics, GRID_SIZE - 1, y, 0x8f5a27);
  }

  for (let y = 1; y < GRID_SIZE - 1; y += 1) {
    for (let x = 1; x < GRID_SIZE - 1; x += 1) {
      if ((x + y) % 3 === 0) {
        drawPixel(graphics, x, y, 0xe3ba84);
      } else if ((x + y * 2) % 5 === 0) {
        drawPixel(graphics, x, y, 0xa46a3c);
      }
    }
  }
}

function paintSandPattern(graphics: Graphics) {
  graphics.clear();
  graphics.rect(0, 0, TILE_SIZE, TILE_SIZE).fill(0xd9c377);

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      if ((x + y) % 4 === 0) {
        drawPixel(graphics, x, y, 0xeedc9a);
      } else if ((x * 3 + y) % 7 === 0) {
        drawPixel(graphics, x, y, 0xb9984e);
      }
    }
  }

  [
    [2, 3],
    [8, 5],
    [5, 9],
  ].forEach(([x, y]) => {
    drawPixel(graphics, x, y, 0xfaf3c0);
  });
}
