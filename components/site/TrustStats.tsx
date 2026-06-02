const STATS = [
  { value: "5,000+",  label: "Machines Repaired"  },
  { value: "12,000+", label: "Happy Customers"     },
  { value: "4.9★",    label: "Google Rating"       },
  { value: "90-day",  label: "Service Warranty"    },
];

// Triple so the marquee loops with zero visible gap
const ITEMS = [...STATS, ...STATS, ...STATS];

const SEPARATOR = (
  <span aria-hidden className="mx-8 h-1 w-1 shrink-0 rounded-full bg-white/30" />
);

export function TrustStats() {
  return (
    <section
      aria-label="Trust stats"
      className="relative overflow-hidden bg-primary py-6"
    >
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-primary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-primary to-transparent" />

      <div className="flex w-max animate-marquee">
        {ITEMS.map(({ value, label }, i) => (
          <div key={`${label}-${i}`} className="flex shrink-0 items-center">
            <div className="flex items-center gap-3 px-8">
              <span className="text-2xl font-black leading-none tracking-tight text-white md:text-3xl">
                {value}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                {label}
              </span>
            </div>
            {SEPARATOR}
          </div>
        ))}
      </div>
    </section>
  );
}
