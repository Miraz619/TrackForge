export type UserRole =
  | "contributor"
  | "maintainer";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}