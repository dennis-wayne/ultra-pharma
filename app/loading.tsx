export default function Loading() {
  return (
    <div className="shell pb-24 pt-44" role="status" aria-label="Loading page">
      <span className="sr-only">Loading page...</span>
      <div aria-hidden className="mx-auto max-w-[720px] space-y-6">
        <div className="mx-auto h-5 w-32 rounded-full bg-paper-sunk" />
        <div className="mx-auto h-16 max-w-[480px] animate-pulse rounded-2xl bg-paper-sunk" />
        <div className="mx-auto h-5 w-4/5 rounded-full bg-paper-sunk" />
        <div className="mt-16 h-64 rounded-3xl border border-rule bg-paper-sunk" />
      </div>
    </div>
  );
}
