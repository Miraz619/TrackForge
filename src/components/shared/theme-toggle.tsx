"use client";

import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useTheme,
} from "next-themes";

import {
  Button,
} from "@/components/ui/button";

import {
  cn,
} from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({
  className,
}: ThemeToggleProps) {
  const {
    resolvedTheme,
    setTheme,
  } = useTheme();

  function toggleTheme() {
    setTheme(
      resolvedTheme === "dark"
        ? "light"
        : "dark",
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "shrink-0",
        className,
      )}
      aria-label="Toggle color theme"
      title="Toggle theme"
      onClick={toggleTheme}
    >
      {/* Light mode icon */}
      <Moon className="size-4 dark:hidden" />

      {/* Dark mode icon */}
      <Sun className="hidden size-4 dark:block" />
    </Button>
  );
}