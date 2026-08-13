import type {
  Metadata,
} from "next";

import {
  redirect,
} from "next/navigation";

import {
  Inbox,
  ShieldCheck,
} from "lucide-react";

import {
  getIssues,
} from "@/lib/api/issues.api";

import {
  getAuthenticatedSession,
} from "@/lib/auth/session-user";

import {
  ROUTES,
} from "@/lib/constants/routes";

import type {
  IssueFilters,
  IssueSort,
  IssueStatus,
  IssueType,
} from "@/types";

import {
  ManageIssuesFilter,
} from "../_components/manage-issues-filter";

import {
  ManageIssueCard,
} from "../_components/manage-issue-card";

import {
  IssuePagination,
} from "../_components/issue-pagination";

export const metadata: Metadata = {
  title: "Manage Issues",
  description:
    "Review and manage TrackForge workspace issues.",
};

interface ManageIssuesPageProps {
  searchParams: Promise<{
    search?: string;
    type?: string;
    status?: string;
    sort?: string;
    page?: string;
  }>;
}

function parseIssueType(
  value?: string,
): IssueType | undefined {
  if (
    value === "bug" ||
    value === "feature_request"
  ) {
    return value;
  }

  return undefined;
}

function parseIssueStatus(
  value?: string,
): IssueStatus | undefined {
  if (
    value === "open" ||
    value === "in_progress" ||
    value === "resolved"
  ) {
    return value;
  }

  return undefined;
}

function parseIssueSort(
  value?: string,
): IssueSort {
  return value === "oldest"
    ? "oldest"
    : "newest";
}

function parsePage(
  value?: string,
) {
  const page =
    Number(value);

  if (
    !Number.isInteger(page) ||
    page < 1
  ) {
    return 1;
  }

  return page;
}

export default async function ManageIssuesPage({
  searchParams,
}: ManageIssuesPageProps) {
  const session =
    await getAuthenticatedSession();

  if (!session) {
    redirect(ROUTES.login);
  }

  if (
    session.user.role !==
    "maintainer"
  ) {
    redirect(
      ROUTES.dashboard,
    );
  }

  const params =
    await searchParams;

  const search =
    params.search
      ?.trim()
      .slice(0, 100) ||
    undefined;

  const type =
    parseIssueType(
      params.type,
    );

  const status =
    parseIssueStatus(
      params.status,
    );

  const sort =
    parseIssueSort(
      params.sort,
    );

  const page =
    parsePage(
      params.page,
    );

  const filters: IssueFilters =
    {
      search,
      type,
      status,
      sort,
      page,
      limit: 8,
    };

  const response =
    await getIssues(
      session.accessToken,
      filters,
    );

  const issues =
    response.data ?? [];

  const meta =
    response.meta ?? {
      page,
      limit: 8,
      total: issues.length,
      totalPages: 1,
    };

  const hasFilters =
    Boolean(search) ||
    Boolean(type) ||
    Boolean(status) ||
    sort !== "newest";

  return (
    <div className="space-y-7">
      {/* Header */}
      <section>
        <div className="flex items-center gap-2 text-sm font-medium text-brand">
          <ShieldCheck className="size-4" />
          Maintainer workspace
        </div>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Manage Issues
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Review reports across
          the workspace, update
          their progress, and
          remove issues when
          necessary.
        </p>
      </section>

      {/* Filters */}
      <ManageIssuesFilter
        search={search}
        type={type}
        status={status}
        sort={sort}
      />

      {/* Summary */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {meta.total}
          </span>{" "}
          {meta.total === 1
            ? "issue"
            : "issues"}
          {hasFilters
            ? " matched the current filters"
            : " across the workspace"}
        </p>

        {meta.total > 0 && (
          <p className="text-xs text-muted-foreground">
            Page {meta.page} of{" "}
            {Math.max(
              meta.totalPages,
              1,
            )}
          </p>
        )}
      </div>

      {/* Issues */}
      {issues.length > 0 ? (
        <section className="space-y-4">
          {issues.map(
            (issue) => (
              <ManageIssueCard
                key={
                  issue.id
                }
                issue={
                  issue
                }
              />
            ),
          )}
        </section>
      ) : (
        <section className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Inbox className="size-5 text-muted-foreground" />
          </div>

          <h2 className="mt-5 text-lg font-semibold">
            {hasFilters
              ? "No matching issues"
              : "No issues found"}
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {hasFilters
              ? "Try changing or clearing the current filters."
              : "Workspace issues will appear here when contributors submit them."}
          </p>
        </section>
      )}

      <IssuePagination
        currentPage={
          meta.page
        }
        totalPages={
          meta.totalPages
        }
        filters={filters}
        basePath={
          ROUTES.manageIssues
        }
      />
    </div>
  );
}