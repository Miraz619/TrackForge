"use client";

import { LogOut } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

import { logoutAction } from "@/app/(auth)/_actions/logout.action";

import type { User } from "@/types";

import { DashboardNav } from "./dashboard-nav";

interface AppSidebarProps {
  user: User;
  onNavigate?: () => void;
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function AppSidebar({
  user,
  onNavigate,
}: AppSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-5">
        <Logo />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>

        <DashboardNav
          role={user.role}
          onNavigate={onNavigate}
        />
      </div>

      <div className="border-t p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-muted/60 p-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
            {getInitials(user.name)}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {user.name}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <form action={logoutAction}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}