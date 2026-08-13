import Link from "next/link";

import {
  ArrowUpRight,
  Inbox,
} from "lucide-react";

import type {
  Issue,
} from "@/types";

import { StatusBadge } from "@/components/shared/status-badge";
import { IssueTypeBadge } from "@/components/shared/issue-type-badge";

interface RecentIssuesProps {
  issues: Issue[];
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

export function RecentIssues({
  issues,
}: RecentIssuesProps) {
  if (issues.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center">
        <div className="flex size-11 items-center justify-center rounded-full bg-muted">
          <Inbox className="size-5 text-muted-foreground" />
        </div>

        <h3 className="mt-4 font-medium">
          No issues yet
        </h3>

        <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
          Issues will appear here
          once they are reported.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {issues.map((issue) => (
        <Link
          key={issue.id}
          href={`/issues/${issue.id}`}
          className="group flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <IssueTypeBadge
                type={issue.type}
              />

              <StatusBadge
                status={
                  issue.status
                }
              />
            </div>

            <h3 className="truncate font-medium group-hover:text-brand">
              {issue.title}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              #{issue.id} ·{" "}
              {formatDate(
                issue.created_at,
              )}
            </p>
          </div>

          <ArrowUpRight className="hidden size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand sm:block" />
        </Link>
      ))}
    </div>
  );
}