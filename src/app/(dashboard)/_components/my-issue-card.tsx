import Link from "next/link";

import {
  CalendarDays,
  Eye,
  Hash,
  Pencil,
} from "lucide-react";

import {
  buttonVariants,
} from "@/components/ui/button";

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

interface MyIssueCardProps {
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
  ).format(
    new Date(value),
  );
}

export function MyIssueCard({
  issue,
}: MyIssueCardProps) {
  const canEdit =
    issue.status === "open";

  return (
    <article className="group rounded-xl border bg-card p-5 transition-all hover:border-brand/20 hover:shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <IssueTypeBadge
              type={
                issue.type
              }
            />

            <StatusBadge
              status={
                issue.status
              }
            />
          </div>

          <Link
            href={
              ROUTE_BUILDERS.issueDetails(
                issue.id,
              )
            }
          >
            <h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-brand">
              {issue.title}
            </h2>
          </Link>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {
              issue.description
            }
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <Link
            href={
              ROUTE_BUILDERS.issueDetails(
                issue.id,
              )
            }
            aria-label="View issue"
            title="View issue"
            className={buttonVariants({
              variant: "outline",
              size: "icon",
            })}
          >
            <Eye />
          </Link>

          {canEdit && (
            <Link
              href={
                ROUTE_BUILDERS.editMyIssue(
                  issue.id,
                )
              }
              aria-label="Edit issue"
              title="Edit issue"
              className={buttonVariants({
                variant:
                  "outline",
                size: "icon",
              })}
            >
              <Pencil />
            </Link>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Hash className="size-3.5" />

          <span>
            Issue {issue.id}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />

          <span>
            Created{" "}
            {formatDate(
              issue.created_at,
            )}
          </span>
        </div>

        {issue.updated_at !==
          issue.created_at && (
          <span>
            Updated{" "}
            {formatDate(
              issue.updated_at,
            )}
          </span>
        )}
      </div>
    </article>
  );
}