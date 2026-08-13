"use server";

import { redirect } from "next/navigation";

import { loginSchema } from "@/schemas/auth.schema";
import { loginUser } from "@/lib/api/auth.api";
import { ApiError } from "@/lib/api/api-error";
import { setAuthCookies } from "@/lib/auth/session";
import { ROUTES } from "@/lib/constants/routes";

import type { AuthActionState } from "@/types";

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: String(
      formData.get("email") ?? "",
    ),

    password: String(
      formData.get("password") ?? "",
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
    const result = await loginUser(
      parsed.data,
    );

    const accessToken =
      result.response.data
        ?.accessToken;

    if (!accessToken) {
      return {
        error:
          "Unable to create your session.",
      };
    }

    await setAuthCookies(
      accessToken,
      result.refreshToken,
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
      };
    }

    console.error(
      "Login action failed:",
      error,
    );

    return {
      error:
        "Unable to sign in right now.",
    };
  }

  redirect(ROUTES.dashboard);
}