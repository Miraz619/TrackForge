export default function IssueDetailsLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="animate-pulse">
          <div className="mb-8 h-9 w-36 rounded bg-muted" />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="h-[460px] rounded-xl border bg-card" />

            <div className="h-80 rounded-xl border bg-card" />
          </div>
        </div>
      </div>
    </main>
  );
}