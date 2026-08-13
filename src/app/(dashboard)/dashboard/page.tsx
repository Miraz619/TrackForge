import type { Metadata } from "next";

import Link from "next/link";
import { redirect } from "next/navigation";

import {
  ArrowRight,
  CircleCheckBig,
  CircleDot,
  CirclePlus,
  Clock3,
  LayoutList,
} from "lucide-react";

import {
  buttonVariants,
} from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { getAuthenticatedSession } from "@/lib/auth/session-user";

import {
  getIssues,
  getIssueStats,
  getMyIssues,
} from "@/lib/api/issues.api";

import { ROUTES } from "@/lib/constants/routes";

import { StatsCard } from "../_components/stats-card";
import { IssueOverviewChart } from "../_components/issue-overview-chart";
import { RecentIssues } from "../_components/recent-issues";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session =
    await getAuthenticatedSession();

  if (!session) {
    redirect(ROUTES.login);
  }

  const {
    user,
    accessToken,
  } = session;

  const firstName =
    user.name.split(" ")[0];

  const [
    statsResponse,
    recentResponse,
  ] = await Promise.all([
    getIssueStats(accessToken),

    user.role === "maintainer"
      ? getIssues(accessToken, {
          page: 1,
          limit: 5,
          sort: "newest",
        })
      : getMyIssues(
          accessToken,
          {
            page: 1,
            limit: 5,
            sort: "newest",
          },
        ),
  ]);

  const stats =
    statsResponse.data ?? {
      total: 0,
      open: 0,
      inProgress: 0,
      resolved: 0,
      bugs: 0,
      featureRequests: 0,
    };

  const recentIssues =
    recentResponse.data ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand">
            {user.role ===
            "maintainer"
              ? "Maintainer workspace"
              : "Contributor workspace"}
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            Welcome back,{" "}
            {firstName}.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {user.role ===
            "maintainer"
              ? "Monitor workspace activity, review incoming reports, and keep issues moving toward resolution."
              : "Track your reports, follow their progress, and submit new issues when something needs attention."}
          </p>
        </div>

        <Link
          href={
            ROUTES.createIssue
          }
          className={cn(
            buttonVariants({
              variant:
                "default",
            }),
            "w-fit",
          )}
        >
          <CirclePlus
            data-icon="inline-start"
          />
          New Issue
        </Link>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Issues"
          value={stats.total}
          description={
            user.role ===
            "maintainer"
              ? "All issues across the workspace"
              : "Issues reported by you"
          }
          icon={LayoutList}
          tone="brand"
        />

        <StatsCard
          title="Open"
          value={stats.open}
          description="Waiting for review or action"
          icon={CircleDot}
          tone="open"
        />

        <StatsCard
          title="In Progress"
          value={
            stats.inProgress
          }
          description="Currently being worked on"
          icon={Clock3}
          tone="progress"
        />

        <StatsCard
          title="Resolved"
          value={
            stats.resolved
          }
          description="Successfully completed issues"
          icon={
            CircleCheckBig
          }
          tone="resolved"
        />
      </section>

      {/* Dashboard content */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Recent Issues */}
        <div className="rounded-xl border bg-card p-5 shadow-sm shadow-black/[0.02] sm:p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold">
                Recent Issues
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {user.role ===
                "maintainer"
                  ? "Latest reports across the workspace."
                  : "Your latest reported issues."}
              </p>
            </div>

            <Link
              href={
                user.role ===
                "maintainer"
                  ? ROUTES.manageIssues
                  : ROUTES.myIssues
              }
              className={buttonVariants(
                {
                  variant:
                    "ghost",
                  size: "sm",
                },
              )}
            >
              View all

              <ArrowRight
                data-icon="inline-end"
              />
            </Link>
          </div>

          <RecentIssues
            issues={
              recentIssues
            }
          />
        </div>

        {/* Chart */}
        <div className="rounded-xl border bg-card p-5 shadow-sm shadow-black/[0.02] sm:p-6">
          <div>
            <h2 className="font-semibold">
              Issue Distribution
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Bugs compared with
              feature requests.
            </p>
          </div>

          <IssueOverviewChart
            bugs={stats.bugs}
            featureRequests={
              stats.featureRequests
            }
          />
        </div>
      </section>
    </div>
  );
}