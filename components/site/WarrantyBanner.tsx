import { ShieldCheck, Wrench, BadgeCheck, Stars, ArrowRight } from "lucide-react";
import Image from "next/image";
import { waHref, bookingMessage } from "@/lib/contact";

const POINTS = [
  { icon: ShieldCheck, label: "Warranty Support",    desc: "Written warranty on every job." },
  { icon: BadgeCheck,  label: "Genuine Spare Parts", desc: "OEM parts only, no substitutes."  },
  { icon: Wrench,      label: "Expert Service",      desc: "Certified, trained technicians."  },
  { icon: Stars,       label: "Trusted Repairs",     desc: "5,000+ satisfied customers."      },
];

export function WarrantyBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#07090f] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
      {/* background photo */}
      <Image
        src="/warranty-banner.jpg"
        alt=""
        aria-hidden
        loading="lazy"
        fill
        className="object-cover opacity-[0.18]"
      />

      {/* layered gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#071225]/95 via-[#0f1f4a]/80 to-[#071225]/90" />

      {/* corner glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/25 blur-[80px]" />

      {/* dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative grid items-center gap-10 px-8 py-12 md:grid-cols-[1.3fr_1fr] md:px-12 md:py-14">

        {/* ── Left: copy ── */}
        <div>
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-400">
            Service Warranty
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-white md:text-4xl">
            Every Repair Backed<br className="hidden sm:block" /> By Written Warranty.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
            Pay only when you&apos;re 100% satisfied. We stand behind every repair with genuine spare parts and certified technician workmanship.
          </p>

          <a
            href={waHref(bookingMessage({}))}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(0,87,255,0.5)] transition-all hover:bg-primary/90 hover:shadow-[0_12px_28px_-6px_rgba(0,87,255,0.6)] active:scale-[0.98]"
          >
            Book with Warranty
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* ── Right: feature cards ── */}
        <ul className="grid grid-cols-2 gap-3">
          {POINTS.map(({ icon: Icon, label, desc }) => (
            <li
              key={label}
              className="group flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-white/15 hover:bg-white/10"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-blue-300 transition-colors group-hover:bg-primary/30">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-0.5 text-xs text-white/50">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
