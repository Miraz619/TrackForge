import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  ArrowRight,
  Bug,
  CheckCircle2,
  CirclePlus,
  Clock3,
  Eye,
  Gauge,
  GitBranch,
  GitPullRequestArrow,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  Workflow,
} from "lucide-react";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  getIssues,
} from "@/lib/api/issues.api";

import {
  ROUTES,
} from "@/lib/constants/routes";

import {
  PublicIssueCard,
} from "./_components/public-issue-card";

export const metadata: Metadata = {
  title: "Developer Issue Tracking",
  description:
    "TrackForge helps developers report bugs, request features, monitor progress, and resolve software issues through one focused workflow.",
};

const features = [
  {
    title: "Structured issue reporting",
    description:
      "Capture clear bug reports and feature requests with consistent issue types, descriptions, and status tracking.",
    icon: GitPullRequestArrow,
  },
  {
    title: "Focused workflows",
    description:
      "Move issues from Open to In Progress to Resolved without unnecessary process or complicated configuration.",
    icon: Workflow,
  },
  {
    title: "Fast discovery",
    description:
      "Search, filter, sort, and explore reports using URL-driven controls that stay shareable and predictable.",
    icon: Search,
  },
  {
    title: "Role-aware access",
    description:
      "Contributors manage their reports while maintainers review and control issues across the entire workspace.",
    icon: ShieldCheck,
  },
  {
    title: "Live insights",
    description:
      "Dashboard statistics provide a clear view of issue volume, current status, and bug-versus-feature distribution.",
    icon: Gauge,
  },
  {
    title: "Public transparency",
    description:
      "Anyone can explore public issues and follow progress without needing to create an account first.",
    icon: Eye,
  },
];

const workflow = [
  {
    step: "01",
    title: "Report",
    description:
      "Submit a bug or feature request with a clear title and useful context.",
    icon: CirclePlus,
  },
  {
    step: "02",
    title: "Review",
    description:
      "Maintainers review incoming reports and decide what should move forward.",
    icon: Search,
  },
  {
    step: "03",
    title: "Track",
    description:
      "Follow an issue as it moves through Open and In Progress states.",
    icon: Clock3,
  },
  {
    step: "04",
    title: "Resolve",
    description:
      "Completed work is marked Resolved so progress remains visible.",
    icon: CheckCircle2,
  },
];

