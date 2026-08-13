"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import { ApiError } from "@/lib/api/api-error";

import {
  createIssue,
} from "@/lib/api/issues.api";

import {
  getAuthenticatedSession,
} from "@/lib/auth/session-user";

import {
  ROUTES,
} from "@/lib/constants/routes";

import {
  issueSchema,
} from "@/schemas/issue.schema";

import type {
  IssueActionState,
} from "@/types";

export async function createIssueAction(
  _previousState: IssueActionState,
  formData: FormData,
): Promise<IssueActionState> {
  const session =
    await getAuthenticatedSession();

  if (!session) {
    redirect(ROUTES.login);
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
    await createIssue(
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
      "Create issue failed:",
      error,
    );

    return {
      error:
        "Unable to create the issue right now.",
    };
  }

  revalidatePath(
    ROUTES.dashboard,
  );

  revalidatePath(
    ROUTES.myIssues,
  );

  redirect(
    ROUTES.myIssues,
  );
}