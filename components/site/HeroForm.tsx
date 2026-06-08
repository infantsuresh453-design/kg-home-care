"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createLeadAction } from "@/lib/actions/cms";
import { DEFAULT_ACTION_STATE } from "@/lib/cms.types";
import { Loader2 } from "lucide-react";

export function HeroForm() {
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
      className="w-full rounded-2xl border border-white/15 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
    >
      <h3 className="mb-1 text-lg font-bold text-white">Book a Service</h3>
      <p className="mb-6 text-sm text-white/60">
        Fill in your details and we&apos;ll connect on WhatsApp instantly.
      </p>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="hero-name" className="text-sm text-white/80">
            Name
          </Label>
          <Input
            id="hero-name"
            name="name"
            placeholder="Your name"
            required
            className="h-11 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-primary"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="hero-phone" className="text-sm text-white/80">
            Phone Number
          </Label>
          <Input
            id="hero-phone"
            name="phone"
            type="tel"
            placeholder="Your phone number"
            required
            className="h-11 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-primary"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="hero-location" className="text-sm text-white/80">
            Location / Area
          </Label>
          <Input
            id="hero-location"
            name="location"
            placeholder="Your area or locality"
            required
            className="h-11 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-primary"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="hero-service" className="text-sm text-white/80">
            Select a Service
          </Label>
          <select
            id="hero-service"
            name="service"
            required
            defaultValue=""
            className="h-11 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white outline-none transition-all focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled className="text-slate-800">Choose a service</option>
            <option value="Washing Machine Service" className="text-slate-800">Washing Machine Service</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="hero-issue" className="text-sm text-white/80">
            Issue
          </Label>
          <Textarea
            id="hero-issue"
            name="message"
            placeholder="Describe your washing machine issue"
            required
            rows={3}
            className="rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-primary"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="mt-2 h-12 w-full rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-[0_0_30px_-5px_rgba(0,87,255,0.4)] transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-[0_0_40px_-5px_rgba(0,87,255,0.6)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</>
          ) : (
            "Book Now"
          )}
        </Button>

        <p className="mt-3 text-center text-sm font-medium text-white/70">
          Visiting &amp; Service Charges – ₹400
        </p>
      </div>
    </form>
  );
}
