"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createLeadAction } from "@/lib/actions/cms";
import { DEFAULT_ACTION_STATE } from "@/lib/cms.types";

export function ServiceHeroForm() {
  const [state, formAction, pending] = useActionState(createLeadAction, DEFAULT_ACTION_STATE);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success("Request submitted! Redirecting to WhatsApp...");
      window.open(state.message, "_blank", "noopener,noreferrer");
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="w-full rounded-3xl bg-white p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] sm:p-8"
    >
      <div className="mb-6">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          Quick Booking
        </span>
        <h3 className="mt-3 text-xl font-extrabold text-slate-900">
          Get a technician today
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Fill your details — we&apos;ll call back in 15 minutes.
        </p>
      </div>

      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Your name"
            name="name"
            required
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10"
          />
          <input
            type="tel"
            placeholder="Phone number"
            name="phone"
            required
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10"
          />
        </div>

        <input
          placeholder="Your area or locality"
          name="location"
          required
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10"
        />

        <textarea
          placeholder="Describe your issue (e.g. not spinning, water leaking...)"
          name="message"
          required
          rows={3}
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10"
        />

        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="group mt-1 h-12 w-full rounded-xl bg-primary text-sm font-bold text-white shadow-[0_4px_16px_-4px_rgba(24,95,165,0.4)] transition-all hover:-translate-y-px hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</>
          ) : (
            <>
              Book Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>

      <p className="mt-4 text-center text-[11px] text-slate-400">
        Same-day service · No advance payment · Written warranty
      </p>
    </form>
  );
}
