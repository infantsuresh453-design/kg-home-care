import { Phone, CalendarCheck, Clock, MapPin } from "lucide-react";
import { telHref, waHref, bookingMessage, PHONE_DISPLAY, BUSINESS } from "@/lib/contact";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function ContactCTA() {
  return (
    <div
      id="book"
      className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,87,255,0.35)]"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #0f2a6b 55%, #1e40af 100%)",
      }}
    >
      {/* large blue-purple glow — center */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/25 blur-[140px]" />
      {/* corner glows */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/30 blur-[90px]" />

      {/* floating geometric shapes */}
      {/* top-right ring */}
      <div className="pointer-events-none absolute right-16 top-8 h-32 w-32 rounded-full border-[3px] border-white/5" />
      <div className="pointer-events-none absolute right-24 top-16 h-16 w-16 rounded-full border-2 border-white/8" />
      {/* bottom-left ring */}
      <div className="pointer-events-none absolute -bottom-6 left-24 h-28 w-28 rounded-full border-[3px] border-white/5" />
      {/* rotating square — bottom right */}
      <div
        className="pointer-events-none absolute bottom-12 right-8 h-14 w-14 rotate-45 border-2 border-white/8"
        style={{ borderRadius: "4px" }}
      />
      {/* small floating square — top left */}
      <div
        className="pointer-events-none absolute left-12 top-12 h-8 w-8 rotate-12 border-2 border-blue-400/15"
        style={{ borderRadius: "3px" }}
      />

      {/* dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative grid items-center gap-10 px-8 py-14 md:grid-cols-[1.4fr_1fr] md:px-14 md:py-16">

        {/* ── Left copy ── */}
        <div>
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300 backdrop-blur">
            Available Mon – Sun · 8 AM – 9 PM
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl lg:text-[2.6rem]">
            Need urgent washing<br className="hidden sm:block" /> machine repair?
          </h2>
          <p className="mt-4 max-w-lg text-base text-white/60">
            Book in 60 seconds. Technician arrives today. Pay only after the job is done.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={telHref()}
              className="inline-flex h-12 items-center gap-2.5 rounded-2xl bg-white px-6 text-sm font-bold text-slate-900 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
            >
              <Phone className="h-4 w-4 text-primary" />
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={waHref(bookingMessage({}))}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-2xl bg-[#25d366] px-6 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-[#22c55e] hover:shadow-xl active:scale-95"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Now
            </a>
            <a
              href={waHref(bookingMessage({}))}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/15 active:scale-95"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Service
            </a>
          </div>
        </div>

        {/* ── Right info card ── */}
        <div className="rounded-2xl border border-white/10 bg-white/8 p-7 backdrop-blur-md">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-400">Visit Us</p>
          <h3 className="mt-3 text-lg font-bold text-white">{BUSINESS.name}</h3>

          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3 text-sm text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
              <span>
                {BUSINESS.address.line1}<br />
                {BUSINESS.address.line2}<br />
                {BUSINESS.address.city}, {BUSINESS.address.state}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Phone className="h-4 w-4 shrink-0 text-blue-400" />
              <a href={telHref()} className="hover:text-white">{PHONE_DISPLAY}</a>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Clock className="h-4 w-4 shrink-0 text-blue-400" />
              <span>{BUSINESS.hours}</span>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
            <p className="text-xs font-medium text-white/50">Average response time</p>
            <p className="mt-0.5 text-xl font-black text-white">Under 15 min</p>
          </div>
        </div>
      </div>
    </div>
  );
}
