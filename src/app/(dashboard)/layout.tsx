import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/auth/session-user";
import { ROUTES } from "@/lib/constants/routes";

import { AppSidebar } from "./_components/app-sidebar";
import { DashboardHeader } from "./_components/dashboard-header";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user =
    await getSessionUser();

  if (!user) {
    redirect(ROUTES.login);
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-background lg:block">
        <AppSidebar user={user} />
      </aside>

      <div className="lg:pl-64">
        <DashboardHeader
          user={user}
        />

        <main className="min-h-[calc(100vh-4rem)]">
          <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}