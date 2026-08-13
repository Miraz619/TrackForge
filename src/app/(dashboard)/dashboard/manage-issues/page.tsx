import type { Metadata } from "next";

import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/auth/session-user";
import { ROUTES } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "Manage Issues",
};

export default async function ManageIssuesPage() {
  const user =
    await getSessionUser();

  if (!user) {
    redirect(ROUTES.login);
  }

  if (
    user.role !== "maintainer"
  ) {
    redirect(
      ROUTES.dashboard,
    );
  }

  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">
        Maintainer workspace
      </p>

      <h1 className="mt-1 text-3xl font-semibold tracking-tight">
        Manage Issues
      </h1>

      <p className="mt-3 text-sm text-muted-foreground">
        Workspace-wide issue
        management will appear
        here.
      </p>
    </div>
  );
}