"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ItemShopHeader from "./itemShopHeader";
import { useState } from "react";
import { BattleItem } from "@/types/battleItem";
import ItemShopFooter from "./ItemShopFooter";
import purchaseItem from "@/app/actions/itemShop/purchaseItem";
import getItemShopData from "@/app/actions/itemShop/getItemShopData";

type Props = {
  coin: number;
  mstData: BattleItem[];
};

export default function ItemShop({ coin, mstData }: Props) {
  const [userCoin, setUserCoin] = useState(coin);
  const [itemData, setItemData] = useState<BattleItem[] | null>(mstData ?? []);

  const handlePurchase = async (itemId: string, cost: number) => {
    await purchaseItem(itemId, cost ?? 0);
    const update = await getItemShopData();
    setUserCoin(update?.userCoins ?? 0);
    setItemData(update?.howUserHas ?? []);
  };
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <ItemShopHeader coin={userCoin} />

        <section className="space-y-4">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-wide text-card-foreground">
              商品ラインナップ
            </h2>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Item Catalog
            </span>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {itemData?.map((item) => {
              return (
                <Card
                  key={item.id}
                  className="flex h-full flex-col gap-3 border border-indigo-300/20 bg-slate-800/80 p-5 text-slate-100 shadow-[0_12px_30px_rgba(15,23,42,0.45)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold tracking-wide text-white">
                        {item.name}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.3em] text-indigo-200/80">
                        ★{item.rarity}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-200/80">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs text-indigo-100/90"></div>

                  <div className="mt-auto flex items-center justify-between border-t border-indigo-200/20 pt-3">
                    <div className="text-xs text-slate-300/80">
                      所持数
                      <span className="ml-2 text-base font-semibold text-white">
                        {/* {itemData.} */}
                        {item.quantity}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-emerald-200">
                        {item.price?.toLocaleString() ?? "-"} G
                      </p>
                      <Button
                        variant="outline"
                        className="mt-2 border-indigo-300/40 bg-indigo-500/10 text-indigo-100 hover:bg-indigo-500/30"
                        onClick={() => handlePurchase(item.id, item.price ?? 0)}
                      >
                        購入
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <ItemShopFooter />
      </div>
    </div>
  );
}
