"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import { ApiError } from "@/lib/api/api-error";

import {
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
  issueSchema,
} from "@/schemas/issue.schema";

import type {
  IssueActionState,
} from "@/types";

export async function updateIssueAction(
  issueId: number,
  _previousState: IssueActionState,
  formData: FormData,
): Promise<IssueActionState> {
  const session =
    await getAuthenticatedSession();

  if (!session) {
    redirect(ROUTES.login);
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
    issueSchema.safeParse({
      title: String(
        formData.get("title") ??
          "",
      ),

      description: String(
        formData.get(
          "description",
        ) ?? "",
      ),

      type: String(
        formData.get("type") ??
          "",
      ),
    });

  if (!parsed.success) {
    return {
      fieldErrors:
        parsed.error.flatten()
          .fieldErrors,
    };
  }

  try {
    await updateIssue(
      issueId,
      parsed.data,
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
      "Update issue failed:",
      error,
    );

    return {
      error:
        "Unable to update the issue right now.",
    };
  }

  revalidatePath(
    ROUTES.dashboard,
  );

  revalidatePath(
    ROUTES.myIssues,
  );

  revalidatePath(
    ROUTE_BUILDERS.issueDetails(
      issueId,
    ),
  );

  redirect(
    ROUTE_BUILDERS.issueDetails(
      issueId,
    ),
  );
}