import type { Metadata } from "next";

import Link from "next/link";

import {
  ArrowRight,
  Bug,
  CheckCircle2,
  CircleDot,
  CirclePlus,
  Clock3,
  Eye,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  ROUTES,
} from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how TrackForge moves bug reports and feature requests from submission through resolution.",
};

const steps = [
  {
    number: "01",
    title: "Create a report",
    description:
      "A contributor submits a bug or feature request with a clear title and detailed description.",
    icon: CirclePlus,
  },
  {
    number: "02",
    title: "Maintainer review",
    description:
      "Maintainers see incoming issues across the workspace and review what needs attention.",
    icon: SearchCheck,
  },
  {
    number: "03",
    title: "Work begins",
    description:
      "When work starts, the issue moves from Open to In Progress.",
    icon: Clock3,
  },
  {
    number: "04",
    title: "Issue resolved",
    description:
      "Completed work is marked Resolved so the final state remains visible to everyone.",
    icon: CheckCircle2,
  },
];

export default function HowItWorksPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-brand-soft/60 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-brand">
              How TrackForge works
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              A clear path from
              report to resolution.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              TrackForge keeps the
              issue lifecycle simple:
              report the problem,
              review it, track the
              work, and make the final
              outcome visible.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={ROUTES.register}
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                })}
              >
                Get Started
                <ArrowRight />
              </Link>

              <Link
                href={ROUTES.issues}
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}
              >
                <Eye />
                Browse Issues
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-brand">
            The workflow
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Four steps. One visible
            process.
          </h2>
        </div>

        <div className="relative mt-12 grid gap-5 lg:grid-cols-4">
          {steps.map(
            ({
              number,
              title,
              description,
              icon: Icon,
            }) => (
              <article
                key={number}
                className="rounded-xl border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.16em] text-brand">
                    STEP {number}
                  </span>

                  <div className="flex size-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="size-4" />
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </article>
            ),
          )}
        </div>
      </section>

      {/* Status */}
      <section className="border-y bg-muted/25">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-medium text-brand">
                Issue lifecycle
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Every issue has a
                status you can
                understand instantly.
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                Instead of complicated
                workflows, TrackForge
                uses three clear
                states that show where
                an issue currently
                stands.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-4 rounded-xl border bg-card p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-status-open-soft text-status-open">
                  <CircleDot className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Open
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    The report has been
                    created and is
                    waiting for review
                    or action.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border bg-card p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-status-progress-soft text-status-progress">
                  <Clock3 className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    In Progress
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    A maintainer has
                    moved the report
                    into active work.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border bg-card p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-status-resolved-soft text-status-resolved">
                  <CheckCircle2 className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Resolved
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    The issue has been
                    completed and its
                    final state remains
                    visible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Issue types */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-brand">
            What can be reported?
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Two issue types keep
            reports organized.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-xl border border-issue-bug/15 bg-issue-bug-soft/40 p-7">
            <Bug className="size-6 text-issue-bug" />

            <h3 className="mt-5 text-xl font-semibold">
              Bug
            </h3>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Use a Bug report when
              something behaves
              incorrectly, fails, or
              produces an unexpected
              result.
            </p>
          </article>

          <article className="rounded-xl border border-issue-feature/15 bg-issue-feature-soft/40 p-7">
            <Sparkles className="size-6 text-issue-feature" />

            <h3 className="mt-5 text-xl font-semibold">
              Feature Request
            </h3>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Use a Feature Request
              when proposing a new
              capability or an
              improvement to existing
              functionality.
            </p>
          </article>
        </div>
      </section>

      {/* Permissions */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand">
              Permissions
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Each role has clear
              responsibilities.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="rounded-xl border bg-background p-7">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <UserRound className="size-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    ROLE
                  </p>

                  <h3 className="font-semibold">
                    Contributor
                  </h3>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {[
                  "Browse public issues",
                  "Create bug and feature reports",
                  "View personal issue history",
                  "Edit own issue while it is Open",
                  "Cannot change issue status",
                  "Cannot delete issues",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-6 text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-status-resolved" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border bg-background p-7">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <ShieldCheck className="size-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    ROLE
                  </p>

                  <h3 className="font-semibold">
                    Maintainer
                  </h3>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {[
                  "Access workspace-wide issues",
                  "Search and filter all reports",
                  "Move issues between statuses",
                  "Review contributor activity",
                  "Delete issues when necessary",
                  "View workspace statistics",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-6 text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-status-resolved" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-foreground px-6 py-12 text-background sm:px-10 lg:px-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              Ready to report your
              first issue?
            </h2>

            <p className="mt-4 text-sm leading-7 text-background/65 sm:text-base">
              Create your TrackForge
              account and start
              turning software
              problems and ideas into
              visible progress.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={ROUTES.register}
                className={buttonVariants({
                  variant: "secondary",
                })}
              >
                Create Account
                <ArrowRight />
              </Link>

              <Link
                href={ROUTES.issues}
                className="inline-flex h-9 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Explore Issues
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}