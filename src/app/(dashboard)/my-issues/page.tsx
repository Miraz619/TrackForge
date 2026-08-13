import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Issues",
};

export default function MyIssuesPage() {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">
        Workspace
      </p>

      <h1 className="mt-1 text-3xl font-semibold tracking-tight">
        My Issues
      </h1>

      <p className="mt-3 text-sm text-muted-foreground">
        Your reported issues will
        appear here.
      </p>
    </div>
  );
}