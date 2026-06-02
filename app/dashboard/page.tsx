import Link from "next/link";
import { getDashboardLeads, getDashboardSeoPages, getDashboardServices } from "@/lib/cms";
import { Users, FileText, Wrench, TrendingUp } from "lucide-react";

function StatCard({
  label, value, helper, icon: Icon, accent,
}: {
  label: string; value: number; helper: string;
  icon: React.ElementType; accent: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-400">{label}</p>
        <span className={`grid h-9 w-9 place-items-center rounded-xl ${accent}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-4 text-4xl font-black tracking-tight text-white">{value}</p>
      <p className="mt-1.5 text-xs text-slate-500">{helper}</p>
    </div>
  );
}

export default async function DashboardHomePage() {
  const [leads, seoPages, services] = await Promise.all([
    getDashboardLeads(),
    getDashboardSeoPages(),
    getDashboardServices(),
  ]);

  const newLeads       = leads.filter((l) => l.status === "New").length;
  const publishedSeo   = seoPages.filter((p) => p.status === "Published").length;
  const activeServices = services.filter((s) => s.status === "Active").length;
  const converted      = leads.filter((l) => l.status === "Converted").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">Overview</h1>
        <p className="mt-1 text-sm text-slate-400">Welcome back. Here's what's happening.</p>
      </div>

      {/* stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total leads"     value={leads.length}   helper={`${newLeads} need response`}      icon={Users}      accent="bg-blue-500/20 text-blue-400"    />
        <StatCard label="SEO pages"       value={seoPages.length} helper={`${publishedSeo} live`}          icon={FileText}   accent="bg-violet-500/20 text-violet-400" />
        <StatCard label="Services"        value={services.length} helper={`${activeServices} active`}      icon={Wrench}     accent="bg-emerald-500/20 text-emerald-400" />
        <StatCard label="Converted leads" value={converted}       helper="Closed business"                 icon={TrendingUp} accent="bg-amber-500/20 text-amber-400"   />
      </div>

      {/* tables */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* latest leads */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Latest leads</h2>
            <Link href="/dashboard/leads" className="text-xs font-semibold text-blue-400 hover:underline">View all</Link>
          </div>
          <div className="mt-4 space-y-2">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">{lead.name}</p>
                  <p className="text-xs text-slate-400">{lead.phone}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${lead.status === "New" ? "bg-blue-500/20 text-blue-300" : lead.status === "Converted" ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-300"}`}>
                  {lead.status}
                </span>
              </div>
            ))}
            {leads.length === 0 && <p className="py-6 text-center text-sm text-slate-500">No leads yet.</p>}
          </div>
        </div>

        {/* recent content */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Recent content</h2>
            <Link href="/dashboard/seo-pages" className="text-xs font-semibold text-blue-400 hover:underline">Manage</Link>
          </div>
          <div className="mt-4 space-y-2">
            {[...seoPages.slice(0, 3), ...services.slice(0, 3)].map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">{"name" in item ? item.name : item.title}</p>
                  <p className="text-xs text-slate-400">/{item.slug}</p>
                </div>
                <span className="rounded-full bg-slate-700 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300">
                  {"status" in item ? item.status : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
