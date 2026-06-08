import Link from "next/link";
import { BUSINESS, PHONE_DISPLAY, telHref, waHref } from "@/lib/contact";
import { MapPin, Phone, Clock } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#07090f] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {/* ── Brand + contact ── */}
        <div>
          <span className="text-base font-extrabold tracking-tight text-white">KG Home Care</span>
          <p className="mt-1 text-xs font-medium text-white/40">Washing Machine Service Centre</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
            Tuticorin&apos;s trusted washing machine service, installation and maintenance — certified technicians, genuine parts.
          </p>
          <div className="mt-5 space-y-2.5">
            <a href={telHref()} className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white">
              <Phone className="h-3.5 w-3.5 text-primary" /> {PHONE_DISPLAY}
            </a>
            <a href={waHref()} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white">
              <WhatsAppIcon className="h-3.5 w-3.5 text-[#25d366]" /> WhatsApp Support
            </a>
            <p className="flex items-center gap-2.5 text-sm text-white/60">
              <Clock className="h-3.5 w-3.5 text-primary" /> {BUSINESS.hours}
            </p>
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/" className="text-white/55 hover:text-white">Home</Link></li>
            <li><Link href="/services" className="text-white/55 hover:text-white">Services</Link></li>
            <li><Link href="/about" className="text-white/55 hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="text-white/55 hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* ── Locations ── */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Locations</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/thoothukudi" className="text-white/55 hover:text-white">Thoothukudi</Link></li>
          </ul>
        </div>

        {/* ── Location ── */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Location</h3>
          <div className="mt-4 flex items-start gap-2.5 text-sm text-white/55">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              {BUSINESS.address.line1}<br />
              {BUSINESS.address.line2}<br />
              {BUSINESS.address.city}, {BUSINESS.address.state}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/30 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
          <p>Tuticorin, Tamil Nadu.</p>
        </div>
      </div>
    </footer>
  );
}
