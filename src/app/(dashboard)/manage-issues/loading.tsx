export default function ManageIssuesLoading() {
  return (
    <div className="space-y-7 animate-pulse">
      <div>
        <div className="h-4 w-40 rounded bg-muted" />

        <div className="mt-3 h-10 w-64 rounded bg-muted" />

        <div className="mt-4 h-4 w-full max-w-xl rounded bg-muted" />

        <div className="mt-2 h-4 w-2/3 max-w-md rounded bg-muted" />
      </div>

      <div className="h-28 rounded-xl border bg-card lg:h-20" />

      <div className="h-4 w-48 rounded bg-muted" />

      <div className="space-y-4">
        {Array.from({
          length: 4,
        }).map(
          (_, index) => (
            <div
              key={index}
              className="h-64 rounded-xl border bg-card"
            />
          ),
        )}
      </div>
    </div>
  );
}