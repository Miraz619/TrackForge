import {
  CirclePlus,
  LayoutDashboard,
  ListTodo,
  Settings2,
  type LucideIcon,
} from "lucide-react";

import { ROUTES } from "@/lib/constants/routes";
import type { UserRole } from "@/types";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: UserRole[];
}

export const dashboardNavigation: DashboardNavItem[] = [
  {
    label: "Overview",
    href: ROUTES.dashboard,
    icon: LayoutDashboard,
  },
  {
    label: "My Issues",
    href: ROUTES.myIssues,
    icon: ListTodo,
  },
  {
    label: "Create Issue",
    href: ROUTES.createIssue,
    icon: CirclePlus,
  },
  {
    label: "Manage Issues",
    href: ROUTES.manageIssues,
    icon: Settings2,
    roles: ["maintainer"],
  },
];