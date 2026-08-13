"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

import { dashboardNavigation } from "../_config/navigation";

interface DashboardNavProps {
  role: UserRole;
  onNavigate?: () => void;
}

export function DashboardNav({
  role,
  onNavigate,
}: DashboardNavProps) {
  const pathname = usePathname();

  const items = dashboardNavigation.filter(
    (item) =>
      !item.roles ||
      item.roles.includes(role),
  );

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;

        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" &&
            pathname.startsWith(
              `${item.href}/`,
            ));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />

            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}