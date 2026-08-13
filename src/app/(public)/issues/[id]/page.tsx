import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Hash,
  Pencil,
  UserRound,
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
  ApiError,
} from "@/lib/api/api-error";

import {
  getIssue,
} from "@/lib/api/issues.api";

import {
  getAuthenticatedSession,
} from "@/lib/auth/session-user";

import {
  ROUTES,
  ROUTE_BUILDERS,
} from "@/lib/constants/routes";

interface IssueDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Issue Details",
};

function formatDate(
  value: string,
) {
  return new Intl.DateTimeFormat(
    "en",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  ).format(
    new Date(value),
  );
}

export default async function IssueDetailsPage({
  params,
}: IssueDetailsPageProps) {
  const { id: rawId } =
    await params;

  const issueId =
    Number(rawId);

  if (
    !Number.isInteger(
      issueId,
    ) ||
    issueId < 1
  ) {
    notFound();
  }

  const session =
    await getAuthenticatedSession();

  let issue;

  try {
    const response =
      await getIssue(
        issueId,
        session?.accessToken,
      );

    issue =
      response.data;
  } catch (error) {
    if (
      error instanceof
        ApiError &&
      error.status === 404
    ) {
      notFound();
    }

    throw error;
  }

  if (!issue) {
    notFound();
  }

  const canEdit =
    Boolean(session) &&
    session?.user.id ===
      issue.reporter.id &&
    issue.status === "open";

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={
              session
                ? ROUTES.myIssues
                : ROUTES.login
            }
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
            })}
          >
            <ArrowLeft />
            {session
              ? "Back to My Issues"
              : "Sign in"}
          </Link>

          {canEdit && (
            <Link
              href={
                ROUTE_BUILDERS.editMyIssue(
                  issue.id,
                )
              }
              className={buttonVariants({
                variant:
                  "outline",
                size: "sm",
              })}
            >
              <Pencil />
              Edit Issue
            </Link>
          )}
        </div>

        {/* Main content */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="rounded-xl border bg-card p-5 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
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

            <div className="mt-5">
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Hash className="size-4" />
                Issue {issue.id}
              </p>

              <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                {issue.title}
              </h1>
            </div>

            <div className="mt-7 border-t pt-7">
              <h2 className="text-sm font-semibold">
                Description
              </h2>

              <div className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-muted-foreground sm:text-base">
                {
                  issue.description
                }
              </div>
            </div>
          </article>

          {/* Metadata */}
          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-5">
              <h2 className="text-sm font-semibold">
                Issue details
              </h2>

              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <UserRound className="size-3.5" />
                    Reporter
                  </dt>

                  <dd className="mt-1.5 text-sm font-medium">
                    {
                      issue.reporter
                        .name
                    }
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    Created
                  </dt>

                  <dd className="mt-1.5 text-sm leading-6">
                    {formatDate(
                      issue.created_at,
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <Clock3 className="size-3.5" />
                    Last updated
                  </dt>

                  <dd className="mt-1.5 text-sm leading-6">
                    {formatDate(
                      issue.updated_at,
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            {canEdit && (
              <div className="rounded-xl border border-brand/15 bg-brand-soft/50 p-5">
                <p className="text-sm font-medium text-brand">
                  Your issue
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  This issue is
                  still open, so
                  you can update
                  its title,
                  description, or
                  type.
                </p>

                <Link
                  href={
                    ROUTE_BUILDERS.editMyIssue(
                      issue.id,
                    )
                  }
                  className={`${buttonVariants(
                    {
                      variant:
                        "default",
                      size: "sm",
                    },
                  )} mt-4`}
                >
                  <Pencil />
                  Edit Issue
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}