export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-4 w-36 rounded bg-muted" />

        <div className="mt-3 h-10 w-72 max-w-full rounded bg-muted" />

        <div className="mt-4 h-4 w-full max-w-xl rounded bg-muted" />

        <div className="mt-2 h-4 w-2/3 max-w-md rounded bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-xl border bg-card"
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="h-96 rounded-xl border bg-card" />

        <div className="h-96 rounded-xl border bg-card" />
      </div>
    </div>
  );
}