"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/faqs";

export { FAQS };

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-slate-50/60"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[10px] font-bold transition-colors ${isOpen ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-sm font-semibold transition-colors ${isOpen ? "text-primary" : "text-slate-800"}`}>
                  {f.q}
                </span>
              </div>
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"}`}>
                {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              </span>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48" : "max-h-0"}`}>
              <div className="border-t border-slate-100 bg-slate-50/50 px-6 pb-5 pt-3">
                <p className="ml-9 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
