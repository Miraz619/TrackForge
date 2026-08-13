import "server-only";

import { cache } from "react";

import {
  getAccessToken,
} from "./session";

import {
  getCurrentUser,
} from "@/lib/api/auth.api";

export const getSessionUser =
  cache(async () => {
    const accessToken =
      await getAccessToken();

    if (!accessToken) {
      return null;
    }

    try {
      const response =
        await getCurrentUser(
          accessToken,
        );

      return response.data ?? null;
    } catch {
      return null;
    }
  });