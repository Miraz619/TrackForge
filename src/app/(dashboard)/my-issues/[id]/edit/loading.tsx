export default function EditIssueLoading() {
  return (
    <div className="mx-auto max-w-4xl space-y-7 animate-pulse">
      <div>
        <div className="h-4 w-24 rounded bg-muted" />

        <div className="mt-3 h-10 w-48 rounded bg-muted" />

        <div className="mt-4 h-4 w-full max-w-lg rounded bg-muted" />
      </div>

      <div className="h-20 rounded-xl border bg-card" />

      <div className="h-[540px] rounded-xl border bg-card" />
    </div>
  );
}