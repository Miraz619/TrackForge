"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Menu,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  ThemeToggle,
} from "@/components/shared/theme-toggle";

import type {
  User,
} from "@/types";

import {
  AppSidebar,
} from "./app-sidebar";

interface DashboardHeaderProps {
  user: User;
}

function getInitials(
  name: string,
) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      (part) =>
        part[0],
    )
    .join("")
    .toUpperCase();
}

export function DashboardHeader({
  user,
}: DashboardHeaderProps) {
  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        setMobileOpen(
          false,
        );
      }
    };

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation"
            aria-expanded={
              mobileOpen
            }
            onClick={() =>
              setMobileOpen(
                true,
              )
            }
          >
            <Menu className="size-5" />
          </Button>

          <div>
            <p className="text-sm font-semibold">
              TrackForge
            </p>

            <p className="hidden text-xs text-muted-foreground sm:block">
              Developer workspace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <div className="hidden text-right sm:block">
            <p className="max-w-48 truncate text-sm font-medium">
              {user.name}
            </p>

            <div className="flex items-center justify-end gap-1 text-xs capitalize text-muted-foreground">
              {user.role ===
              "maintainer" ? (
                <ShieldCheck className="size-3" />
              ) : (
                <UserRound className="size-3" />
              )}

              {user.role}
            </div>
          </div>

          <div className="flex size-9 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
            {getInitials(
              user.name,
            )}
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() =>
              setMobileOpen(
                false,
              )
            }
          />

          <aside className="absolute inset-y-0 left-0 w-[290px] max-w-[85vw] border-r bg-background shadow-xl">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 z-10"
              aria-label="Close navigation"
              onClick={() =>
                setMobileOpen(
                  false,
                )
              }
            >
              <X className="size-5" />
            </Button>

            <AppSidebar
              user={user}
              onNavigate={() =>
                setMobileOpen(
                  false,
                )
              }
            />
          </aside>
        </div>
      )}
    </>
  );
}