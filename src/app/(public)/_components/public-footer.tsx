import Link from "next/link";

import {
  GitBranch,
} from "lucide-react";

import {
  APP_CONFIG,
} from "@/lib/constants/app";

import {
  ROUTES,
} from "@/lib/constants/routes";

export function PublicFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto_auto]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-white">
                <GitBranch className="size-4" />
              </span>

              {APP_CONFIG.name}
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              A focused developer
              workspace for
              reporting bugs,
              requesting features,
              and tracking issues
              through resolution.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">
              Platform
            </p>

            <div className="mt-4 space-y-3">
              <Link
                href={ROUTES.issues}
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Explore Issues
              </Link>

              <Link
                href={
                  ROUTES.createIssue
                }
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Report Issue
              </Link>

              <Link
                href={
                  ROUTES.dashboard
                }
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">
              Learn
            </p>

            <div className="mt-4 space-y-3">
              <Link
                href={
                  ROUTES.howItWorks
                }
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                How It Works
              </Link>

              <Link
                href={ROUTES.about}
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            ©{" "}
            {new Date().getFullYear()}{" "}
            TrackForge. All rights
            reserved.
          </p>

          <p>
            Built for modern
            developer workflows.
          </p>
        </div>
      </div>
    </footer>
  );
}