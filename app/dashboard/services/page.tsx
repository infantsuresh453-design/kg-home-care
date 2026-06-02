import Link from "next/link";
import { deleteServiceAction, duplicateServiceAction } from "@/lib/actions/cms";
import { getDashboardServices } from "@/lib/cms";

export default async function DashboardServicesPage() {
  const services = await getDashboardServices();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Services</h1>
          <p className="mt-1 text-sm text-slate-400">Manage the public service catalog and detail pages.</p>
        </div>
        <Link href="/dashboard/services/new" className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary/90">
          + Add service
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                {["Service", "Slug", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-t border-slate-700/60 align-top transition-colors hover:bg-slate-800">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{service.name}</p>
                    <p className="max-w-xs truncate text-xs text-slate-400">{service.description}</p>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400">/services/{service.slug}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${service.status === "Active" ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-300"}`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <Link href={`/dashboard/services/${service.id}/edit`} className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700">
                        Edit
                      </Link>
                      <form action={duplicateServiceAction.bind(null, service.id)}>
                        <button type="submit" className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700">
                          Duplicate
                        </button>
                      </form>
                      <form action={deleteServiceAction.bind(null, service.id, service.image_url, service.slug)}>
                        <button type="submit" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
