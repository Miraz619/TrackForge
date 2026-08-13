import "server-only";

import { cache } from "react";

import {
  getAccessToken,
  getRefreshToken,
} from "@/lib/auth/session";

import {
  getCurrentUser,
  refreshSession,
} from "@/lib/api/auth.api";

import { ApiError } from "@/lib/api/api-error";

import type { User } from "@/types";

interface AuthenticatedSession {
  user: User;
  accessToken: string;
}

export const getAuthenticatedSession =
  cache(
    async (): Promise<AuthenticatedSession | null> => {
      const accessToken =
        await getAccessToken();

      if (accessToken) {
        try {
          const response =
            await getCurrentUser(
              accessToken,
            );

          if (response.data) {
            return {
              user: response.data,
              accessToken,
            };
          }
        } catch (error) {
          if (
            !(
              error instanceof
                ApiError &&
              error.status === 401
            )
          ) {
            console.error(
              "Session verification failed:",
              error,
            );

            return null;
          }
        }
      }

      const refreshToken =
        await getRefreshToken();

      if (!refreshToken) {
        return null;
      }

      try {
        const refreshed =
          await refreshSession(
            refreshToken,
          );

        if (
          !refreshed.response.data
        ) {
          return null;
        }

        return {
          user:
            refreshed.response.data
              .user,

          accessToken:
            refreshed.response.data
              .accessToken,
        };
      } catch (error) {
        console.error(
          "Session refresh failed:",
          error,
        );

        return null;
      }
    },
  );

export const getSessionUser =
  cache(async () => {
    const session =
      await getAuthenticatedSession();

    return session?.user ?? null;
  });