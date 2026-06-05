"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { BRANDS } from "@/lib/contact";
import { createLeadAction } from "@/lib/actions/cms";
import { DEFAULT_ACTION_STATE } from "@/lib/cms.types";
import { toast } from "sonner";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";

const ISSUES = [
  "Not Starting", "Water Leakage", "No Spin", "Excessive Noise",
  "Door Lock Issue", "Drum Not Rotating", "PCB Failure", "Motor Problem",
  "Installation",
];

export function QuickBookingBar() {
  const [brand, setBrand] = useState<string | undefined>();
  const [issue, setIssue] = useState<string | undefined>();
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
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-2 shadow-2xl backdrop-blur-xl sm:p-3"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      {/* Hidden inputs for select values */}
      <input type="hidden" name="brand" value={brand ?? ""} />
      <input type="hidden" name="message" value={issue ?? ""} />
      <input type="hidden" name="service" value="Washing Machine Service" />

      <div className="grid gap-2 md:grid-cols-[1.2fr_1fr_1fr_1.2fr_auto] md:gap-3">
        <Input
          name="location"
          placeholder="Location (area / pincode)"
          className="h-14 rounded-2xl border-white/10 bg-white/5 px-5 text-sm font-medium text-white placeholder:text-white/40 transition-all hover:bg-white/10 focus-visible:bg-white/15 focus-visible:ring-1 focus-visible:ring-white/30"
        />

        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger className="h-14 rounded-2xl border-white/10 bg-white/5 px-5 text-sm font-medium text-white transition-all hover:bg-white/10 data-[state=open]:bg-white/15">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-background/95 backdrop-blur-xl">
            {BRANDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={issue} onValueChange={setIssue}>
          <SelectTrigger className="h-14 rounded-2xl border-white/10 bg-white/5 px-5 text-sm font-medium text-white transition-all hover:bg-white/10 data-[state=open]:bg-white/15">
            <SelectValue placeholder="Issue" />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-background/95 backdrop-blur-xl">
            {ISSUES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
          </SelectContent>
        </Select>

        <Input
          name="phone"
          type="tel"
          required
          placeholder="Phone Number"
          className="h-14 rounded-2xl border-white/10 bg-white/5 px-5 text-sm font-medium text-white placeholder:text-white/40 transition-all hover:bg-white/10 focus-visible:bg-white/15 focus-visible:ring-1 focus-visible:ring-white/30"
        />

        {/* Hidden name field — QuickBookingBar uses phone as identifier */}
        <input type="hidden" name="name" value="Quick Booking Lead" />

        <Button
          type="submit"
          disabled={pending}
          className="group h-14 rounded-2xl bg-primary px-8 text-sm font-bold text-primary-foreground shadow-[0_0_30px_-5px_rgba(0,87,255,0.4)] transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-[0_0_40px_-5px_rgba(0,87,255,0.6)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Book Technician
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5 px-2 text-xs font-medium text-white/50">
        <Sparkles className="h-3.5 w-3.5 text-accent" />
        <span>Your details are saved & sent via WhatsApp — we usually reply within 10 minutes.</span>
      </div>
    </form>
  );
}
