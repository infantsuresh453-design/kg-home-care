import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { signOutAdmin } from "@/lib/actions/cms";
import { LayoutDashboard, Users, FileText, LogOut, Wrench } from "lucide-react";

const NAV = [
  { href: "/dashboard",           label: "Overview",      icon: LayoutDashboard },
  { href: "/dashboard/leads",     label: "Contact Leads", icon: Users           },
  { href: "/dashboard/seo-pages", label: "SEO Pages",     icon: FileText        },
  { href: "/dashboard/services",  label: "Services",      icon: Wrench          },
];

export default async function DashboardLayout({
  children,
  params: _params,
}: {
  children: React.ReactNode;
  params: Promise<Record<string, string>>;
}) {
  const auth = await getAdminSession();
  if (!auth.configured) redirect("/login?setup=1");
  if (!auth.user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-slate-900">

      {/* ── Sidebar ── */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-slate-700 bg-slate-900">
        {/* brand */}
        <div className="border-b border-slate-700 px-5 py-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Admin Dashboard</p>
          <p className="mt-1 text-base font-extrabold text-white">KG Home Care</p>
        </div>

        {/* nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <Icon className="h-4 w-4 shrink-0 text-slate-400" />
              {label}
            </Link>
          ))}
        </nav>

        {/* user + sign out */}
        <div className="space-y-1 border-t border-slate-700 px-3 py-4">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-black text-white">
              {auth.user.email?.[0]?.toUpperCase() ?? "A"}
            </span>
            <p className="truncate text-xs font-medium text-slate-300">{auth.user.email}</p>
          </div>
          <form action={signOutAdmin}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Content area ── */}
      <div className="flex flex-1 flex-col overflow-hidden bg-slate-800">
        {/* top bar */}
        <header className="flex h-14 shrink-0 items-center border-b border-slate-700 bg-slate-900 px-6">
          <div className="ml-auto flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-xs font-medium text-slate-400">Live</span>
          </div>
        </header>

        {/* page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
