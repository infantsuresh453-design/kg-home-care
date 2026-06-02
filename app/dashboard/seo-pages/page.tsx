import Link from "next/link";
import { deleteSeoPageAction } from "@/lib/actions/cms";
import { getDashboardSeoPages } from "@/lib/cms";

export default async function DashboardSeoPagesPage() {
  const pages = await getDashboardSeoPages();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">SEO Pages</h1>
          <p className="mt-1 text-sm text-slate-400">Create landing pages for locations, services, and search intent.</p>
        </div>
        <Link href="/dashboard/seo-pages/new" className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary/90">
          + Add SEO page
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                {["Page", "Slug", "Template", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-t border-slate-700/60 align-top transition-colors hover:bg-slate-800">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{page.title}</p>
                    <p className="text-xs text-slate-400">{page.location || page.heading}</p>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400">/{page.slug}</td>
                  <td className="px-5 py-4 text-slate-300">{page.template}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${page.status === "Published" ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-300"}`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <Link href={`/dashboard/seo-pages/${page.id}/edit`} className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700">
                        Edit
                      </Link>
                      <form action={deleteSeoPageAction.bind(null, page.id, page.image_url, page.slug)}>
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
