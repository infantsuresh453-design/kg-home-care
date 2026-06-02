import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { BRANDS, bookingMessage, waHref } from "@/lib/contact";
import { ContactCTA } from "@/components/site/ContactCTA";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "IFB, LG, Samsung, Bosch & Whirlpool Service",
  description:
    "Certified washing machine repair and installation in Tuticorin for IFB, LG, Samsung, Bosch and Whirlpool — front-load and top-load.",
  openGraph: {
    title: "Brands We Service — KG Home Care",
    description: "Expert service for India's top washing machine brands in Tuticorin.",
    url: "/brands",
  },
  alternates: { canonical: "/brands" },
};

const BRAND_NOTES: Record<string, string> = {
  IFB: "Front-load specialists. Drum, door lock, PCB and Aqua Energie inlet expertise.",
  LG: "Direct Drive motor diagnosis, inverter PCB repair, smart diagnosis errors.",
  Samsung: "EcoBubble, Diamond Drum and digital inverter motor expertise.",
  Bosch: "VarioPerfect and i-DOS systems, German engineering parts.",
  Whirlpool: "6th Sense, StainWash, top-load agitator and motor coupling specialists.",
};

export default function BrandsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Brands We Service"
        title="Certified expertise across every leading brand."
        description="We service only washing machines — and we know every model from IFB, LG, Samsung, Bosch and Whirlpool inside out."
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BRANDS.map((b) => (
            <div
              key={b}
              className="group flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
            >
              <div className="flex items-center justify-center rounded-2xl bg-secondary py-8">
                <span className="text-4xl font-bold tracking-tight text-foreground">{b}</span>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">{BRAND_NOTES[b]}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Front-load & top-load", "OEM spare parts", "Service warranty"].map((x) => (
                  <li key={x} className="flex items-center gap-2 text-foreground/85">
                    <Check className="h-4 w-4 text-accent" strokeWidth={3} />
                    {x}
                  </li>
                ))}
              </ul>
              <a
                href={waHref(bookingMessage({ brand: b }))}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-lift"
              >
                Book {b} Service
              </a>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <ContactCTA />
      </Section>
    </>
  );
}
