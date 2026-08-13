import "server-only";

import { env } from "@/lib/env";
import { extractRefreshToken } from "@/lib/auth/token";

import type {
  ApiResponse,
  LoginResponse,
  User,
} from "@/types";

import type {
  LoginInput,
  RegisterInput,
} from "@/schemas/auth.schema";

import { ApiError } from "./api-error";
import { apiFetch } from "./api-client";

interface BackendLoginResult {
  response: ApiResponse<LoginResponse>;
  refreshToken: string;
}

export async function registerUser(
  input: RegisterInput,
) {
  return apiFetch<ApiResponse<User>>(
    "/api/auth/signup",
    {
      method: "POST",
      body: input,
    },
  );
}

export async function loginUser(
  input: LoginInput,
): Promise<BackendLoginResult> {
  const response = await fetch(
    `${env.BACKEND_API_URL}/api/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(input),

      cache: "no-store",
    },
  );

  const data =
    (await response.json()) as ApiResponse<LoginResponse>;

  if (!response.ok) {
    throw new ApiError(
      data.message || "Login failed",
      response.status,
      data.errors,
    );
  }

  const refreshToken =
    extractRefreshToken(
      response.headers.get("set-cookie"),
    );

  if (
    !data.data?.accessToken ||
    !refreshToken
  ) {
    throw new ApiError(
      "Authentication response is incomplete",
      500,
    );
  }

  return {
    response: data,
    refreshToken,
  };
}

export async function getCurrentUser(
  accessToken: string,
) {
  return apiFetch<ApiResponse<User>>(
    "/api/auth/me",
    {
      method: "GET",
      accessToken,
    },
  );
}