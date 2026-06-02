import Link from "next/link";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { LoginForm } from "@/components/dashboard/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{ setup?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const setupMode = params.setup === "1" || !hasSupabaseEnv();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,87,255,0.14),_transparent_45%),linear-gradient(180deg,_white,_rgba(244,247,255,0.92))] px-4 py-12">
      <div className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-soft">
            KG Home Care CMS
          </div>
          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Manage services, SEO landing pages, and contact leads from one admin panel.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              This dashboard is wired for Supabase auth and content tables, with public-facing
              service pages and dynamic SEO routes tied to the same records.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="rounded-2xl border bg-white/70 p-4 shadow-soft">
              <div className="font-semibold text-foreground">Services</div>
              <p className="mt-1">Create, edit, duplicate, publish, and manage service detail pages.</p>
            </div>
            <div className="rounded-2xl border bg-white/70 p-4 shadow-soft">
              <div className="font-semibold text-foreground">SEO pages</div>
              <p className="mt-1">Maintain location landing pages with FAQ, schema-ready content, and metadata.</p>
            </div>
            <div className="rounded-2xl border bg-white/70 p-4 shadow-soft">
              <div className="font-semibold text-foreground">Leads</div>
              <p className="mt-1">Track incoming enquiries and move them from new to converted.</p>
            </div>
            <div className="rounded-2xl border bg-white/70 p-4 shadow-soft">
              <div className="font-semibold text-foreground">Setup</div>
              <p className="mt-1">Run `supabase/schema.sql`, create a public `images` bucket, then sign in.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Back to the public site:{" "}
            <Link href="/" className="font-medium text-primary hover:underline">
              view homepage
            </Link>
          </p>
        </div>

        <LoginForm setupMode={setupMode} />
      </div>
    </div>
  );
}
