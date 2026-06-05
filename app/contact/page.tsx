import type { Metadata } from "next";
import { Phone, MapPin, Clock } from "lucide-react";
import { BUSINESS, PHONE_DISPLAY, telHref } from "@/lib/contact";
import { LeadCaptureForm } from "@/components/site/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Contact KG Home Care — Book Washing Machine Service in Tuticorin",
  description:
    "Call or book a doorstep washing machine service visit. KG Home Care, 7/1 Kovil Street, Pudukkottai, Tuticorin.",
  openGraph: {
    title: "Contact KG Home Care",
    description: "Book a doorstep washing machine service in Tuticorin.",
    url: "/contact",
  },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0f172a 0%,#0f2a6b 60%,#1e40af 100%)" }}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400">Get in Touch</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl">
            We&apos;re here to help.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/60">
            Call us or fill the form below — we usually respond within 15 minutes and dispatch a technician the same day.
          </p>
        </div>
      </section>

      {/* ── Info cards ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-100/40 blur-[80px]" />
        {/* Dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.3]" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
        {/* Floating shapes */}
        <div className="pointer-events-none absolute right-10 top-6 h-20 w-20 rounded-full border-2 border-blue-200/30" />
        <div className="pointer-events-none absolute left-1/3 bottom-4 h-14 w-14 rotate-45 rounded-sm border-2 border-primary/10" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            {
              icon: Phone,
              label: "Call Us",
              value: PHONE_DISPLAY,
              sub: "Mon – Sun · 8 AM – 9 PM",
              href: telHref(),
              color: "bg-blue-50 text-blue-600",
            },
            {
              icon: MapPin,
              label: "Location",
              value: BUSINESS.address.city,
              sub: `${BUSINESS.address.line1}, ${BUSINESS.address.line2}`,
              href: "https://maps.google.com/?q=7/1+Kovil+Street+Pudukkottai+Tuticorin+Tamil+Nadu",
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              icon: Clock,
              label: "Working Hours",
              value: "8:00 AM – 9:00 PM",
              sub: "All 7 days",
              href: null,
              color: "bg-amber-50 text-amber-600",
            },
          ].map(({ icon: Icon, label, value, sub, href, color }) => {
            const card = (
              <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <span className={`mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl ${color}`}>
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
                {card}
              </a>
            ) : (
              <div key={label}>{card}</div>
            );
          })}
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-50">
        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-violet-100/30 blur-[120px]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-blue-100/30 blur-[100px]" />
        {/* Grid pattern */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.25]" style={{ backgroundImage: "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        {/* Floating shapes */}
        <div className="pointer-events-none absolute right-20 top-10 h-28 w-28 rounded-full border-2 border-violet-200/30" />
        <div className="pointer-events-none absolute left-16 top-1/2 h-16 w-16 rotate-12 rounded-sm border-2 border-blue-200/30" />
        <div className="pointer-events-none absolute right-1/3 bottom-8 h-20 w-20 rounded-full border-2 border-indigo-200/20" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft md:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Book a Service</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Fill in your details and we&apos;ll assign a certified technician near you.
            </p>
            <div className="mt-8">
              <LeadCaptureForm />
            </div>
          </div>

          {/* Map + Address */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-soft">
              <iframe
                title="KG Home Care location"
                src="https://www.google.com/maps?q=7%2F1+Kovil+Street+Pudukkottai+Tuticorin+Tamil+Nadu&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
                allowFullScreen
              />
              <a
                href="https://maps.google.com/?q=7/1+Kovil+Street+Pudukkottai+Tuticorin+Tamil+Nadu"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center bg-white py-3 text-sm font-semibold text-primary transition-colors hover:bg-slate-50"
              >
                Open in Google Maps →
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-lg font-bold text-slate-900">{BUSINESS.name}</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    {BUSINESS.address.line1}, {BUSINESS.address.line2}<br />
                    {BUSINESS.address.city}, {BUSINESS.address.state}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <a href={telHref()} className="hover:text-primary">{PHONE_DISPLAY}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  <span>{BUSINESS.hours}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
