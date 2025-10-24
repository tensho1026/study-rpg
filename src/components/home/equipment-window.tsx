"use client";

import { useState, type ReactNode } from "react";
import { Gem, Shield, ShoppingBag, Sparkles, Swords } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type Equipment = {
  weapon: string;
  armor: string;
  accessory: string;
};

const EQUIPPED_ITEMS: Equipment = {
  weapon: "⚔️ ブロンズソード",
  armor: "🛡️ レザーアーマー",
  accessory: "✨ 集中のチャーム",
};

const SHOP_ITEMS = [
  {
    name: "鋼の剣",
    type: "武器",
    rarity: "RARE",
    price: 480,
    emoji: "🗡️",
  },
  {
    name: "聖騎士の盾",
    type: "防具",
    rarity: "EPIC",
    price: 620,
    emoji: "🛡️",
  },
  {
    name: "魔導士のローブ",
    type: "防具",
    rarity: "RARE",
    price: 540,
    emoji: "🪄",
  },
  {
    name: "集中の指輪",
    type: "装飾品",
    rarity: "UNCOMMON",
    price: 310,
    emoji: "💍",
  },
  {
    name: "賢者の眼鏡",
    type: "装飾品",
    rarity: "RARE",
    price: 420,
    emoji: "👓",
  },
];

export function EquipmentWindow() {
  const [showShop, setShowShop] = useState(false);

  return (
    <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/75 via-slate-950/80 to-slate-950/95 p-5 text-white shadow-xl shadow-black/30">
      <div className="absolute -left-16 top-10 size-40 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute -right-12 bottom-0 size-52 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative space-y-4">
        <header className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-100">
              <Swords className="size-4" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                装備
              </p>
              <h3 className="text-lg font-semibold text-white">
                ギアロードアウト
              </h3>
            </div>
          </div>
          <Link href='/shop'>
          <Button className="h-auto rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/25">
            <ShoppingBag className="size-3.5" />
            ショップ
          </Button>
          </Link>
        </header>

        <div className="space-y-3 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              装備中のギア
            </p>
            <div className="mt-3 space-y-3">
              <EquipmentRow
                label="武器"
                value={EQUIPPED_ITEMS.weapon}
                icon={<Swords className="size-4 text-rose-200" />}
              />
              <EquipmentRow
                label="防具"
                value={EQUIPPED_ITEMS.armor}
                icon={<Shield className="size-4 text-sky-200" />}
              />
              <EquipmentRow
                label="装飾品"
                value={EQUIPPED_ITEMS.accessory}
                icon={<Gem className="size-4 text-emerald-200" />}
              />
            </div>
          </div>

          {/* <div className="rounded-2xl border border-purple-400/40 bg-purple-500/10 p-4 text-xs text-purple-100 shadow-inner shadow-[0_0_12px_rgba(168,85,247,0.25)]">
              <div className="flex items-center gap-2 font-semibold text-purple-100">
                <Sparkles className="size-4" />
                次の強化ボーナス
              </div>
              <p className="mt-1 leading-relaxed text-purple-100/80">
                Rare以上の装備を3つ揃えると、経験値獲得量が10%アップするパッシブが解放されます。
              </p>
            </div> */}
        </div>
      </div>
    </Card>
  );
}

function EquipmentRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/60 px-3 py-2 text-sm">
      <div className="flex items-center gap-2 text-white/70">
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/10">
          {icon}
        </span>
        <span className="text-xs uppercase tracking-[0.22em]">{label}</span>
      </div>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}
