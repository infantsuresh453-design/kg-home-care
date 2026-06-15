"use client";

import { Phone } from "lucide-react";
import { telHref, waHref } from "@/lib/contact";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { usePathname } from "next/navigation";

export function FloatingActions() {
  const pathname = usePathname();

  // Hide on standard non-SEO pages
  const isExcluded = 
    pathname === "/" || 
    pathname === "/about" || 
    pathname === "/contact" || 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/login");

  if (isExcluded) return null;

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
      <a
        href={waHref("Hi, I need washing machine service.")}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp us"
        className="flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_-4px_rgba(37,211,102,0.5)] transition-all hover:scale-105 hover:bg-[#25D366]/90 active:scale-95"
      >
        <WhatsAppIcon className="h-5 w-5 text-white" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      
      <a
        href={telHref()}
        aria-label="Call us"
        className="flex items-center gap-2.5 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_-4px_rgba(24,95,165,0.5)] transition-all hover:scale-105 hover:bg-primary/90 active:scale-95"
      >
        <Phone className="h-5 w-5" />
        <span className="hidden sm:inline">Call Now</span>
      </a>
    </div>
  );
}
