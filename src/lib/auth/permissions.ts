import type {
  User,
} from "@/types";

export function isMaintainer(
  user: User | null,
): boolean {
  return (
    user?.role ===
    "maintainer"
  );
}

export function isContributor(
  user: User | null,
): boolean {
  return (
    user?.role ===
    "contributor"
  );
}