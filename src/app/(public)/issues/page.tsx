import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  CirclePlus,
  Inbox,
  SearchCheck,
} from "lucide-react";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  getIssues,
} from "@/lib/api/issues.api";

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
  PublicIssuesFilter,
} from "../_components/public-issues-filter";

import {
  PublicIssueCard,
} from "../_components/public-issue-card";

import {
  PublicIssuePagination,
} from "../_components/public-issue-pagination";

export const metadata: Metadata = {
  title: "Explore Issues",
  description:
    "Browse bugs and feature requests reported through TrackForge.",
};

interface IssuesPageProps {
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
  const page = Number(value);

  if (
    !Number.isInteger(page) ||
    page < 1
  ) {
    return 1;
  }

  return page;
}

export default async function IssuesPage({
  searchParams,
}: IssuesPageProps) {
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

  const filters: IssueFilters = {
    search,
    type,
    status,
    sort,
    page,
    limit: 9,
  };

  const response =
    await getIssues(
      undefined,
      filters,
    );

  const issues =
    response.data ?? [];

  const meta =
    response.meta ?? {
      page,
      limit: 9,
      total: issues.length,
      totalPages: 1,
    };

  const hasFilters =
    Boolean(search) ||
    Boolean(type) ||
    Boolean(status) ||
    sort !== "newest";

  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-brand-soft/60 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-brand">
              <SearchCheck className="size-4" />
              Public issue tracker
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Explore what&apos;s
              being reported,
              improved, and
              resolved.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Browse bugs and
              feature requests,
              follow their
              progress, and see
              what the TrackForge
              community is working
              on.
            </p>

            <div className="mt-7">
              <Link
                href={
                  ROUTES.createIssue
                }
                className={buttonVariants(
                  {
                    variant:
                      "default",
                  },
                )}
              >
                <CirclePlus />
                Report an Issue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explorer */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <PublicIssuesFilter
          search={search}
          type={type}
          status={status}
          sort={sort}
        />

        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {meta.total}
            </span>{" "}
            {meta.total === 1
              ? "issue"
              : "issues"}
            {hasFilters
              ? " matched your filters"
              : " available"}
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

        {issues.length > 0 ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {issues.map(
              (issue) => (
                <PublicIssueCard
                  key={
                    issue.id
                  }
                  issue={
                    issue
                  }
                />
              ),
            )}
          </div>
        ) : (
          <div className="mt-5 flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Inbox className="size-5 text-muted-foreground" />
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              {hasFilters
                ? "No matching issues"
                : "No issues yet"}
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              {hasFilters
                ? "Try changing or clearing your search and filters."
                : "There are no reported issues yet. Be the first to submit one."}
            </p>

            {hasFilters ? (
              <Link
                href={ROUTES.issues}
                className={`${buttonVariants(
                  {
                    variant:
                      "outline",
                  },
                )} mt-5`}
              >
                Clear Filters
              </Link>
            ) : (
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
                Report Issue
              </Link>
            )}
          </div>
        )}

        <div className="mt-8">
          <PublicIssuePagination
            currentPage={
              meta.page
            }
            totalPages={
              meta.totalPages
            }
            filters={filters}
          />
        </div>
      </section>
    </main>
  );
}