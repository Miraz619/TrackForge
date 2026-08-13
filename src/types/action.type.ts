export interface AuthActionState {
  error?: string;

  fieldErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
}

export interface IssueActionState {
  error?: string;

  fieldErrors?: {
    title?: string[];
    description?: string[];
    type?: string[];
  };
}

export interface MaintainerActionState {
  error?: string;
  success?: string;
}