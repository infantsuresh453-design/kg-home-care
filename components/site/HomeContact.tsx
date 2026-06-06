import { LeadCaptureForm } from "@/components/site/LeadCaptureForm";

export function HomeContact() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">

      {/* ── LEFT: form ── */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Book a Service</p>
        <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-slate-900">Send us a message</h3>
        <p className="mt-1.5 text-sm text-slate-500">
          Fill in your details and we'll assign a certified technician near you — usually within 15 minutes.
        </p>
        <div className="mt-6">
          <LeadCaptureForm />
        </div>
      </div>

      {/* ── RIGHT: map ── */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-border shadow-soft">
        <iframe
          title="KG Home Care location"
          src="https://www.google.com/maps?q=5A%2F394+Caldwell+Colony+3rd+Street+Tuticorin+Tamil+Nadu&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="min-h-[280px] w-full flex-1 border-0"
          allowFullScreen
        />
        <a
          href="https://maps.google.com/?q=5A/394+Caldwell+Colony+3rd+Street+Tuticorin+Tamil+Nadu"
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center justify-center bg-white py-3 text-sm font-semibold text-primary transition-colors hover:bg-slate-50"
        >
          Open in Google Maps →
        </a>
      </div>
    </div>
  );
}
