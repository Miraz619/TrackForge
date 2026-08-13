import type {
  IssueStatus,
} from "@/types";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: IssueStatus;
  className?: string;
}

const statusConfig = {
  open: {
    label: "Open",

    className:
      "bg-status-open-soft text-status-open",
  },

  in_progress: {
    label: "In Progress",

    className:
      "bg-status-progress-soft text-status-progress",
  },

  resolved: {
    label: "Resolved",

    className:
      "bg-status-resolved-soft text-status-resolved",
  },
} satisfies Record<
  IssueStatus,
  {
    label: string;
    className: string;
  }
>;

export function StatusBadge({
  status,
  className,
}: StatusBadgeProps) {
  const config =
    statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}