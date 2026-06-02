import Link from "next/link";
import { format } from "date-fns";
import { getDashboardLeads } from "@/lib/cms";

export default async function LeadsPage() {
  const leads = await getDashboardLeads();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">Contact Leads</h1>
        <p className="mt-1 text-sm text-slate-400">Review every incoming enquiry and move it through your pipeline.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                {["Customer", "Request", "Status", "Received", "Action"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-slate-700/60 transition-colors hover:bg-slate-800">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{lead.name}</p>
                    <p className="text-xs text-slate-400">{lead.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-300">
                    {lead.service || "General enquiry"}
                    {lead.location ? ` · ${lead.location}` : ""}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${lead.status === "New" ? "bg-blue-500/20 text-blue-300" : lead.status === "Converted" ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-300"}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400">
                    {lead.created_at ? format(new Date(lead.created_at), "dd MMM yyyy, p") : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/dashboard/leads/${lead.id}`} className="text-xs font-semibold text-blue-400 hover:underline">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-slate-500">No leads yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
