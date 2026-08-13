import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title cannot exceed 150 characters"),

  description: z
    .string()
    .trim()
    .min(
      20,
      "Description must be at least 20 characters",
    ),

  type: z.enum([
    "bug",
    "feature_request",
  ]),
});

export const maintainerIssueUpdateSchema =
  issueSchema.partial().extend({
    status: z
      .enum([
        "open",
        "in_progress",
        "resolved",
      ])
      .optional(),
  });

export type IssueInput =
  z.infer<typeof issueSchema>;

export type MaintainerIssueUpdateInput =
  z.infer<
    typeof maintainerIssueUpdateSchema
  >;