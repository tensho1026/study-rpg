import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function ItemShopFooter() {
  return (
    <footer className="flex justify-end">
      <Button
        asChild
        variant="outline"
        className="border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold text-white hover:bg-white/10"
      >
        <Link href="/home">ホームへ戻る</Link>
      </Button>
    </footer>
  );
}

export default ItemShopFooter;
