import type { Metadata } from "next";

import Link from "next/link";
import { redirect } from "next/navigation";

import {
  ArrowRight,
  CirclePlus,
  ListTodo,
  ShieldCheck,
} from "lucide-react";

import { getSessionUser } from "@/lib/auth/session-user";
import { ROUTES } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user =
    await getSessionUser();

  if (!user) {
    redirect(ROUTES.login);
  }

  const firstName =
    user.name.split(" ")[0];

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-muted-foreground">
          Workspace overview
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome back,{" "}
          {firstName}.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Track issues, monitor
          progress, and keep your
          development workflow
          moving.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Link
          href={ROUTES.createIssue}
          className="group rounded-xl border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <CirclePlus className="size-5" />
          </div>

          <h2 className="mt-5 font-semibold">
            Create an issue
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Report a bug or submit
            a new feature request.
          </p>

          <div className="mt-5 flex items-center gap-1 text-sm font-medium">
            Create issue

            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          href={ROUTES.myIssues}
          className="group rounded-xl border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <ListTodo className="size-5" />
          </div>

          <h2 className="mt-5 font-semibold">
            My issues
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Review your reported
            issues and follow their
            current status.
          </p>

          <div className="mt-5 flex items-center gap-1 text-sm font-medium">
            View issues

            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {user.role ===
          "maintainer" && (
          <Link
            href={
              ROUTES.manageIssues
            }
            className="group rounded-xl border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm md:col-span-2 xl:col-span-1"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <ShieldCheck className="size-5" />
            </div>

            <h2 className="mt-5 font-semibold">
              Manage workspace
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Review, update, and
              resolve issues across
              TrackForge.
            </p>

            <div className="mt-5 flex items-center gap-1 text-sm font-medium">
              Manage issues

              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        )}
      </section>

      <section className="rounded-xl border bg-background p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium">
              Account
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>

          <span className="w-fit rounded-full border bg-muted/60 px-3 py-1 text-xs font-medium capitalize">
            {user.role}
          </span>
        </div>
      </section>
    </div>
  );
}