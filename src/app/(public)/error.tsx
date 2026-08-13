"use client";

import {
  useEffect,
} from "react";

import {
  ErrorFallback,
} from "@/components/shared/error-fallback";

interface PublicErrorProps {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
}

export default function PublicError({
  error,
  reset,
}: PublicErrorProps) {
  useEffect(() => {
    console.error(
      "TrackForge public page error:",
      error,
    );
  }, [error]);

  return (
    <ErrorFallback
      title="We couldn't load this page"
      description="Something interrupted the request. Try again and TrackForge will reload this section."
      digest={error.digest}
      reset={reset}
      compact
    />
  );
}