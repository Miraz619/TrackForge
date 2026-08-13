"use client";

import {
  useEffect,
} from "react";

import {
  ErrorFallback,
} from "@/components/shared/error-fallback";

interface RootErrorProps {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
}

export default function RootError({
  error,
  reset,
}: RootErrorProps) {
  useEffect(() => {
    console.error(
      "TrackForge application error:",
      error,
    );
  }, [error]);

  return (
    <ErrorFallback
      title="TrackForge hit an unexpected problem"
      description="We couldn't load this part of TrackForge. Try the request again, or return to the home page."
      digest={error.digest}
      reset={reset}
    />
  );
}