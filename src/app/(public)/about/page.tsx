import type { Metadata } from "next";

import Link from "next/link";

import {
  ArrowRight,
  Bug,
  CheckCircle2,
  Code2,
  Eye,
  GitBranch,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  Workflow,
} from "lucide-react";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  ROUTES,
} from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about TrackForge, a focused developer issue and feature request management platform.",
};

const principles = [
  {
    title: "Focused",
    description:
      "TrackForge concentrates on the essential issue-management workflow without unnecessary complexity.",
    icon: Target,
  },
  {
    title: "Transparent",
    description:
      "Public issue visibility makes progress easier to understand for contributors and visitors.",
    icon: Eye,
  },
  {
    title: "Role-aware",
    description:
      "Contributors and maintainers receive controls that match their responsibilities.",
    icon: ShieldCheck,
  },
  {
    title: "Developer-first",
    description:
      "The interface is designed around common software development reporting and resolution workflows.",
    icon: Code2,
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-brand-soft/60 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-medium text-brand">
              <GitBranch className="size-4" />
              About TrackForge
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Better software starts
              with better issue
              visibility.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              TrackForge is a
              developer issue and
              feature request
              management platform
              designed to make
              reporting, reviewing,
              tracking, and resolving
              software issues clear
              and predictable.
            </p>
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium text-brand">
              Why TrackForge
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              One focused place for
              issues that need
              attention.
            </h2>

            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Software teams need a
              clear way to understand
              what is broken, what
              could be improved, and
              what is currently being
              worked on. TrackForge
              organizes that process
              into a simple workflow.
            </p>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Contributors can report
              and follow their issues,
              while maintainers can
              review reports across
              the workspace and move
              them toward resolution.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-issue-bug/15 bg-issue-bug-soft/50 p-6">
              <div className="flex size-10 items-center justify-center rounded-lg bg-issue-bug-soft text-issue-bug">
                <Bug className="size-5" />
              </div>

              <h3 className="mt-5 font-semibold">
                Bugs
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Capture unexpected
                behavior and make the
                problem visible.
              </p>
            </div>

            <div className="rounded-xl border border-issue-feature/15 bg-issue-feature-soft/50 p-6">
              <div className="flex size-10 items-center justify-center rounded-lg bg-issue-feature-soft text-issue-feature">
                <Sparkles className="size-5" />
              </div>

              <h3 className="mt-5 font-semibold">
                Feature Requests
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Turn improvement ideas
                into structured,
                trackable requests.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6 sm:col-span-2">
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Workflow className="size-5" />
              </div>

              <h3 className="mt-5 font-semibold">
                Clear progression
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Every report follows a
                visible path from Open
                to In Progress to
                Resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y bg-muted/25">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand">
              Product principles
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Designed to stay clear
              as the work grows.
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              TrackForge is built
              around a small set of
              principles that keep
              issue management useful
              instead of overwhelming.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {principles.map(
              ({
                title,
                description,
                icon: Icon,
              }) => (
                <article
                  key={title}
                  className="rounded-xl border bg-card p-6"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-5 font-semibold">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-medium text-brand">
              Built for collaboration
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Contributors and
              maintainers work from
              the same source of truth.
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              TrackForge separates
              responsibilities without
              separating the workflow.
              Everyone sees the same
              issue progress while
              permissions remain
              controlled.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-xl border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <UsersRound className="size-5" />
                </div>

                <h3 className="font-semibold">
                  Contributors
                </h3>
              </div>

              <ul className="mt-6 space-y-3">
                {[
                  "Create bug reports",
                  "Submit feature requests",
                  "Track personal issues",
                  "Edit own open reports",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-status-resolved" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <ShieldCheck className="size-5" />
                </div>

                <h3 className="font-semibold">
                  Maintainers
                </h3>
              </div>

              <ul className="mt-6 space-y-3">
                {[
                  "Review workspace issues",
                  "Update issue status",
                  "Search and filter reports",
                  "Remove issues when needed",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-status-resolved" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-foreground px-6 py-12 text-background sm:px-10 lg:px-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              Explore TrackForge in
              action.
            </h2>

            <p className="mt-4 text-sm leading-7 text-background/65 sm:text-base">
              Browse public reports
              or create an account to
              start tracking your own
              bugs and feature
              requests.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={ROUTES.issues}
                className={buttonVariants({
                  variant: "secondary",
                })}
              >
                Explore Issues
                <ArrowRight />
              </Link>

              <Link
                href={ROUTES.register}
                className="inline-flex h-9 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}