import "server-only";

import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "trackforge_access_token";
const REFRESH_TOKEN_COOKIE = "trackforge_refresh_token";

const isProduction = process.env.NODE_ENV === "production";

const accessCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 15 * 60,
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60,
};

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  const cookieStore = await cookies();

  cookieStore.set(
    ACCESS_TOKEN_COOKIE,
    accessToken,
    accessCookieOptions,
  );

  cookieStore.set(
    REFRESH_TOKEN_COOKIE,
    refreshToken,
    refreshCookieOptions,
  );
}

export async function getAccessToken() {
  const cookieStore = await cookies();

  return cookieStore.get(
    ACCESS_TOKEN_COOKIE,
  )?.value;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();

  return cookieStore.get(
    REFRESH_TOKEN_COOKIE,
  )?.value;
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(
    ACCESS_TOKEN_COOKIE,
  );

  cookieStore.delete(
    REFRESH_TOKEN_COOKIE,
  );
}