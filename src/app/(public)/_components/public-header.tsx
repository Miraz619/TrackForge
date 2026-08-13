import Link from "next/link";

import {
  LayoutDashboard,
  Menu,
} from "lucide-react";

import {
  Logo,
} from "@/components/shared/logo";

import {
  ThemeToggle,
} from "@/components/shared/theme-toggle";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  ROUTES,
} from "@/lib/constants/routes";

import type {
  User,
} from "@/types";

interface PublicHeaderProps {
  user: User | null;
}

export function PublicHeader({
  user,
}: PublicHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href={ROUTES.home}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Home
          </Link>

          <Link
            href={ROUTES.issues}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Issues
          </Link>

          <Link
            href={
              ROUTES.howItWorks
            }
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            How It Works
          </Link>

          <Link
            href={ROUTES.about}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <Link
                href={
                  ROUTES.dashboard
                }
                className={buttonVariants(
                  {
                    variant:
                      "default",
                    size: "sm",
                  },
                )}
              >
                <LayoutDashboard />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={
                    ROUTES.login
                  }
                  className={buttonVariants(
                    {
                      variant:
                        "ghost",
                      size: "sm",
                    },
                  )}
                >
                  Sign in
                </Link>

                <Link
                  href={
                    ROUTES.register
                  }
                  className={buttonVariants(
                    {
                      variant:
                        "default",
                      size: "sm",
                    },
                  )}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <details className="relative md:hidden">
            <summary
              aria-label="Open navigation"
              className="flex size-9 cursor-pointer list-none items-center justify-center rounded-md border bg-background transition-colors hover:bg-muted [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-4" />
            </summary>

            <div className="absolute right-0 top-12 w-64 rounded-xl border bg-card p-2 shadow-xl">
              <nav className="space-y-1">
                <Link
                  href={
                    ROUTES.home
                  }
                  className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  Home
                </Link>

                <Link
                  href={
                    ROUTES.issues
                  }
                  className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  Issues
                </Link>

                <Link
                  href={
                    ROUTES.howItWorks
                  }
                  className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  How It Works
                </Link>

                <Link
                  href={
                    ROUTES.about
                  }
                  className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  About
                </Link>
              </nav>

              <div className="mt-2 border-t pt-2">
                {user ? (
                  <Link
                    href={
                      ROUTES.dashboard
                    }
                    className={`${buttonVariants(
                      {
                        variant:
                          "default",
                        size: "sm",
                      },
                    )} w-full`}
                  >
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                ) : (
                  <div className="grid gap-2">
                    <Link
                      href={
                        ROUTES.login
                      }
                      className={`${buttonVariants(
                        {
                          variant:
                            "outline",
                          size: "sm",
                        },
                      )} w-full`}
                    >
                      Sign in
                    </Link>

                    <Link
                      href={
                        ROUTES.register
                      }
                      className={`${buttonVariants(
                        {
                          variant:
                            "default",
                          size: "sm",
                        },
                      )} w-full`}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}