import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Areas — KG Home Care Washing Machine Service Centre",
  description:
    "KG Home Care washing machine service covers Tuticorin, Kovilpatti, Tiruchendur and surrounding villages across Tamil Nadu.",
  keywords:
    "washing machine service tuticorin, washing machine service kovilpatti, washing machine service tiruchendur, service areas kg home care, doorstep service tamil nadu",
  openGraph: {
    title: "Service Coverage — KG Home Care",
    description: "We serve Tuticorin and 14+ surrounding towns and villages.",
    url: "/coverage",
  },
  alternates: { canonical: "/coverage" },
};

const AREAS = [
  "Tuticorin", "Pudukkottai", "Ettayapuram", "Kovilpatti", "Srivaikuntam",
  "Tiruchendur", "Sattankulam", "Ottapidaram", "Vilathikulam", "Kayathar",
  "Eral", "Authoor", "Karungulam", "Udangudi", "Nazareth", "Aruppukottai",
];

export default function CoveragePage() {
  return (
    <>
      <PageHeader
        eyebrow="Service Coverage"
        title="Doorstep washing machine service across South Tamil Nadu."
        description="Based in Tuticorin — we serve customers across the district and nearby villages."
      />
      <div className="relative overflow-hidden">
        {/* Dot grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-blue-100/40 blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-indigo-100/30 blur-[80px]" />
        {/* Floating shapes */}
        <div className="pointer-events-none absolute right-12 top-12 h-28 w-28 rounded-full border-[3px] border-primary/10" />
        <div className="pointer-events-none absolute right-24 top-24 h-12 w-12 rounded-full border-[3px] border-blue-300/25" />
        <div className="pointer-events-none absolute left-10 bottom-16 h-20 w-20 rotate-45 rounded-md border-[3px] border-indigo-300/20" />
        <div className="pointer-events-none absolute left-1/2 top-8 h-16 w-16 rounded-full border-[3px] border-violet-200/25" />
        <Section className="relative">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Areas we cover</h2>
              <p className="mt-2 text-muted-foreground">
                Don&apos;t see your area? Send us your pincode on WhatsApp — we cover most of the district.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {AREAS.map((a) => (
                  <li key={a} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2.5 text-sm font-medium text-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
                    <MapPin className="h-4 w-4 text-primary" /> {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border bg-muted shadow-lift">
              <iframe
                title="KG Home Care location"
                src="https://www.google.com/maps?q=5A%2F394+Caldwell+Colony+3rd+Street+Tuticorin+Tamil+Nadu&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[420px] w-full"
              />
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
