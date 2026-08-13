import "server-only";

const backendApiUrl = process.env.BACKEND_API_URL;

if (!backendApiUrl) {
  throw new Error(
    "Missing BACKEND_API_URL environment variable",
  );
}

export const env = {
  BACKEND_API_URL: backendApiUrl,
} as const;