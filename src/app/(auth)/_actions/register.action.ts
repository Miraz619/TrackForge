"use server";

import { redirect } from "next/navigation";

import {
  loginUser,
  registerUser,
} from "@/lib/api/auth.api";

import { ApiError } from "@/lib/api/api-error";

import { setAuthCookies } from "@/lib/auth/session";

import { ROUTES } from "@/lib/constants/routes";

import { registerSchema } from "@/schemas/auth.schema";

import type { AuthActionState } from "@/types";

export async function registerAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed =
    registerSchema.safeParse({
      name: String(
        formData.get("name") ??
          "",
      ),

      email: String(
        formData.get("email") ??
          "",
      ),

      password: String(
        formData.get(
          "password",
        ) ?? "",
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
    await registerUser(
      parsed.data,
    );

    const loginResult =
      await loginUser({
        email: parsed.data.email,
        password:
          parsed.data.password,
      });

    const accessToken =
      loginResult.response.data
        ?.accessToken;

    if (!accessToken) {
      return {
        error:
          "Account created, but automatic sign in failed.",
      };
    }

    await setAuthCookies(
      accessToken,
      loginResult.refreshToken,
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
      };
    }

    console.error(
      "Registration action failed:",
      error,
    );

    return {
      error:
        "Unable to create your account right now.",
    };
  }

  redirect(ROUTES.dashboard);
}