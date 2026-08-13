import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import { logoutAction } from "@/app/(auth)/_actions/logout.action";

import { getSessionUser } from "@/lib/auth/session-user";
import { ROUTES } from "@/lib/constants/routes";

export default async function DashboardPage() {
  const user =
    await getSessionUser();

  if (!user) {
    redirect(ROUTES.login);
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm text-muted-foreground">
          Signed in as
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          {user.name}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {user.email} ·{" "}
          {user.role}
        </p>

        <form
          action={logoutAction}
          className="mt-8"
        >
          <Button
            type="submit"
            variant="outline"
          >
            Sign out
          </Button>
        </form>
      </div>
    </main>
  );
}