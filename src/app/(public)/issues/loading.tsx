export default function IssuesLoading() {
  return (
    <main className="animate-pulse">
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="h-4 w-40 rounded bg-muted" />

          <div className="mt-5 h-12 w-full max-w-2xl rounded bg-muted" />

          <div className="mt-3 h-12 w-full max-w-xl rounded bg-muted" />

          <div className="mt-6 h-5 w-full max-w-xl rounded bg-muted" />

          <div className="mt-7 h-10 w-36 rounded bg-muted" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-28 rounded-xl border bg-card lg:h-20" />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map(
            (_, index) => (
              <div
                key={index}
                className="h-64 rounded-xl border bg-card"
              />
            ),
          )}
        </div>
      </section>
    </main>
  );
}