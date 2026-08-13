import "server-only";

export function extractRefreshToken(
  setCookieHeader: string | null,
): string | null {
  if (!setCookieHeader) {
    return null;
  }

  const match = setCookieHeader.match(
    /(?:^|,\s*|;\s*)refreshToken=([^;,\s]+)/,
  );

  return match?.[1] ?? null;
}