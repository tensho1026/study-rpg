import { useState } from "react";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import HpBar from "./HpBar";
import { BattleItem } from "@/types/battleItem";
import reduceItemAmount from "@/app/actions/battle/reduceItemAmount";

type UserStatus = {
  name: string;
  hp: number;
  maxHp: number;
  handleAttack: () => void;
  switchUseItem: (item: BattleItem) => void;
};

type Props = {
  userStatus: UserStatus;
  itemsData: BattleItem[];
};

export default function PlayerStatus({ userStatus, itemsData }: Props) {
  const [isItemWindowOpen, setIsItemWindowOpen] = useState(false);
  const [items, setItems] = useState(itemsData);

  return (
    <>
      <Card className="space-y-4 bg-slate-900/80 border-2 border-slate-700 p-4 rounded-sm">
        <h2 className="text-sm font-bold tracking-wider text-cyan-300">
          PLAYER
        </h2>
        <div className="rounded-sm border border-slate-700 bg-slate-950/60 p-2">
          <div className="flex justify-between text-xs text-slate-200">
            <span>{userStatus?.name}</span>
            <span>HP</span>
          </div>
          <HpBar
            current={userStatus?.hp ?? 0}
            max={userStatus?.maxHp ?? 0}
            color="bg-cyan-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            className="border-2 border-slate-600 bg-amber-400 hover:bg-amber-500 font-bold text-slate-900"
            onClick={userStatus?.handleAttack}
          >
            攻撃
          </Button>
          <Button
            variant="outline"
            className="border-2 border-slate-600 text-slate-200 hover:bg-slate-700"
            onClick={() => setIsItemWindowOpen(true)}
          >
            アイテム
          </Button>
        </div>
      </Card>

      {isItemWindowOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-md border-2 border-indigo-400/60 bg-indigo-800/95 p-6 text-slate-50 shadow-2xl shadow-indigo-900/50">
            <div className="absolute -top-3 left-6 rounded-sm border border-indigo-200/60 bg-indigo-300/90 px-3 py-1 text-xs font-semibold tracking-[0.3em] text-indigo-900 shadow-md">
              アイテム
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-sm">
              {items.map((item) => (
                <Button
                  key={item.name}
                  className="flex items-center justify-between rounded-sm border border-indigo-300/40 bg-indigo-900/60 px-3 py-2 shadow-[inset_0_0_6px_rgba(18,17,79,0.65)] transition hover:bg-indigo-200/30 hover:text-white"
                  disabled={item.quantity! <= 0}
                  onClick={() => {
                    userStatus.switchUseItem(item);
                    setIsItemWindowOpen(false);
                    reduceItemAmount(item.id);

                    setItems((prev) =>
                      prev.map((i) =>
                        i.id === item.id
                          ? { ...i, quantity: (i.quantity ?? 0) - 1 }
                          : i
                      )
                    );
                  }}
                >
                  <span className="truncate pr-2">{item.name}</span>
                  <span className="text-right text-indigo-100">
                    x{item.quantity}
                  </span>
                </Button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                className="border-2 border-indigo-200/60 bg-indigo-600/40 text-indigo-100 hover:bg-indigo-500/60"
                onClick={() => setIsItemWindowOpen(false)}
              >
                とじる
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
