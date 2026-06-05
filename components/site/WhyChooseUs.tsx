import {
  BadgeCheck, PackageCheck, Wrench, Clock,
  IndianRupee, ShieldCheck, Receipt, Zap,
} from "lucide-react";
import Image from "next/image";

const FEATURES = [
  { icon: BadgeCheck,   label: "Certified Technicians",  desc: "Trained, background-verified experts."   },
  { icon: PackageCheck, label: "Genuine Spare Parts",    desc: "Only OEM-approved parts used."            },
  { icon: Wrench,       label: "Doorstep Service",       desc: "We come to you — no transport hassle."   },
  { icon: Clock,        label: "Same Day Support",       desc: "Most services done within hours."          },
  { icon: IndianRupee,  label: "Affordable Pricing",     desc: "Transparent rates, no hidden fees."       },
  { icon: ShieldCheck,  label: "Service Warranty",       desc: "90-day warranty on every service."         },
  { icon: Receipt,      label: "Transparent Charges",    desc: "Quote before any work begins."            },
  { icon: Zap,          label: "Quick Response",         desc: "Technician dispatched in 15 minutes."     },
];

const STATS = [
  { value: "5,000+", label: "Homes"    },
  { value: "8+",     label: "Yrs Exp"  },
  { value: "90-day", label: "Warranty" },
  { value: "4.9★",   label: "Rating"   },
];

export function WhyChooseUs() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">

      {/* ── Left: image + stats ── */}
      <div className="relative pb-10 lg:pb-0">
        <Image
          src="/why-choose.jpg"
          alt="KG Home Care certified technician"
          loading="lazy"
          width={1024}
          height={1280}
          className="aspect-[4/3] w-full rounded-2xl object-cover object-top ring-2 ring-white/15 lg:aspect-[4/5]"
        />
        {/* stats bar */}
        <div className="absolute -bottom-2 left-2 right-2 grid grid-cols-4 divide-x divide-white/20 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md lg:-bottom-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-2.5 px-1">
              <span className="text-sm font-black text-white md:text-base">{value}</span>
              <span className="mt-0.5 text-center text-[9px] font-semibold uppercase tracking-wide text-white/60">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: copy + feature grid ── */}
      <div>
        <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
          Why Choose Us
        </span>
        <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
          Trusted by 5,000+<br />homes in Tuticorin
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          Genuine parts, trained engineers, and a written warranty on every job.
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-2.5">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <li
              key={label}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/8 p-3.5 transition-colors hover:border-white/20 hover:bg-white/12"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15 text-white">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-white sm:text-sm">{label}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-white/55 sm:text-xs">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
