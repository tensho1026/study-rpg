"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { AppSidebar } from "./app-sidebar"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
          <Button
            variant="ghost"
            size="sm"
            className="border border-border bg-muted/30 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground hover:bg-primary hover:text-primary-foreground"
            onClick={openSidebar}
          >
            MENU
          </Button>
          <div className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Study Quest</div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-10 pt-6 md:px-6 lg:px-8">
        {children}
      </main>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-300",
          isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={closeSidebar}
      />

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 max-w-[92vw] -translate-x-full transform transition-transform duration-300 ease-in-out",
          isSidebarOpen && "translate-x-0",
        )}
      >
        <div className="flex h-full flex-col bg-background shadow-xl ring-1 ring-border">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm font-semibold text-card-foreground">メニュー</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary"
              onClick={closeSidebar}
            >
              CLOSE
            </Button>
          </div>
          <AppSidebar
            className="h-full overflow-y-auto"
            contentClassName="m-0 h-full p-6"
            onNavigate={closeSidebar}
          />
        </div>
      </div>
    </div>
  )
}
