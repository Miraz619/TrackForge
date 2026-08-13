import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  buttonVariants,
} from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants/routes";

import type {
  IssueFilters,
} from "@/types";

interface IssuePaginationProps {
  currentPage: number;
  totalPages: number;
  filters: IssueFilters;
}

function createPageHref(
  page: number,
  filters: IssueFilters,
) {
  const params =
    new URLSearchParams();

  if (filters.search) {
    params.set(
      "search",
      filters.search,
    );
  }

  if (filters.type) {
    params.set(
      "type",
      filters.type,
    );
  }

  if (filters.status) {
    params.set(
      "status",
      filters.status,
    );
  }

  if (
    filters.sort &&
    filters.sort !== "newest"
  ) {
    params.set(
      "sort",
      filters.sort,
    );
  }

  if (page > 1) {
    params.set(
      "page",
      String(page),
    );
  }

  const query =
    params.toString();

  return query
    ? `${ROUTES.myIssues}?${query}`
    : ROUTES.myIssues;
}

export function IssuePagination({
  currentPage,
  totalPages,
  filters,
}: IssuePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const hasPrevious =
    currentPage > 1;

  const hasNext =
    currentPage <
    totalPages;

  return (
    <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Page{" "}
        <span className="font-medium text-foreground">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-medium text-foreground">
          {totalPages}
        </span>
      </p>

      <div className="flex items-center gap-2">
        {hasPrevious ? (
          <Link
            href={createPageHref(
              currentPage - 1,
              filters,
            )}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
            })}
          >
            <ChevronLeft />
            Previous
          </Link>
        ) : (
          <span
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "pointer-events-none opacity-50",
            )}
          >
            <ChevronLeft />
            Previous
          </span>
        )}

        {hasNext ? (
          <Link
            href={createPageHref(
              currentPage + 1,
              filters,
            )}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
            })}
          >
            Next
            <ChevronRight />
          </Link>
        ) : (
          <span
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "pointer-events-none opacity-50",
            )}
          >
            Next
            <ChevronRight />
          </span>
        )}
      </div>
    </div>
  );
}