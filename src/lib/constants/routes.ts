export const ROUTES = {
  home: "/",

  issues: "/issues",
  about: "/about",
  howItWorks: "/how-it-works",

  login: "/login",
  register: "/register",

  dashboard: "/dashboard",
  myIssues: "/my-issues",
  createIssue: "/create-issue",
  manageIssues: "/manage-issues",
} as const;

export const AUTH_ROUTES = [
  ROUTES.login,
  ROUTES.register,
] as const;

export const PROTECTED_ROUTES = [
  ROUTES.dashboard,
  ROUTES.myIssues,
  ROUTES.createIssue,
  ROUTES.manageIssues,
] as const;