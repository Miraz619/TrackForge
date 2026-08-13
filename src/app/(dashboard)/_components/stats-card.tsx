import type {
  LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;

  tone?:
    | "brand"
    | "open"
    | "progress"
    | "resolved"
    | "neutral";
}

const toneStyles = {
  brand:
    "bg-brand-soft text-brand",

  open:
    "bg-status-open-soft text-status-open",

  progress:
    "bg-status-progress-soft text-status-progress",

  resolved:
    "bg-status-resolved-soft text-status-resolved",

  neutral:
    "bg-muted text-foreground",
};

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "neutral",
}: StatsCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm shadow-black/[0.02]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <p className="mt-3 text-3xl font-semibold tracking-tight">
            {value}
          </p>
        </div>

        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-lg",
            toneStyles[tone],
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}