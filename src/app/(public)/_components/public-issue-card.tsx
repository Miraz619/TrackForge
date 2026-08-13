import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  UserRound,
} from "lucide-react";

import {
  IssueTypeBadge,
} from "@/components/shared/issue-type-badge";

import {
  StatusBadge,
} from "@/components/shared/status-badge";

import {
  ROUTE_BUILDERS,
} from "@/lib/constants/routes";

import type {
  Issue,
} from "@/types";

interface PublicIssueCardProps {
  issue: Issue;
}

function formatDate(
  value: string,
) {
  return new Intl.DateTimeFormat(
    "en",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(new Date(value));
}

export function PublicIssueCard({
  issue,
}: PublicIssueCardProps) {
  return (
    <Link
      href={
        ROUTE_BUILDERS.issueDetails(
          issue.id,
        )
      }
      className="group block rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-md hover:shadow-black/[0.04] sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <IssueTypeBadge
            type={issue.type}
          />

          <StatusBadge
            status={
              issue.status
            }
          />
        </div>

        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
      </div>

      <h2 className="mt-4 text-lg font-semibold tracking-tight transition-colors group-hover:text-brand">
        {issue.title}
      </h2>

      <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
        {issue.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4 text-xs text-muted-foreground">
        <span className="font-medium">
          #{issue.id}
        </span>

        <div className="flex items-center gap-1.5">
          <UserRound className="size-3.5" />

          <span>
            {issue.reporter.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />

          <span>
            {formatDate(
              issue.created_at,
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}