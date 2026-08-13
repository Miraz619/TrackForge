import type { UserRole } from "./auth.type";

export type IssueType =
  | "bug"
  | "feature_request";

export type IssueStatus =
  | "open"
  | "in_progress"
  | "resolved";

export type IssueSort =
  | "newest"
  | "oldest";

export interface IssueReporter {
  id: number;
  name: string;
  role: UserRole;
}

export interface Issue {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  reporter: IssueReporter;
  created_at: string;
  updated_at: string;
}

export interface IssueStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  bugs: number;
  featureRequests: number;
}

export interface IssueFilters {
  search?: string;
  type?: IssueType;
  status?: IssueStatus;
  sort?: IssueSort;
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}