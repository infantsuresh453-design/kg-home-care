import { Phone } from "lucide-react";
import { telHref, PHONE_DISPLAY } from "@/lib/contact";

export function FloatingActions() {
  return (
    <a
      href={telHref()}
      aria-label="Call us"
      className="fixed bottom-5 right-4 z-50 flex items-center gap-2.5 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_-4px_rgba(24,95,165,0.5)] transition-all hover:scale-105 hover:bg-primary/90 active:scale-95 sm:right-6"
    >
      <Phone className="h-5 w-5" />
      <span className="hidden sm:inline">Call Now</span>
    </a>
  );
}
