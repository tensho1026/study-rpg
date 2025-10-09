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
    <div className="min-h-screen bg-background text-foreground">
      <div className="md:hidden sticky top-0 z-40 border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            className="border border-border bg-muted/30 text-xs font-semibold hover:bg-primary hover:text-primary-foreground"
            onClick={openSidebar}
          >
            MENU
          </Button>
          <div className="text-xs text-muted-foreground tracking-[0.4em] uppercase">Study Quest</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-0px)]">
        <div className="hidden md:flex md:flex-col md:shrink-0">
          <AppSidebar />
        </div>
        <div className="flex-1 w-full">{children}</div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden",
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "pointer-events-none opacity-0",
        )}
        onClick={closeSidebar}
      />

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[90%] translate-x-[-100%] transform transition-transform duration-300 md:hidden",
          isSidebarOpen && "translate-x-0",
        )}
      >
        <div className="flex h-full flex-col bg-background shadow-xl ring-1 ring-border">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm text-card-foreground">メニュー</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-primary hover:bg-primary/20"
              onClick={closeSidebar}
            >
              CLOSE
            </Button>
          </div>
          <AppSidebar
            className="h-full overflow-y-auto"
            contentClassName="m-0 h-full p-6 flex items-center justify-center"
            onNavigate={closeSidebar}
          />
        </div>
      </div>
    </div>
  )
}
