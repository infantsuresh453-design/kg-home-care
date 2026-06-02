export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-[2rem] border bg-white p-8 shadow-soft">
        <div className="h-4 w-24 rounded bg-slate-200 mb-3" />
        <div className="h-8 w-72 rounded bg-slate-200 mb-2" />
        <div className="h-4 w-96 rounded bg-slate-200" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-3xl border bg-white p-6 shadow-soft">
            <div className="h-4 w-24 rounded bg-slate-200 mb-3" />
            <div className="h-10 w-16 rounded bg-slate-200 mb-2" />
            <div className="h-4 w-32 rounded bg-slate-200" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-3xl border bg-white p-6 shadow-soft">
            <div className="h-6 w-32 rounded bg-slate-200 mb-4" />
            {[...Array(4)].map((_, j) => (
              <div key={j} className="rounded-2xl border p-4 mb-3">
                <div className="h-4 w-40 rounded bg-slate-200 mb-2" />
                <div className="h-3 w-24 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
