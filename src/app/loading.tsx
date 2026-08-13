import {
  GitBranch,
} from "lucide-react";

export default function RootLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/20">
          <GitBranch className="size-6" />

          <span className="absolute -inset-2 -z-10 animate-ping rounded-3xl bg-brand/10" />
        </div>

        <p className="mt-5 text-sm font-semibold tracking-tight">
          TrackForge
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Loading workspace...
        </p>

        <div className="mx-auto mt-5 h-1 w-28 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-brand" />
        </div>
      </div>
    </main>
  );
}