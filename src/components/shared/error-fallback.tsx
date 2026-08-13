"use client";

import Link from "next/link";

import {
  AlertTriangle,
  Home,
  RefreshCcw,
} from "lucide-react";

import {
  Button,
  buttonVariants,
} from "@/components/ui/button";

import {
  ROUTES,
} from "@/lib/constants/routes";

interface ErrorFallbackProps {
  title?: string;
  description?: string;
  digest?: string;
  reset: () => void;
  compact?: boolean;
}

export function ErrorFallback({
  title =
    "Something went wrong",
  description =
    "TrackForge couldn't complete that request. The problem may be temporary.",
  digest,
  reset,
  compact = false,
}: ErrorFallbackProps) {
  return (
    <div
      className={
        compact
          ? "flex min-h-[420px] items-center justify-center"
          : "flex min-h-[70vh] items-center justify-center px-4 py-16"
      }
    >
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="size-6" />
        </div>

        <p className="mt-6 text-sm font-medium text-destructive">
          Request failed
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        {digest && (
          <p className="mt-3 font-mono text-[11px] text-muted-foreground">
            Reference: {digest}
          </p>
        )}

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={reset}
          >
            <RefreshCcw />
            Try Again
          </Button>

          <Link
            href={ROUTES.home}
            className={buttonVariants(
              {
                variant:
                  "outline",
              },
            )}
          >
            <Home />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}