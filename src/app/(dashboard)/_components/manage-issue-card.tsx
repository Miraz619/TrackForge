"use client";

import Link from "next/link";

import {
  CalendarDays,
  Eye,
  Loader2,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  useActionState,
} from "react";

import {
  Button,
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
  MaintainerActionState,
} from "@/types";

import {
  deleteIssueAction,
  updateIssueStatusAction,
} from "../_actions/manage-issue.action";

interface ManageIssueCardProps {
  issue: Issue;
}

const initialState: MaintainerActionState =
  {};

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

export function ManageIssueCard({
  issue,
}: ManageIssueCardProps) {
  const updateAction =
    updateIssueStatusAction.bind(
      null,
      issue.id,
    );

  const deleteAction =
    deleteIssueAction.bind(
      null,
      issue.id,
    );

  const [
    updateState,
    updateFormAction,
    updatePending,
  ] = useActionState(
    updateAction,
    initialState,
  );

  const [
    deleteState,
    deleteFormAction,
    deletePending,
  ] = useActionState(
    deleteAction,
    initialState,
  );

  return (
    <article className="rounded-xl border bg-card p-5 shadow-sm shadow-black/[0.02] sm:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        {/* Issue */}
        <div className="min-w-0 flex-1">
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

          <Link
            href={
              ROUTE_BUILDERS.issueDetails(
                issue.id,
              )
            }
            className="mt-3 block"
          >
            <h2 className="text-lg font-semibold tracking-tight transition-colors hover:text-brand">
              {issue.title}
            </h2>
          </Link>

          <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {
              issue.description
            }
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span>
              #{issue.id}
            </span>

            <div className="flex items-center gap-1.5">
              <UserRound className="size-3.5" />

              <span>
                {
                  issue.reporter
                    .name
                }
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
        </div>

        {/* View */}
        <Link
          href={
            ROUTE_BUILDERS.issueDetails(
              issue.id,
            )
          }
          className={buttonVariants(
            {
              variant:
                "outline",
              size: "sm",
            },
          )}
        >
          <Eye />
          View
        </Link>
      </div>

      {/* Maintainer Controls */}
      <div className="mt-5 grid gap-4 border-t pt-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div>
          <form
            action={
              updateFormAction
            }
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            <label
              htmlFor={`status-${issue.id}`}
              className="shrink-0 text-sm font-medium"
            >
              Status
            </label>

            <select
              id={`status-${issue.id}`}
              name="status"
              defaultValue={
                issue.status
              }
              disabled={
                updatePending
              }
              className="h-9 min-w-44 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus:border-ring focus:ring-3 focus:ring-ring/20 disabled:opacity-50"
            >
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

            <Button
              type="submit"
              size="sm"
              disabled={
                updatePending
              }
            >
              {updatePending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </form>

          {updateState.error && (
            <p className="mt-2 text-xs text-destructive">
              {
                updateState.error
              }
            </p>
          )}

          {updateState.success && (
            <p className="mt-2 text-xs text-status-resolved">
              {
                updateState.success
              }
            </p>
          )}
        </div>

        <form
          action={
            deleteFormAction
          }
          onSubmit={(event) => {
            const confirmed =
              window.confirm(
                `Delete "${issue.title}"? This action cannot be undone.`,
              );

            if (!confirmed) {
              event.preventDefault();
            }
          }}
        >
          <Button
            type="submit"
            variant="destructive"
            size="sm"
            disabled={
              deletePending
            }
          >
            {deletePending ? (
              <>
                <Loader2 className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 />
                Delete
              </>
            )}
          </Button>

          {deleteState.error && (
            <p className="mt-2 max-w-52 text-xs text-destructive">
              {
                deleteState.error
              }
            </p>
          )}
        </form>
      </div>
    </article>
  );
}