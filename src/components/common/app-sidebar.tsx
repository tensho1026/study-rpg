"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowRight,
  BookOpenCheck,
  Coins,
  Compass,
  Home,
  LucideIcon,
  Shield,
  ShoppingBag,
  Swords,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const sideMenu: Array<{
  label: string;
  icon: LucideIcon;
  href: string;
}> = [
  { label: "ホーム", icon: Home, href: "/home" },
  { label: "勉強記録", icon: BookOpenCheck, href: "/journal" },
  { label: "装備屋", icon: ShoppingBag, href: "/shop" },
  { label: "装備", icon: Shield, href: "/equipment" },
  { label: "戦闘", icon: Swords, href: "/battle" },
  { label: "冒険", icon: Compass, href: "/map" },
  { label: "アイテムショップ", icon: Coins, href: "/itemShop" },
] as const;

interface AppSidebarProps {
  className?: string;
  contentClassName?: string;
  onNavigate?: () => void;
}

export function AppSidebar({
  className,
  contentClassName,
  onNavigate,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("w-full max-w-sm", className)}>
      <div className={cn("m-4", contentClassName)}>
        <div className="rpg-window flex w-full min-h-[26rem] flex-col gap-8 rounded-2xl border border-white/15 bg-slate-900/80 px-5 py-8 shadow-[0_25px_60px_rgba(15,23,42,0.35)] backdrop-blur md:min-h-[30rem] md:gap-10 md:px-8 md:py-12 lg:min-h-[32rem] lg:gap-12">
          <div className="text-center space-y-2">
            <p className="text-xs text-slate-200/80 tracking-[0.3em] uppercase">
              Menu
            </p>
            <h2 className="text-xl font-semibold text-white">冒険メニュー</h2>
          </div>

          <nav className="flex-1">
            <ul className="m-0 flex h-full flex-col justify-center gap-4 list-none p-0">
              {sideMenu.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(`${item.href}/`));

                return (
                  <li key={item.label}>
                    <Button
                      asChild
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl border px-5 py-5 text-left transition",
                        isActive
                          ? "border-cyan-300/70 bg-cyan-400/25 text-white shadow-[0_0_22px_rgba(34,211,238,0.35)]"
                          : "border-white/20 bg-white/10 text-white/85 hover:border-cyan-300/60 hover:bg-cyan-400/20 hover:text-white"
                      )}
                    >
                      <Link
                        href={item.href}
                        onClick={() => {
                          onNavigate?.();
                        }}
                        className="flex w-full items-center justify-between"
                      >
                        <span className="flex items-center gap-3">
                          <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/20">
                            <Icon className="size-5" />
                          </span>
                          {item.label}
                        </span>
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-border pt-6">
            <Button
              variant="destructive"
              className="w-full py-4 text-sm font-semibold"
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            >
              ログアウト
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
