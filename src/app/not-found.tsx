import Link from "next/link";

import {
  ArrowLeft,
  FileQuestion,
  Home,
  Search,
} from "lucide-react";

import {
  Logo,
} from "@/components/shared/logo";

import {
  ThemeToggle,
} from "@/components/shared/theme-toggle";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  ROUTES,
} from "@/lib/constants/routes";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
        <Logo />

        <ThemeToggle />
      </header>

      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--brand-soft),transparent_45%)] opacity-80" />

        <div className="relative w-full max-w-xl text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border bg-card shadow-sm">
            <FileQuestion className="size-7 text-brand" />
          </div>

          <p className="mt-7 text-sm font-semibold tracking-[0.16em] text-brand">
            ERROR 404
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            This page doesn&apos;t
            exist.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
            The page may have been
            moved, removed, or the
            address may be
            incorrect.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={ROUTES.home}
              className={buttonVariants(
                {
                  variant:
                    "default",
                },
              )}
            >
              <Home />
              Back Home
            </Link>

            <Link
              href={
                ROUTES.issues
              }
              className={buttonVariants(
                {
                  variant:
                    "outline",
                },
              )}
            >
              <Search />
              Explore Issues
            </Link>
          </div>

          <Link
            href={ROUTES.home}
            className="mt-7 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-3.5" />
            Return to TrackForge
          </Link>
        </div>
      </section>
    </main>
  );
}