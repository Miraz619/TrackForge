"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  ApiError,
} from "@/lib/api/api-error";

import {
  deleteIssue,
  updateIssue,
} from "@/lib/api/issues.api";

import {
  getAuthenticatedSession,
} from "@/lib/auth/session-user";

import {
  ROUTES,
  ROUTE_BUILDERS,
} from "@/lib/constants/routes";

import {
  maintainerIssueUpdateSchema,
} from "@/schemas/issue.schema";

import type {
  MaintainerActionState,
} from "@/types";

export async function updateIssueStatusAction(
  issueId: number,
  _previousState: MaintainerActionState,
  formData: FormData,
): Promise<MaintainerActionState> {
  const session =
    await getAuthenticatedSession();

  if (!session) {
    redirect(ROUTES.login);
  }

  if (
    session.user.role !==
    "maintainer"
  ) {
    return {
      error:
        "You do not have permission to update issue status.",
    };
  }

  if (
    !Number.isInteger(issueId) ||
    issueId < 1
  ) {
    return {
      error: "Invalid issue.",
    };
  }

  const parsed =
    maintainerIssueUpdateSchema.safeParse(
      {
        status: String(
          formData.get(
            "status",
          ) ?? "",
        ),
      },
    );

  if (!parsed.success) {
    return {
      error:
        "Please select a valid issue status.",
    };
  }

  try {
    await updateIssue(
      issueId,
      {
        status:
          parsed.data.status,
      },
      session.accessToken,
    );
  } catch (error) {
    if (
      error instanceof ApiError
    ) {
      return {
        error: error.message,
      };
    }

    console.error(
      "Status update failed:",
      error,
    );

    return {
      error:
        "Unable to update the issue status.",
    };
  }

  revalidatePath(
    ROUTES.manageIssues,
  );

  revalidatePath(
    ROUTES.dashboard,
  );

  revalidatePath(
    ROUTE_BUILDERS.issueDetails(
      issueId,
    ),
  );

  return {
    success:
      "Issue status updated.",
  };
}

export async function deleteIssueAction(
  issueId: number,
  _previousState: MaintainerActionState,
  _formData: FormData,
): Promise<MaintainerActionState> {
  const session =
    await getAuthenticatedSession();

  if (!session) {
    redirect(ROUTES.login);
  }

  if (
    session.user.role !==
    "maintainer"
  ) {
    return {
      error:
        "You do not have permission to delete issues.",
    };
  }

  if (
    !Number.isInteger(issueId) ||
    issueId < 1
  ) {
    return {
      error: "Invalid issue.",
    };
  }

  try {
    await deleteIssue(
      issueId,
      session.accessToken,
    );
  } catch (error) {
    if (
      error instanceof ApiError
    ) {
      return {
        error: error.message,
      };
    }

    console.error(
      "Delete issue failed:",
      error,
    );

    return {
      error:
        "Unable to delete the issue.",
    };
  }

  revalidatePath(
    ROUTES.manageIssues,
  );

  revalidatePath(
    ROUTES.dashboard,
  );

  return {
    success:
      "Issue deleted successfully.",
  };
}