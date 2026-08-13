import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  CirclePlus,
  Inbox,
} from "lucide-react";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  getAuthenticatedSession,
} from "@/lib/auth/session-user";

import {
  getMyIssues,
} from "@/lib/api/issues.api";

import {
  ROUTES,
} from "@/lib/constants/routes";

import {
  MyIssuesFilter,
} from "../_components/my-issues-filter";

import {
  MyIssueCard,
} from "../_components/my-issue-card";

import {
  IssuePagination,
} from "../_components/issue-pagination";

import type {
  IssueFilters,
  IssueSort,
  IssueStatus,
  IssueType,
} from "@/types";

export const metadata: Metadata = {
  title: "My Issues",
  description:
    "Search, filter, and track your reported TrackForge issues.",
};

interface MyIssuesPageProps {
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
  if (value === "oldest") {
    return "oldest";
  }

  return "newest";
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

export default async function MyIssuesPage({
  searchParams,
}: MyIssuesPageProps) {
  const session =
    await getAuthenticatedSession();

  if (!session) {
    return null;
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
      limit: 6,
    };

  const response =
    await getMyIssues(
      session.accessToken,
      filters,
    );

  const issues =
    response.data ?? [];

  const meta =
    response.meta ?? {
      page,
      limit: 6,
      total: issues.length,
      totalPages: 1,
    };

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(type) ||
    Boolean(status) ||
    sort !== "newest";

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand">
            Contributor workspace
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            My Issues
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Review the bugs and
            feature requests
            you&apos;ve submitted
            and follow their current
            progress.
          </p>
        </div>

        <Link
          href={
            ROUTES.createIssue
          }
          className={buttonVariants({
            variant: "default",
          })}
        >
          <CirclePlus />
          New Issue
        </Link>
      </section>

      {/* Filters */}
      <MyIssuesFilter
        search={search}
        type={type}
        status={status}
        sort={sort}
      />

      {/* Results summary */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {meta.total}
          </span>{" "}
          {meta.total === 1
            ? "issue"
            : "issues"}
          {hasActiveFilters
            ? " matched your filters"
            : " reported by you"}
        </p>

        {meta.total > 0 && (
          <p className="text-xs text-muted-foreground">
            Showing page{" "}
            {meta.page} of{" "}
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
              <MyIssueCard
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
            {hasActiveFilters
              ? "No matching issues"
              : "No issues yet"}
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {hasActiveFilters
              ? "Try changing or clearing your search and filters."
              : "You haven't reported any issues yet. Create your first bug report or feature request."}
          </p>

          {!hasActiveFilters && (
            <Link
              href={
                ROUTES.createIssue
              }
              className={`${buttonVariants(
                {
                  variant:
                    "default",
                },
              )} mt-5`}
            >
              <CirclePlus />
              Create Issue
            </Link>
          )}

          {hasActiveFilters && (
            <Link
              href={
                ROUTES.myIssues
              }
              className={`${buttonVariants(
                {
                  variant:
                    "outline",
                },
              )} mt-5`}
            >
              Clear Filters
            </Link>
          )}
        </section>
      )}

      {/* Pagination */}
    <IssuePagination
  currentPage={meta.page}
  totalPages={meta.totalPages}
  filters={filters}
  basePath={ROUTES.myIssues}
/>
    </div>
  );
}