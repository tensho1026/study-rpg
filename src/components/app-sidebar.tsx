"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowRight,
  BookOpenCheck,
  Home,
  LucideIcon,
  Shield,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sideMenu: Array<{
  label: string;
  icon: LucideIcon;
  href: string;
}> = [
  { label: "ホーム", icon: Home, href: "/home" },
  { label: "図書館", icon: BookOpenCheck, href: "/library" },
  { label: "ショップ", icon: ShoppingBag, href: "/shop" },
  { label: "装備", icon: Shield, href: "/equipment" },
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
        <div className="rpg-window bg-card p-4 md:p-6 space-y-6 w-full">
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase">
              Menu
            </p>
            <h2 className="text-lg text-card-foreground">冒険メニュー</h2>
          </div>

          <nav>
            <ul className="space-y-3 list-none m-0 p-0">
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
                        "flex w-full items-center justify-between rounded-xl border px-4 py-4 text-left transition",
                        isActive
                          ? "border-cyan-400/60 bg-cyan-500/20 text-white shadow-[0_0_18px_rgba(14,165,233,0.25)]"
                          : "border-white/5 bg-white/5 text-white/70 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
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
                          <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/10">
                            <Icon className="size-4" />
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

          <div className="pt-4 border-t border-border">
            <Button
              variant="destructive"
              className="w-full text-xs md:text-sm py-3"
              onClick={() => {
                onNavigate?.();
                // TODO: implement logout action
              }}
            >
              ログアウト
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
