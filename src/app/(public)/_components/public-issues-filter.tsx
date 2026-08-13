import Form from "next/form";

import Link from "next/link";

import {
  RotateCcw,
  Search,
} from "lucide-react";

import {
  Button,
  buttonVariants,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  ROUTES,
} from "@/lib/constants/routes";

import type {
  IssueSort,
  IssueStatus,
  IssueType,
} from "@/types";

interface PublicIssuesFilterProps {
  search?: string;
  type?: IssueType;
  status?: IssueStatus;
  sort?: IssueSort;
}

export function PublicIssuesFilter({
  search,
  type,
  status,
  sort = "newest",
}: PublicIssuesFilterProps) {
  const hasFilters =
    Boolean(search) ||
    Boolean(type) ||
    Boolean(status) ||
    sort !== "newest";

  return (
    <Form
      action={ROUTES.issues}
      className="rounded-xl border bg-card p-4 shadow-sm shadow-black/[0.02] sm:p-5"
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_180px_180px_160px_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Search issues..."
            className="pl-9"
          />
        </div>

        <select
          name="type"
          defaultValue={type ?? ""}
          aria-label="Filter by issue type"
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20"
        >
          <option value="">
            All types
          </option>

          <option value="bug">
            Bugs
          </option>

          <option value="feature_request">
            Feature Requests
          </option>
        </select>

        <select
          name="status"
          defaultValue={
            status ?? ""
          }
          aria-label="Filter by status"
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20"
        >
          <option value="">
            All statuses
          </option>

          <option value="open">
            Open
          </option>

          <option value="in_progress">
            In Progress
          </option>

          <option value="resolved">
            Resolved
          </option>
        </select>

        <select
          name="sort"
          defaultValue={sort}
          aria-label="Sort issues"
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20"
        >
          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>
        </select>

        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1 lg:flex-none"
          >
            <Search />
            Apply
          </Button>

          {hasFilters && (
            <Link
              href={ROUTES.issues}
              title="Clear filters"
              aria-label="Clear filters"
              className={buttonVariants(
                {
                  variant:
                    "outline",
                  size: "icon",
                },
              )}
            >
              <RotateCcw />
            </Link>
          )}
        </div>
      </div>
    </Form>
  );
}