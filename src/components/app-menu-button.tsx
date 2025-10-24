"use client";

import { ReactNode, useCallback, useState } from "react";

import { Menu } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<typeof Button>;

interface AppMenuButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
  iconClassName?: string;
  sidebarClassName?: string;
  sidebarContentClassName?: string;
  triggerLabel?: string;
  children?: ReactNode;
  onClick?: ButtonProps["onClick"];
}

export function AppMenuButton({
  className,
  iconClassName,
  sidebarClassName,
  sidebarContentClassName,
  triggerLabel = "メニューを開く",
  onClick,
  children,
  ...buttonProps
}: AppMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = useCallback(() => setIsOpen(true), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);

  const handleTriggerClick: ButtonProps["onClick"] = (event) => {
    openSidebar();
    onClick?.(event);
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={triggerLabel}
        className={cn(
          "h-12 w-12 rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white",
          className
        )}
        onClick={handleTriggerClick}
        {...buttonProps}
      >
        {children ?? <Menu className={cn("size-6", iconClassName)} />}
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-300",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={closeSidebar}
        aria-hidden={!isOpen}
      />

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 max-w-[92vw] -translate-x-full transform transition-transform duration-300 ease-in-out",
          isOpen && "translate-x-0"
        )}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-label="アプリメニュー"
        aria-hidden={!isOpen}
      >
        <div className="flex h-full flex-col bg-background shadow-xl ring-1 ring-border">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm font-semibold text-card-foreground">
              メニュー
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary"
              onClick={closeSidebar}
            >
              CLOSE
            </Button>
          </div>
          <AppSidebar
            className={cn(
              "flex h-full flex-1 flex-col justify-center overflow-y-auto",
              sidebarClassName
            )}
            contentClassName={cn("m-0 h-auto p-6", sidebarContentClassName)}
            onNavigate={closeSidebar}
          />
        </div>
      </div>
    </>
  );
}
