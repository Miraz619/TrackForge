import { Logo } from "@/components/shared/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        <section className="relative hidden overflow-hidden border-r bg-foreground p-12 text-background lg:flex lg:flex-col">
          <Logo className="text-background" />

          <div className="my-auto max-w-lg">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-background/60">
              Developer workflow
            </p>

            <h1 className="text-4xl font-semibold tracking-tight xl:text-5xl">
              Turn reported issues
              into shipped
              improvements.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-background/65">
              Track bugs, feature
              requests, progress,
              and resolution from
              one focused workspace.
            </p>
          </div>

          <p className="text-sm text-background/50">
            TrackForge
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <Logo />
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}