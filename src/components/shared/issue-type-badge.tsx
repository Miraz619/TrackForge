import {
  Bug,
  Sparkles,
} from "lucide-react";

import type {
  IssueType,
} from "@/types";

import { cn } from "@/lib/utils";

interface IssueTypeBadgeProps {
  type: IssueType;
  className?: string;
}

export function IssueTypeBadge({
  type,
  className,
}: IssueTypeBadgeProps) {
  const isBug = type === "bug";

  const Icon = isBug
    ? Bug
    : Sparkles;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",

        isBug
          ? "bg-issue-bug-soft text-issue-bug"
          : "bg-issue-feature-soft text-issue-feature",

        className,
      )}
    >
      <Icon className="size-3" />

      {isBug
        ? "Bug"
        : "Feature"}
    </span>
  );
}