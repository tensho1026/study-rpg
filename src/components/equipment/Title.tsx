import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

function Title() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl md:text-4xl text-foreground mb-2">装備管理</h1>
        <p className="text-xs md:text-sm text-muted-foreground">EQUIPMENT</p>
      </div>
      <Link href="/home">
        <Button className="rpg-button bg-secondary text-secondary-foreground hover:bg-secondary/90">
          戻る
        </Button>
      </Link>
    </div>
  );
}

export default Title;
