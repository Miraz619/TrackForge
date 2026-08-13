import Link from "next/link";
import { GitBranch } from "lucide-react";

import { APP_CONFIG } from "@/lib/constants/app";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({
  className,
  showText = true,
}: LogoProps) {
  return (
    <Link
      href={ROUTES.home}
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
        <GitBranch className="size-4" />
      </span>

      {showText && (
        <span className="text-lg">
          {APP_CONFIG.name}
        </span>
      )}
    </Link>
  );
}