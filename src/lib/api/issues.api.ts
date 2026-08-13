import "server-only";

import { apiFetch } from "./api-client";

import type {
  ApiResponse,
  Issue,
  IssueFilters,
  IssueStats,
  PaginatedApiResponse,
} from "@/types";

import type {
  IssueInput,
} from "@/schemas/issue.schema";

function buildIssueQuery(
  filters: IssueFilters = {},
) {
  const params =
    new URLSearchParams();

  if (filters.search) {
    params.set(
      "search",
      filters.search,
    );
  }

  if (filters.type) {
    params.set(
      "type",
      filters.type,
    );
  }

  if (filters.status) {
    params.set(
      "status",
      filters.status,
    );
  }

  if (filters.sort) {
    params.set(
      "sort",
      filters.sort,
    );
  }

  if (filters.page) {
    params.set(
      "page",
      String(filters.page),
    );
  }

  if (filters.limit) {
    params.set(
      "limit",
      String(filters.limit),
    );
  }

  const query =
    params.toString();

  return query
    ? `?${query}`
    : "";
}

export async function getIssues(
  accessToken: string,
  filters: IssueFilters = {},
) {
  return apiFetch<
    PaginatedApiResponse<Issue>
  >(
    `/api/issues${buildIssueQuery(
      filters,
    )}`,
    {
      method: "GET",
      accessToken,
    },
  );
}

export async function getMyIssues(
  accessToken: string,
  filters: IssueFilters = {},
) {
  return apiFetch<
    PaginatedApiResponse<Issue>
  >(
    `/api/issues/my${buildIssueQuery(
      filters,
    )}`,
    {
      method: "GET",
      accessToken,
    },
  );
}

export async function getIssueStats(
  accessToken: string,
) {
  return apiFetch<
    ApiResponse<IssueStats>
  >(
    "/api/issues/stats",
    {
      method: "GET",
      accessToken,
    },
  );
}

export async function getIssue(
  id: number,
  accessToken?: string,
) {
  return apiFetch<
    ApiResponse<Issue>
  >(
    `/api/issues/${id}`,
    {
      method: "GET",
      accessToken,
    },
  );
}

export async function createIssue(
  input: IssueInput,
  accessToken: string,
) {
  return apiFetch<
    ApiResponse<Issue>
  >(
    "/api/issues",
    {
      method: "POST",
      accessToken,
      body: input,
    },
  );
}

export async function updateIssue(
  id: number,
  input: IssueInput,
  accessToken: string,
) {
  return apiFetch<
    ApiResponse<Issue>
  >(
    `/api/issues/${id}`,
    {
      method: "PATCH",
      accessToken,
      body: input,
    },
  );
}