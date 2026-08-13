export default function MyIssuesLoading() {
  return (
    <div className="space-y-7 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-4 w-36 rounded bg-muted" />

        <div className="mt-3 h-10 w-56 rounded bg-muted" />

        <div className="mt-4 h-4 w-full max-w-xl rounded bg-muted" />

        <div className="mt-2 h-4 w-2/3 max-w-md rounded bg-muted" />
      </div>

      {/* Filters */}
      <div className="h-28 rounded-xl border bg-card lg:h-20" />

      {/* Result */}
      <div className="h-4 w-40 rounded bg-muted" />

      {/* Cards */}
      <div className="space-y-4">
        {Array.from({
          length: 4,
        }).map(
          (_, index) => (
            <div
              key={index}
              className="h-44 rounded-xl border bg-card"
            />
          ),
        )}
      </div>
    </div>
  );
}