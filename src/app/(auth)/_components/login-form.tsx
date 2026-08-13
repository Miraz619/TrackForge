"use client";

import Link from "next/link";
import {
  useActionState,
  useState,
} from "react";

import {
  AlertCircle,
  Loader2,
  LogIn,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  loginAction,
} from "../_actions/login.action";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  ROUTES,
} from "@/lib/constants/routes";

import type {
  AuthActionState,
} from "@/types";

const initialState: AuthActionState = {};

const DEMO_ACCOUNTS = {
  contributor: {
    email: "sumon43@gmail.com",
    password: "skafda231#",
  },

  maintainer: {
    email: "miraz456@gmail.com",
    password: "adfafda345@",
  },
} as const;

type DemoRole =
  keyof typeof DEMO_ACCOUNTS;

export function LoginForm() {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    loginAction,
    initialState,
  );

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    selectedDemo,
    setSelectedDemo,
  ] = useState<DemoRole | null>(
    null,
  );

  function fillDemoCredentials(
    role: DemoRole,
  ) {
    const account =
      DEMO_ACCOUNTS[role];

    setEmail(account.email);
    setPassword(account.password);
    setSelectedDemo(role);
  }

  return (
    <form
      action={formAction}
      className="space-y-5"
    >
      {state.error && (
        <div
          role="alert"
          className="flex gap-2.5 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />

          <p>{state.error}</p>
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium"
        >
          Email address
        </label>

        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(
              event.target.value,
            );

            setSelectedDemo(null);
          }}
          aria-invalid={Boolean(
            state.fieldErrors?.email,
          )}
          required
        />

        {state.fieldErrors
          ?.email?.[0] && (
          <p className="text-sm text-destructive">
            {
              state.fieldErrors
                .email[0]
            }
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium"
        >
          Password
        </label>

        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => {
            setPassword(
              event.target.value,
            );

            setSelectedDemo(null);
          }}
          aria-invalid={Boolean(
            state.fieldErrors
              ?.password,
          )}
          required
        />

        {state.fieldErrors
          ?.password?.[0] && (
          <p className="text-sm text-destructive">
            {
              state.fieldErrors
                .password[0]
            }
          </p>
        )}
      </div>

      {/* Sign in */}
      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            <LogIn />
            Sign in
          </>
        )}
      </Button>

      {/* Demo role shortcuts */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />

          <span className="text-xs text-muted-foreground">
            Demo login
          </span>

          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              fillDemoCredentials(
                "contributor",
              )
            }
            className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
              selectedDemo ===
              "contributor"
                ? "border-brand bg-brand-soft text-brand"
                : "bg-background text-muted-foreground hover:border-brand/30 hover:bg-brand-soft/40 hover:text-foreground"
            }`}
          >
            <UserRound className="size-4" />
            Contributor
          </button>

          <button
            type="button"
            onClick={() =>
              fillDemoCredentials(
                "maintainer",
              )
            }
            className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
              selectedDemo ===
              "maintainer"
                ? "border-brand bg-brand-soft text-brand"
                : "bg-background text-muted-foreground hover:border-brand/30 hover:bg-brand-soft/40 hover:text-foreground"
            }`}
          >
            <ShieldCheck className="size-4" />
            Maintainer
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an
        account?{" "}
        <Link
          href={ROUTES.register}
          className="font-medium text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}