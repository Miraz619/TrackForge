export interface AuthActionState {
  error?: string;

  fieldErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
}