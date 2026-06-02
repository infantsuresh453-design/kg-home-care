import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const getAdminSession = cache(async () => {
  if (!hasSupabaseEnv()) {
    return {
      configured: false,
      session: null,
      user: null,
    };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      configured: true,
      session: null,
      user: null,
    };
  }

  return {
    configured: true,
    session: { user },
    user,
  };
});

export async function requireAdminSession() {
  const auth = await getAdminSession();

  if (!auth.configured) {
    redirect("/login?setup=1");
  }

  if (!auth.user) {
    redirect("/login");
  }

  return auth.user;
}
