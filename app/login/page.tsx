import type { Metadata } from "next";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { LoginForm } from "@/components/dashboard/LoginForm";

export const metadata: Metadata = {
  title: "Login — KG Home Care Dashboard",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ setup?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const setupMode = params.setup === "1" || !hasSupabaseEnv();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <LoginForm setupMode={setupMode} />
    </div>
  );
}
