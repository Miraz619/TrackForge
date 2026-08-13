"use client";

import {
  useActionState,
} from "react";

import {
  AlertCircle,
  Bug,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  createIssueAction,
} from "../_actions/create-issue.action";

import type {
  IssueActionState,
} from "@/types";

const initialState: IssueActionState =
  {};

export function CreateIssueForm() {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    createIssueAction,
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
          placeholder="e.g. Login button stops responding after submit"
          maxLength={150}
          aria-invalid={
            Boolean(
              state.fieldErrors
                ?.title,
            )
          }
          required
        />

        <div className="flex items-start justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Keep the title short
            and specific.
          </p>

          {state.fieldErrors
            ?.title?.[0] && (
            <p className="text-right text-xs text-destructive">
              {
                state.fieldErrors
                  .title[0]
              }
            </p>
          )}
        </div>
      </div>

      {/* Type */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="text-sm font-medium"
        >
          Issue type
        </label>

        <div className="relative">
          <select
            id="type"
            name="type"
            defaultValue=""
            aria-invalid={
              Boolean(
                state
                  .fieldErrors
                  ?.type,
              )
            }
            className="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 pr-10 text-sm shadow-xs outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option
              value=""
              disabled
            >
              Select issue type
            </option>

            <option value="bug">
              Bug
            </option>

            <option value="feature_request">
              Feature Request
            </option>
          </select>
        </div>

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

            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              Something is
              behaving incorrectly
              or failing.
            </p>
          </div>

          <div className="rounded-lg border bg-issue-feature-soft/60 p-3">
            <div className="flex items-center gap-2 text-sm font-medium text-issue-feature">
              <Sparkles className="size-4" />
              Feature Request
            </div>

            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              Suggest a new
              capability or
              improvement.
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
          rows={9}
          placeholder="Explain the issue clearly. Include what happened, what you expected, and any useful context."
          aria-invalid={
            Boolean(
              state.fieldErrors
                ?.description,
            )
          }
          className="flex w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
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
                state.fieldErrors
                  .description[0]
              }
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end border-t pt-6">
        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Send />
              Submit Issue
            </>
          )}
        </Button>
      </div>
    </form>
  );
}