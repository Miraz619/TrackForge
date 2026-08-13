import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Issue",
};

export default function CreateIssuePage() {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">
        New report
      </p>

      <h1 className="mt-1 text-3xl font-semibold tracking-tight">
        Create Issue
      </h1>

      <p className="mt-3 text-sm text-muted-foreground">
        The issue creation form
        will be added here next.
      </p>
    </div>
  );
}