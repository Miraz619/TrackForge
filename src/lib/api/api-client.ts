import "server-only";

import { env } from "@/lib/env";

import { ApiError } from "./api-error";

interface ApiFetchOptions
  extends Omit<
    RequestInit,
    "body"
  > {
  body?: unknown;
  accessToken?: string;
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const {
    body,
    accessToken,
    headers,
    ...requestOptions
  } = options;

  const requestHeaders =
    new Headers(headers);

  requestHeaders.set(
    "Accept",
    "application/json",
  );

  if (body !== undefined) {
    requestHeaders.set(
      "Content-Type",
      "application/json",
    );
  }

  if (accessToken) {
    requestHeaders.set(
      "Authorization",
      `Bearer ${accessToken}`,
    );
  }

  const response = await fetch(
    `${env.BACKEND_API_URL}${endpoint}`,
    {
      ...requestOptions,

      headers: requestHeaders,

      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined,

      cache: "no-store",
    },
  );

  const responseData =
    await response
      .json()
      .catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      responseData?.message ||
        "Something went wrong",
      response.status,
      responseData?.errors,
    );
  }

  return responseData as T;
}