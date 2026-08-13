"use client";

import Link from "next/link";
import {
  useActionState,
} from "react";

import {
  AlertCircle,
  Loader2,
  LogIn,
} from "lucide-react";

import { loginAction } from "../_actions/login.action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ROUTES } from "@/lib/constants/routes";

import type { AuthActionState } from "@/types";

const initialState: AuthActionState =
  {};

export function LoginForm() {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    loginAction,
    initialState,
  );

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
          aria-invalid={
            Boolean(
              state.fieldErrors
                ?.email,
            )
          }
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

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="password"
            className="text-sm font-medium"
          >
            Password
          </label>
        </div>

        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          aria-invalid={
            Boolean(
              state.fieldErrors
                ?.password,
            )
          }
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

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an
        account?{" "}
        <Link
          href={ROUTES.register}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}