export default async function HomePage() {
  const recentResponse =
    await getIssues(
      undefined,
      {
        page: 1,
        limit: 3,
        sort: "newest",
      },
    );

  const recentIssues =
    recentResponse.data ?? [];

  const totalIssues =
    recentResponse.meta?.total ??
    recentIssues.length;

  return (
    <main>
      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--brand-soft),transparent_40%)] opacity-80" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft px-3 py-1.5 text-sm font-medium text-brand">
              <GitBranch className="size-4" />

              Developer Issue &
              Feature Management
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-7xl">
              Turn software issues
              into clear,
              trackable progress.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              TrackForge gives
              contributors and
              maintainers one
              focused workspace to
              report bugs, request
              features, manage
              progress, and resolve
              issues.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={
                  ROUTES.register
                }
                className={buttonVariants(
                  {
                    variant:
                      "default",
                    size: "lg",
                  },
                )}
              >
                Start Tracking

                <ArrowRight />
              </Link>

              <Link
                href={
                  ROUTES.issues
                }
                className={buttonVariants(
                  {
                    variant:
                      "outline",
                    size: "lg",
                  },
                )}
              >
                <Search />

                Explore Issues
              </Link>
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              Browse public issues
              without signing in.
            </p>
          </div>

          {/* Hero preview */}
          <div className="mx-auto mt-16 max-w-5xl rounded-2xl border bg-card/80 p-2 shadow-2xl shadow-brand/5 backdrop-blur sm:p-3">
            <div className="overflow-hidden rounded-xl border bg-background">
              <div className="flex h-11 items-center gap-2 border-b px-4">
                <span className="size-2.5 rounded-full bg-destructive/70" />
                <span className="size-2.5 rounded-full bg-status-open/70" />
                <span className="size-2.5 rounded-full bg-status-resolved/70" />

                <div className="ml-3 h-5 w-48 rounded-md bg-muted" />
              </div>

              <div className="grid md:grid-cols-[200px_1fr]">
                <div className="hidden min-h-80 border-r bg-muted/20 p-4 md:block">
                  <div className="space-y-2">
                    {[
                      "Overview",
                      "My Issues",
                      "Create Issue",
                      "Manage Issues",
                    ].map(
                      (
                        item,
                        index,
                      ) => (
                        <div
                          key={
                            item
                          }
                          className={
                            index ===
                            0
                              ? "rounded-lg bg-brand px-3 py-2 text-xs font-medium text-white"
                              : "rounded-lg px-3 py-2 text-xs text-muted-foreground"
                          }
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-3 w-24 rounded bg-brand-soft" />
                      <div className="mt-3 h-7 w-52 rounded bg-foreground/10" />
                    </div>

                    <div className="h-9 w-24 rounded-md bg-brand" />
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[
                      "Total",
                      "Open",
                      "Progress",
                      "Resolved",
                    ].map(
                      (
                        item,
                      ) => (
                        <div
                          key={
                            item
                          }
                          className="rounded-lg border bg-card p-4"
                        >
                          <div className="h-2.5 w-14 rounded bg-muted" />

                          <div className="mt-4 h-7 w-10 rounded bg-foreground/10" />
                        </div>
                      ),
                    )}
                  </div>

                  <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_220px]">
                    <div className="h-36 rounded-lg border bg-card" />

                    <div className="h-36 rounded-lg border bg-card" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PLATFORM SNAPSHOT
          ===================================================== */}
      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-7xl gap-px sm:grid-cols-3">
          <div className="px-6 py-7 text-center">
            <p className="text-2xl font-semibold tracking-tight text-brand">
              {totalIssues}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Public issues tracked
            </p>
          </div>

          <div className="border-y px-6 py-7 text-center sm:border-x sm:border-y-0">
            <p className="text-2xl font-semibold tracking-tight">
              2
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Focused user roles
            </p>
          </div>

          <div className="px-6 py-7 text-center">
            <p className="text-2xl font-semibold tracking-tight">
              3
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Clear issue states
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
          ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-brand">
            Everything in one
            workflow
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Built around the work
            developers actually
            need to track.
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            TrackForge keeps issue
            management structured
            without turning it into
            an administrative
            burden.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(
            ({
              title,
              description,
              icon: Icon,
            }) => (
              <article
                key={title}
                className="rounded-xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-sm"
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
      </section>

      {/* =====================================================
          WORKFLOW
          ===================================================== */}
      <section className="border-y bg-muted/25">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-brand">
              Simple by design
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              From report to
              resolution in four
              clear steps.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map(
              ({
                step,
                title,
                description,
                icon: Icon,
              }) => (
                <article
                  key={step}
                  className="relative rounded-xl border bg-card p-6"
                >
                  <span className="text-xs font-semibold tracking-widest text-brand">
                    {step}
                  </span>

                  <div className="mt-5 flex size-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
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

      {/* =====================================================
          ISSUE TYPES
          ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-issue-bug/15 bg-issue-bug-soft/45 p-7 sm:p-9">
            <div className="flex size-11 items-center justify-center rounded-xl bg-issue-bug-soft text-issue-bug">
              <Bug className="size-5" />
            </div>

            <p className="mt-6 text-sm font-medium text-issue-bug">
              Bug Reports
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Capture what&apos;s
              broken.
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
              Report unexpected
              behavior clearly so
              maintainers can
              understand the
              problem, prioritize
              it, and track it
              through resolution.
            </p>

            <Link
              href={`${ROUTES.issues}?type=bug`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-issue-bug"
            >
              Explore bugs
              <ArrowRight className="size-4" />
            </Link>
          </article>

          <article className="rounded-2xl border border-issue-feature/15 bg-issue-feature-soft/45 p-7 sm:p-9">
            <div className="flex size-11 items-center justify-center rounded-xl bg-issue-feature-soft text-issue-feature">
              <Sparkles className="size-5" />
            </div>

            <p className="mt-6 text-sm font-medium text-issue-feature">
              Feature Requests
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Capture what could
              be better.
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
              Turn improvement ideas
              into visible requests
              that can be reviewed,
              discussed, and moved
              through the same
              focused workflow.
            </p>

            <Link
              href={`${ROUTES.issues}?type=feature_request`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-issue-feature"
            >
              Explore features
              <ArrowRight className="size-4" />
            </Link>
          </article>
        </div>
      </section>

      {/* =====================================================
          ROLE SECTION
          ===================================================== */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-brand">
                Role-aware by
                default
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                The right controls
                for the right
                people.
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                Contributors focus
                on reporting and
                following issues.
                Maintainers get the
                workspace-wide
                controls they need
                to manage progress.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-xl border bg-background p-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <UserRound className="size-5" />
                </div>

                <h3 className="mt-5 font-semibold">
                  Contributor
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-status-resolved" />
                    Report new
                    issues
                  </li>

                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-status-resolved" />
                    Track personal
                    reports
                  </li>

                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-status-resolved" />
                    Edit own open
                    issues
                  </li>
                </ul>
              </article>

              <article className="rounded-xl border bg-background p-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <ShieldCheck className="size-5" />
                </div>

                <h3 className="mt-5 font-semibold">
                  Maintainer
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-status-resolved" />
                    Review all
                    issues
                  </li>

                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-status-resolved" />
                    Update issue
                    status
                  </li>

                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-status-resolved" />
                    Manage
                    workspace
                    reports
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RECENT ISSUES
          ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-brand">
              Live from the
              workspace
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Recently reported
              issues
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              See the latest public
              reports moving
              through TrackForge.
            </p>
          </div>

          <Link
            href={ROUTES.issues}
            className={buttonVariants(
              {
                variant:
                  "outline",
              },
            )}
          >
            View All Issues
            <ArrowRight />
          </Link>
        </div>

        {recentIssues.length >
        0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recentIssues.map(
              (issue) => (
                <PublicIssueCard
                  key={issue.id}
                  issue={issue}
                />
              ),
            )}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed bg-card p-10 text-center">
            <GitPullRequestArrow className="mx-auto size-6 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">
              No issues reported
              yet
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Create an account
              and submit the first
              issue.
            </p>
          </div>
        )}
      </section>

      {/* =====================================================
          DASHBOARD VALUE
          ===================================================== */}
      <section className="border-y bg-muted/25">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:px-8">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <LayoutDashboard className="size-5" />
              </div>

              <div>
                <p className="font-semibold">
                  Workspace
                  overview
                </p>

                <p className="text-xs text-muted-foreground">
                  Live issue
                  insights
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-lg border p-4">
                <p className="text-xs text-muted-foreground">
                  Open
                </p>

                <div className="mt-3 h-2 w-2/3 rounded-full bg-status-open" />
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-xs text-muted-foreground">
                  In Progress
                </p>

                <div className="mt-3 h-2 w-2/3 rounded-full bg-status-progress" />
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-xs text-muted-foreground">
                  Resolved
                </p>

                <div className="mt-3 h-2 w-2/3 rounded-full bg-status-resolved" />
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-xs text-muted-foreground">
                  Feature Requests
                </p>

                <div className="mt-3 h-2 w-2/3 rounded-full bg-issue-feature" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-brand">
              See the bigger
              picture
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Know what needs
              attention without
              digging through
              reports.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              The TrackForge
              dashboard turns live
              issue data into a
              simple overview of
              volume, status, issue
              type, and recent
              activity.
            </p>

            <Link
              href={
                ROUTES.dashboard
              }
              className={`${buttonVariants(
                {
                  variant:
                    "default",
                },
              )} mt-7`}
            >
              <LayoutDashboard />
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
          ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-foreground px-6 py-12 text-background sm:px-10 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -right-20 -top-28 size-72 rounded-full bg-brand/30 blur-3xl" />

          <div className="relative max-w-2xl">
            <p className="text-sm font-medium text-background/60">
              Start using
              TrackForge
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Give every issue a
              clear path forward.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-background/65 sm:text-base">
              Create an account,
              report your first
              issue, and start
              tracking development
              work through one
              focused workflow.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={
                  ROUTES.register
                }
                className={buttonVariants(
                  {
                    variant:
                      "secondary",
                    size: "lg",
                  },
                )}
              >
                Create Account

                <ArrowRight />
              </Link>

              <Link
                href={
                  ROUTES.issues
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Browse Issues
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}