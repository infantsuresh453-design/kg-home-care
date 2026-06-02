export default function LeadsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-3xl border bg-white p-8 shadow-soft">
        <div className="h-8 w-48 rounded bg-slate-200 mb-2" />
        <div className="h-4 w-80 rounded bg-slate-200" />
      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-soft">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-secondary/60">
            <tr>
              {["Customer", "Request", "Status", "Received", "Action"].map((h) => (
                <th key={h} className="px-5 py-4">
                  <div className="h-4 w-20 rounded bg-slate-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, i) => (
              <tr key={i} className="border-t">
                <td className="px-5 py-4">
                  <div className="h-4 w-32 rounded bg-slate-200 mb-2" />
                  <div className="h-3 w-24 rounded bg-slate-200" />
                </td>
                <td className="px-5 py-4"><div className="h-4 w-40 rounded bg-slate-200" /></td>
                <td className="px-5 py-4"><div className="h-6 w-20 rounded-full bg-slate-200" /></td>
                <td className="px-5 py-4"><div className="h-4 w-32 rounded bg-slate-200" /></td>
                <td className="px-5 py-4"><div className="h-4 w-12 rounded bg-slate-200" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
