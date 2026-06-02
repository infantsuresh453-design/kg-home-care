import type { Metadata } from "next";
import { Phone, MapPin, Clock, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { BUSINESS, PHONE_DISPLAY, telHref, waHref, bookingMessage } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { LeadCaptureForm } from "@/components/site/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Contact KG Home Care — Book Washing Machine Service in Tuticorin",
  description:
    "Call, WhatsApp or book a doorstep washing machine service visit. KG Home Care, 7/1 Kovil Street, Pudukkottai, Tuticorin.",
  openGraph: {
    title: "Contact KG Home Care",
    description: "Book a doorstep washing machine service in Tuticorin.",
    url: "/contact",
  },
  alternates: { canonical: "/contact" },
};

const INFO_CARDS = [
  {
    icon: Phone,
    label: "Call Us",
    value: PHONE_DISPLAY,
    sub: "Mon – Sun · 8 AM – 9 PM",
    href: telHref(),
    color: "bg-blue-50 text-blue-600",
    ring: "ring-blue-100",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    sub: "Fastest response — usually under 10 min",
    href: waHref(bookingMessage({})),
    color: "bg-emerald-50 text-emerald-600",
    ring: "ring-emerald-100",
  },
  {
    icon: Mail,
    label: "Email",
    value: BUSINESS.email,
    sub: "For non-urgent queries and invoices",
    href: `mailto:${BUSINESS.email}`,
    color: "bg-violet-50 text-violet-600",
    ring: "ring-violet-100",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "8:00 AM – 9:00 PM",
    sub: "Monday to Sunday, all days",
    href: null,
    color: "bg-amber-50 text-amber-600",
    ring: "ring-amber-100",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Page hero ── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0f172a 0%,#0f2a6b 60%,#1e40af 100%)" }}>
        {/* glows */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-[80px]" />
        {/* dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* floating shapes */}
        <div className="pointer-events-none absolute right-20 top-6 h-28 w-28 rounded-full border-2 border-white/5" />
        <div className="pointer-events-none absolute bottom-4 left-16 h-16 w-16 rotate-45 border-2 border-white/5" style={{ borderRadius: "4px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400">Get in Touch</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl">
            Talk to a technician.<br className="hidden sm:block" /> Book in under a minute.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/60">
            Call, WhatsApp or fill the form — we usually respond within 10 minutes and dispatch a technician the same day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={telHref()}
              className="inline-flex h-12 items-center gap-2.5 rounded-2xl bg-white px-6 text-sm font-bold text-slate-900 shadow-lg transition-all hover:scale-[1.02] active:scale-95"
            >
              <Phone className="h-4 w-4 text-primary" />
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={waHref(bookingMessage({}))}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-2xl bg-[#25d366] px-6 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-[#22c55e] active:scale-95"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Now
            </a>
          </div>
        </div>
      </div>

      {/* ── Info cards strip ── */}
      <div className="bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {INFO_CARDS.map(({ icon: Icon, label, value, sub, href, color, ring }) => {
            const inner = (
              <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                <span className={`mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1 ${color} ${ring}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">{value}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{sub}</p>
                </div>
              </div>
            );
            return href ? (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {inner}
              </a>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
        </div>
      </div>

      {/* ── Main content: form + map+details ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg,#f8faff 0%,#f0f5ff 100%)" }}
      >
        {/* background orbs */}
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-blue-400/8 blur-[100px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-violet-400/8 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">

          {/* ── LEFT: contact form ── */}
          <div className="rounded-3xl border border-white/80 bg-white/70 p-8 shadow-[0_4px_32px_-8px_rgba(99,102,241,0.12)] backdrop-blur-md md:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Book a Service</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Fill in your details and we'll assign a certified technician near you.
            </p>

            <div className="mt-8">
              <LeadCaptureForm />
            </div>
          </div>

          {/* ── RIGHT: details + map ── */}
          <div className="flex flex-col gap-6">

            {/* Business details card */}
            <div className="rounded-3xl border border-white/80 bg-white/70 p-7 shadow-[0_4px_32px_-8px_rgba(99,102,241,0.12)] backdrop-blur-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Visit Us</p>
              <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900">{BUSINESS.name}</h2>

              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">{BUSINESS.address.line1}</span><br />
                    {BUSINESS.address.line2}<br />
                    {BUSINESS.address.city}, {BUSINESS.address.state}
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-slate-600">{BUSINESS.hours}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                    <Mail className="h-4 w-4" />
                  </span>
                  <a href={`mailto:${BUSINESS.email}`} className="text-sm text-slate-600 hover:text-primary">
                    {BUSINESS.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  <a href={waHref(bookingMessage({}))} target="_blank" rel="noreferrer" className="text-sm text-slate-600 hover:text-primary">
                    {PHONE_DISPLAY} · WhatsApp
                  </a>
                </li>
              </ul>

              {/* quick CTA */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={telHref()}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-bold text-white transition-all hover:bg-primary/90"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </a>
                <a
                  href={waHref(bookingMessage({}))}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#25d366] py-3 text-sm font-bold text-white transition-all hover:bg-[#22c55e]"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </div>

              {/* response time badge */}
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-xs text-slate-500">Average response time</span>
                <span className="text-sm font-black text-primary">Under 15 min</span>
              </div>
            </div>

            {/* Google Map */}
            <div className="overflow-hidden rounded-3xl border border-white/80 shadow-[0_4px_32px_-8px_rgba(99,102,241,0.12)]">
              <div className="relative">
                <iframe
                  title="KG Home Care — 7/1 Kovil Street, Pudukkottai, Tuticorin"
                  src="https://www.google.com/maps?q=7%2F1+Kovil+Street+Pudukkottai+Tuticorin+Tamil+Nadu&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                  allowFullScreen
                />
              </div>
              <a
                href="https://maps.google.com/?q=7/1+Kovil+Street+Pudukkottai+Tuticorin+Tamil+Nadu"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white py-3 text-sm font-semibold text-primary transition-colors hover:bg-slate-50"
              >
                Open in Google Maps <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
