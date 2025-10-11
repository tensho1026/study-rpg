"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const { data } = useSession();

  const router = useRouter();

  const handleClick = () => {
    if (data) {
      router.push("/home");
    } else {
      router.push("/auth/signin");
    }
  };
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl text-foreground mb-4 text-balance">
            勉強クエスト
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            STUDY QUEST RPG
          </p>
        </div>

        {/* Main Window */}
        <Card className="rpg-window bg-card p-8 md:p-12">
          <div className="space-y-8">
            {/* Hero Character */}
            <div className="flex justify-center">
              <div className="text-8xl md:text-9xl">🧙‍♂️</div>
            </div>

            {/* Features */}
            <div className="space-y-4 text-card-foreground">
              <div className="flex items-start gap-3">
                <span className="text-xl">⚔️</span>
                <div>
                  <h3 className="text-sm md:text-base font-bold mb-1">
                    勉強時間を記録
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    勉強した時間を入力して経験値とコインを獲得
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">📈</span>
                <div>
                  <h3 className="text-sm md:text-base font-bold mb-1">
                    レベルアップ
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    経験値を貯めてレベルを上げよう
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">🛡️</span>
                <div>
                  <h3 className="text-sm md:text-base font-bold mb-1">
                    装備を強化
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    コインで武器や防具を購入して強くなろう
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                className="rpg-button w-full py-4 text-base md:text-lg"
                onClick={handleClick}
              >
                ▶ 冒険を始める
              </Button>
            </div>

            {/* Auth Links */}
            <div className="flex justify-center gap-4 text-xs md:text-sm pt-2">
              <Link
                href="/auth/login"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ログイン
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link
                href="/auth/signup"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                新規登録
              </Link>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          勉強を冒険に変えよう
        </p>
      </div>
    </main>
  );
}
