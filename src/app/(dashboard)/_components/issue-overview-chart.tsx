"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface IssueOverviewChartProps {
  bugs: number;
  featureRequests: number;
}

interface ChartItem {
  name: string;
  value: number;
  color: string;
}

export function IssueOverviewChart({
  bugs,
  featureRequests,
}: IssueOverviewChartProps) {
  const data: ChartItem[] = [
    {
      name: "Bugs",
      value: bugs,
      color:
        "var(--issue-bug)",
    },
    {
      name:
        "Feature Requests",
      value: featureRequests,
      color:
        "var(--issue-feature)",
    },
  ];

  const total =
    bugs + featureRequests;

  if (total === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        No issue data yet.
      </div>
    );
  }

  return (
    <div>
      <div className="h-64">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={90}
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map(
                (item) => (
                  <Cell
                    key={
                      item.name
                    }
                    fill={
                      item.color
                    }
                  />
                ),
              )}
            </Pie>

            <Tooltip
              formatter={(
                value,
              ) => [
                Number(value),
                "Issues",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-issue-bug-soft p-3">
          <p className="text-xs font-medium text-issue-bug">
            Bugs
          </p>

          <p className="mt-1 text-lg font-semibold">
            {bugs}
          </p>
        </div>

        <div className="rounded-lg bg-issue-feature-soft p-3">
          <p className="text-xs font-medium text-issue-feature">
            Features
          </p>

          <p className="mt-1 text-lg font-semibold">
            {featureRequests}
          </p>
        </div>
      </div>
    </div>
  );
}