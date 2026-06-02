export default function ServicesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border bg-white p-8 shadow-soft">
        <div>
          <div className="h-8 w-32 rounded bg-slate-200 mb-2" />
          <div className="h-4 w-72 rounded bg-slate-200" />
        </div>
        <div className="h-10 w-28 rounded-lg bg-slate-200" />
      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-soft">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-secondary/60">
            <tr>
              {["Service", "Slug", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-4">
                  <div className="h-4 w-20 rounded bg-slate-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-t">
                <td className="px-5 py-4">
                  <div className="h-4 w-40 rounded bg-slate-200 mb-2" />
                  <div className="h-3 w-56 rounded bg-slate-200" />
                </td>
                <td className="px-5 py-4"><div className="h-4 w-36 rounded bg-slate-200" /></td>
                <td className="px-5 py-4"><div className="h-6 w-16 rounded-full bg-slate-200" /></td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <div className="h-8 w-14 rounded-lg bg-slate-200" />
                    <div className="h-8 w-20 rounded-lg bg-slate-200" />
                    <div className="h-8 w-16 rounded-lg bg-slate-200" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
