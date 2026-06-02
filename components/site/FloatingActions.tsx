import { telHref, waHref, bookingMessage } from "@/lib/contact";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FloatingActions() {
  return (
    /* Floating WhatsApp button — fixed bottom-right on mobile */
    <a
      href={waHref(bookingMessage({}))}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-4 z-50 flex items-center gap-2.5 rounded-full bg-[#25d366] px-5 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_-4px_rgba(37,211,102,0.6)] transition-all hover:scale-105 hover:bg-[#22c55e] active:scale-95 sm:right-6"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
