import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Enter a valid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long"),

  email: z
    .email("Enter a valid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export type LoginInput =
  z.infer<typeof loginSchema>;

export type RegisterInput =
  z.infer<typeof registerSchema>;