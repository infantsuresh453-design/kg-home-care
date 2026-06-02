import { Check } from "lucide-react";
import { bookingMessage, waHref } from "@/lib/contact";

const TIERS = [
  {
    name: "Inspection", price: "299", popular: false, service: "Inspection visit",
    features: ["Doorstep visit", "Full diagnosis", "Repair estimate", "Adjustable against repair cost"],
  },
  {
    name: "Installation", price: "499", popular: false, service: "Installation",
    features: ["Front-load or top-load", "Hose & leveling setup", "Test cycle included", "Same day available"],
  },
  {
    name: "Deep Cleaning", price: "999", popular: true, service: "Deep Cleaning",
    features: ["Drum + gasket + filter", "Dispenser cleaning", "Odor removal", "Eco-safe solution"],
  },
  {
    name: "AMC Package", price: "2,499", popular: false, service: "AMC Service",
    features: ["2 service visits / year", "Priority response", "10% off spare parts", "Free inspections"],
  },
];

export function PricingCards() {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`relative flex flex-col rounded-3xl border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift ${
              t.popular ? "border-primary/50 ring-1 ring-primary/30" : "border-border"
            }`}
          >
            {t.popular ? (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lift">
                Most Booked
              </span>
            ) : null}
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-xl font-medium text-foreground">₹</span>
              <span className="text-5xl font-bold tracking-tight text-foreground">{t.price}</span>
              <span className="text-sm text-muted-foreground">/ visit</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={waHref(bookingMessage({ service: t.service }))}
              target="_blank"
              rel="noreferrer"
              className={`mt-6 inline-flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
                t.popular
                  ? "bg-primary text-primary-foreground shadow-lift hover:bg-primary/90"
                  : "border border-border bg-background text-foreground hover:bg-secondary"
              }`}
            >
              Book {t.name}
            </a>
          </div>
        ))}
      </div>
      <p className="mt-6 rounded-2xl bg-secondary px-5 py-4 text-center text-sm text-foreground/75">
        Final repair cost depends on issue diagnosis and spare parts requirements.
        All prices include GST.
      </p>
    </>
  );
}
