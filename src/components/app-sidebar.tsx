"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MENU_ITEMS = [
  { label: "ホーム", href: "/home" },
  { label: "冒険の書", href: "/journal" },
  { label: "ショップ", href: "/shop" },
  { label: "装備", href: "/equipment" },
] as const

interface AppSidebarProps {
  className?: string
  contentClassName?: string
  onNavigate?: () => void
}

export function AppSidebar({ className, contentClassName, onNavigate }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn("w-full md:w-64 lg:w-72 md:min-h-screen md:max-w-sm", className)}>
      <div className={cn("m-4 md:m-6 md:sticky md:top-6", contentClassName)}>
        <div className="rpg-window bg-card p-4 md:p-6 space-y-6 w-full">
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase">Menu</p>
            <h2 className="text-lg text-card-foreground">冒険メニュー</h2>
          </div>

          <nav className="space-y-2">
            {MENU_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  onClick={onNavigate}
                  className={cn(
                    "w-full justify-start bg-muted/40 text-muted-foreground hover:bg-primary hover:text-primary-foreground text-xs md:text-sm px-3 py-3 md:py-4 border-2 border-border",
                    isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    <span className="text-accent">▶</span>
                    <span>{item.label}</span>
                  </Link>
                </Button>
              )
            })}
          </nav>

          <div className="pt-4 border-t border-border">
            <Button
              variant="destructive"
              className="w-full text-xs md:text-sm py-3"
              onClick={() => {
                onNavigate?.()
                // TODO: implement logout action
              }}
            >
              ログアウト
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
