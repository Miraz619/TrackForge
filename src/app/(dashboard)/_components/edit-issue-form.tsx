"use client";

import {
  useActionState,
} from "react";

import Link from "next/link";

import {
  AlertCircle,
  Bug,
  Loader2,
  Save,
  Sparkles,
} from "lucide-react";

import {
  Button,
  buttonVariants,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  ROUTE_BUILDERS,
} from "@/lib/constants/routes";

import type {
  Issue,
  IssueActionState,
} from "@/types";

import {
  updateIssueAction,
} from "../_actions/update-issue.action";

interface EditIssueFormProps {
  issue: Issue;
}

const initialState: IssueActionState =
  {};

export function EditIssueForm({
  issue,
}: EditIssueFormProps) {
  const boundAction =
    updateIssueAction.bind(
      null,
      issue.id,
    );

  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    boundAction,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      {state.error && (
        <div
          role="alert"
          className="flex gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />

          <p>
            {state.error}
          </p>
        </div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-sm font-medium"
        >
          Issue title
        </label>

        <Input
          id="title"
          name="title"
          type="text"
          defaultValue={
            issue.title
          }
          maxLength={150}
          aria-invalid={Boolean(
            state.fieldErrors
              ?.title,
          )}
          required
        />

        {state.fieldErrors
          ?.title?.[0] && (
          <p className="text-xs text-destructive">
            {
              state.fieldErrors
                .title[0]
            }
          </p>
        )}
      </div>

      {/* Type */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="text-sm font-medium"
        >
          Issue type
        </label>

        <select
          id="type"
          name="type"
          defaultValue={
            issue.type
          }
          aria-invalid={Boolean(
            state.fieldErrors
              ?.type,
          )}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20"
          required
        >
          <option value="bug">
            Bug
          </option>

          <option value="feature_request">
            Feature Request
          </option>
        </select>

        {state.fieldErrors
          ?.type?.[0] && (
          <p className="text-xs text-destructive">
            {
              state.fieldErrors
                .type[0]
            }
          </p>
        )}

        <div className="grid gap-3 pt-1 sm:grid-cols-2">
          <div className="rounded-lg border bg-issue-bug-soft/60 p-3">
            <div className="flex items-center gap-2 text-sm font-medium text-issue-bug">
              <Bug className="size-4" />

              Bug
            </div>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              A problem or
              unexpected behavior.
            </p>
          </div>

          <div className="rounded-lg border bg-issue-feature-soft/60 p-3">
            <div className="flex items-center gap-2 text-sm font-medium text-issue-feature">
              <Sparkles className="size-4" />

              Feature Request
            </div>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              A proposed
              improvement or new
              capability.
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={10}
          defaultValue={
            issue.description
          }
          aria-invalid={Boolean(
            state.fieldErrors
              ?.description,
          )}
          className="flex w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-sm leading-6 shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
          required
        />

        <div className="flex items-start justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Minimum 20
            characters.
          </p>

          {state.fieldErrors
            ?.description?.[0] && (
            <p className="text-right text-xs text-destructive">
              {
                state
                  .fieldErrors
                  .description[0]
              }
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
        <Link
          href={
            ROUTE_BUILDERS.issueDetails(
              issue.id,
            )
          }
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Cancel
        </Link>

        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}