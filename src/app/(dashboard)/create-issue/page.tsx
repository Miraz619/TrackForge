import type {
  Metadata,
} from "next";

import {
  CircleCheck,
  FileText,
  SearchCheck,
} from "lucide-react";

import {
  Card,
} from "@/components/ui/card";

import {
  CreateIssueForm,
} from "../_components/create-issue-form";

export const metadata: Metadata = {
  title: "Create Issue",
  description:
    "Report a bug or submit a feature request to TrackForge.",
};

const tips = [
  {
    title:
      "Use a specific title",
    description:
      "Describe the actual problem or requested improvement.",
    icon: FileText,
  },

  {
    title:
      "Add useful context",
    description:
      "Explain what happened and what you expected instead.",
    icon: SearchCheck,
  },

  {
    title:
      "Choose the right type",
    description:
      "Select Bug for problems and Feature Request for improvements.",
    icon: CircleCheck,
  },
];

export default function CreateIssuePage() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-brand">
          New report
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Create Issue
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Report a bug or
          suggest an improvement.
          Clear reports help
          maintainers understand
          and resolve issues
          faster.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="p-5 sm:p-7">
          <CreateIssueForm />
        </Card>

        <aside className="space-y-4">
          <div className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">
              Writing a good issue
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              A focused report is
              easier to understand,
              prioritize, and
              resolve.
            </p>

            <div className="mt-6 space-y-5">
              {tips.map(
                ({
                  title,
                  description,
                  icon: Icon,
                }) => (
                  <div
                    key={title}
                    className="flex gap-3"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                      <Icon className="size-4" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {
                          description
                        }
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="rounded-xl border border-brand/15 bg-brand-soft/50 p-5">
            <p className="text-sm font-medium text-brand">
              Initial status
            </p>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Every new issue is
              automatically
              created with an{" "}
              <strong className="font-medium text-status-open">
                Open
              </strong>{" "}
              status.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}