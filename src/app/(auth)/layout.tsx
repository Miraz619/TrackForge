import {
  Logo,
} from "@/components/shared/logo";

import {
  ThemeToggle,
} from "@/components/shared/theme-toggle";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative min-h-screen bg-muted/30">
      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <ThemeToggle className="border bg-background shadow-sm" />
      </div>

      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        <section className="relative hidden overflow-hidden border-r bg-foreground p-12 text-background lg:flex lg:flex-col">
          <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-brand/25 blur-3xl" />

          <div className="relative">
            <Logo className="text-background" />
          </div>

          <div className="relative my-auto max-w-lg">
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
              one focused
              workspace.
            </p>
          </div>

          <p className="relative text-sm text-background/50">
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