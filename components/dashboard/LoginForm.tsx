"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

type LoginFormProps = {
  setupMode?: boolean;
};

export function LoginForm({ setupMode = false }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      try {
        const supabase = createBrowserSupabaseClient();
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
          return;
        }

        toast.success("Signed in successfully.");
        router.push("/dashboard");
        router.refresh();
      } catch (caughtError) {
        const message =
          caughtError instanceof Error ? caughtError.message : "Unable to sign in.";
        setError(message);
      }
    });
  }

  return (
    <div className="w-full max-w-sm">
      {/* Logo / Brand */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
        <p className="mt-1 text-sm text-slate-400">KG Wash Masters</p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
        {setupMode && (
          <Alert className="mb-5 border-amber-500/30 bg-amber-500/10 text-amber-300">
            <AlertDescription className="text-xs leading-relaxed">
              Add <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, run{" "}
              <code className="font-mono">supabase/schema.sql</code>, then sign in.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-5 border-red-500/30 bg-red-500/10 text-red-300">
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        <form action={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-1 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} KG Wash Masters. All rights reserved.
      </p>
    </div>
  );
}
