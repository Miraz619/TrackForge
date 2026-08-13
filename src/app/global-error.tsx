"use client";

import {
  useEffect,
} from "react";

import {
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";

import "./globals.css";

interface GlobalErrorProps {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
}

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error(
      "TrackForge global error:",
      error,
    );
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
          <div className="w-full max-w-lg text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <AlertTriangle className="size-7" />
            </div>

            <p className="mt-6 text-sm font-medium text-destructive">
              Application error
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              TrackForge couldn&apos;t
              start correctly.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              An unexpected
              application error
              occurred. Try loading
              TrackForge again.
            </p>

            {error.digest && (
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                Reference:{" "}
                {error.digest}
              </p>
            )}

            <button
              type="button"
              onClick={reset}
              className="mt-7 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <RefreshCcw className="size-4" />
              Reload TrackForge
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}