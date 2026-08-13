import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Card } from "@/components/ui/card";

import { RegisterForm } from "../_components/register-form";

import { getSessionUser } from "@/lib/auth/session-user";
import { ROUTES } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Create your TrackForge contributor account.",
};

export default async function RegisterPage() {
  const user =
    await getSessionUser();

  if (user) {
    redirect(ROUTES.dashboard);
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create your account
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Join TrackForge to
          report issues and track
          their progress.
        </p>
      </div>

      <Card className="p-6 shadow-sm sm:p-7">
        <RegisterForm />
      </Card>
    </div>
  );
}