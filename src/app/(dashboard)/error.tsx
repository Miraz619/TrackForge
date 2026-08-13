"use client";

import {
  useEffect,
} from "react";

import {
  ErrorFallback,
} from "@/components/shared/error-fallback";

interface DashboardErrorProps {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
}

export default function DashboardError({
  error,
  reset,
}: DashboardErrorProps) {
  useEffect(() => {
    console.error(
      "TrackForge dashboard error:",
      error,
    );
  }, [error]);

  return (
    <ErrorFallback
      title="The workspace couldn't load"
      description="There was a problem loading this dashboard view. Your account and existing issues have not been changed."
      digest={error.digest}
      reset={reset}
      compact
    />
  );
}