"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createLeadAction } from "@/lib/actions/cms";
import { DEFAULT_ACTION_STATE } from "@/lib/cms.types";
import { User, Phone, MapPin, MessageSquare, ArrowRight, Loader2 } from "lucide-react";

const inputBase =
  "w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 pl-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#185FA5]/50 focus:bg-white focus:ring-2 focus:ring-[#185FA5]/10";

export function LeadCaptureForm() {
  const [state, formAction, pending] = useActionState(createLeadAction, DEFAULT_ACTION_STATE);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      // state.message contains the WhatsApp URL on success
      toast.success("Request submitted! Redirecting to WhatsApp...");
      window.open(state.message, "_blank", "noopener,noreferrer");
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      {/* Row 1: Name + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="lead-name" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Name <span className="text-[#185FA5]">*</span>
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input id="lead-name" name="name" required placeholder="Your full name" className={inputBase} />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="lead-phone" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Phone <span className="text-[#185FA5]">*</span>
          </label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input id="lead-phone" name="phone" required placeholder="+91 XXXXX XXXXX" className={inputBase} />
          </div>
        </div>
      </div>

      {/* Location / Area */}
      <div className="space-y-1.5">
        <label htmlFor="lead-location" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Location / Area <span className="text-[#185FA5]">*</span>
        </label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input id="lead-location" name="location" required placeholder="Your area or locality" className={inputBase} />
        </div>
      </div>

      {/* Issue */}
      <div className="space-y-1.5">
        <label htmlFor="lead-message" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <MessageSquare className="h-3.5 w-3.5" />
          Issue <span className="text-[#185FA5]">*</span>
        </label>
        <textarea
          id="lead-message"
          name="message"
          required
          rows={3}
          placeholder="e.g. machine not spinning, water leaking, error code E3…"
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#185FA5]/50 focus:bg-white focus:ring-2 focus:ring-[#185FA5]/10"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#185FA5] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_-4px_rgba(24,95,165,0.45)] transition-all hover:bg-[#185FA5]/90 hover:-translate-y-px active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
        ) : (
          <>Book Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
        )}
      </button>

      <p className="text-center text-[11px] text-slate-400">
        We respond in under 30 minutes · Mon – Sun, 8 AM – 9 PM
      </p>
    </form>
  );
}
