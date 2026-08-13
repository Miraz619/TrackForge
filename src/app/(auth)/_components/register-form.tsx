"use client";

import Link from "next/link";
import {
  useActionState,
} from "react";

import {
  AlertCircle,
  Loader2,
  UserPlus,
} from "lucide-react";

import { registerAction } from "../_actions/register.action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ROUTES } from "@/lib/constants/routes";

import type { AuthActionState } from "@/types";

const initialState: AuthActionState =
  {};

export function RegisterForm() {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    registerAction,
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
          htmlFor="name"
          className="text-sm font-medium"
        >
          Full name
        </label>

        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={
            Boolean(
              state.fieldErrors
                ?.name,
            )
          }
          required
        />

        {state.fieldErrors
          ?.name?.[0] && (
          <p className="text-sm text-destructive">
            {
              state.fieldErrors
                .name[0]
            }
          </p>
        )}
      </div>

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
          autoComplete="new-password"
          placeholder="At least 8 characters"
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
            Creating account...
          </>
        ) : (
          <>
            <UserPlus />
            Create account
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an
        account?{" "}
        <Link
          href={ROUTES.login}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}