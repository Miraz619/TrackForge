import type {
  Metadata,
} from "next";

import {
  notFound,
  redirect,
} from "next/navigation";

import {
  LockKeyhole,
} from "lucide-react";

import {
  Card,
} from "@/components/ui/card";

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

import {
  EditIssueForm,
} from "../../../_components/edit-issue-form";

export const metadata: Metadata = {
  title: "Edit Issue",
};

interface EditIssuePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditIssuePage({
  params,
}: EditIssuePageProps) {
  const session =
    await getAuthenticatedSession();

  if (!session) {
    redirect(ROUTES.login);
  }

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

  let issue;

  try {
    const response =
      await getIssue(
        issueId,
        session.accessToken,
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

  const isOwner =
    issue.reporter.id ===
    session.user.id;

  const isEditable =
    isOwner &&
    issue.status === "open";

  if (!isEditable) {
    redirect(
      ROUTE_BUILDERS.issueDetails(
        issue.id,
      ),
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <section>
        <p className="text-sm font-medium text-brand">
          Issue #{issue.id}
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Edit Issue
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Update your report while
          it is still open.
        </p>
      </section>

      <div className="flex gap-3 rounded-xl border border-status-open/20 bg-status-open-soft p-4">
        <LockKeyhole className="mt-0.5 size-4 shrink-0 text-status-open" />

        <p className="text-sm leading-6 text-muted-foreground">
          Contributors can edit
          their own reports only
          while the issue status is{" "}
          <span className="font-medium text-status-open">
            Open
          </span>
          .
        </p>
      </div>

      <Card className="p-5 sm:p-7">
        <EditIssueForm
          issue={issue}
        />
      </Card>
    </div>
  );
}