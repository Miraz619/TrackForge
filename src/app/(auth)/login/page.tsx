import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Card } from "@/components/ui/card";

import { LoginForm } from "../_components/login-form";

import { getSessionUser } from "@/lib/auth/session-user";
import { ROUTES } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to your TrackForge workspace.",
};

export default async function LoginPage() {
  const user =
    await getSessionUser();

  if (user) {
    redirect(ROUTES.dashboard);
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Sign in to continue to
          your TrackForge
          workspace.
        </p>
      </div>

      <Card className="p-6 shadow-sm sm:p-7">
        <LoginForm />
      </Card>
    </div>
  );
}