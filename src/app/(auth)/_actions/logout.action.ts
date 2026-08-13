"use server";

import { redirect } from "next/navigation";

import { clearAuthCookies } from "@/lib/auth/session";
import { ROUTES } from "@/lib/constants/routes";

export async function logoutAction() {
  await clearAuthCookies();

  redirect(ROUTES.login);
}