"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
    <Card className="border-border/70 shadow-soft">
      <CardHeader>
        <CardTitle>Admin sign in</CardTitle>
        <CardDescription>
          Use your Supabase-authenticated admin account to manage services, SEO pages, and leads.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {setupMode ? (
          <Alert>
            <AlertTitle>Setup required</AlertTitle>
            <AlertDescription>
              Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, run the SQL in
              `supabase/schema.sql`, then sign in with an authenticated Supabase user.
            </AlertDescription>
          </Alert>
        ) : null}

        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Sign in failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
