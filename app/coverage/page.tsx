import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Areas — Tuticorin, Pudukkottai & Nearby",
  description:
    "KG Home Care washing machine service covers Tuticorin, Pudukkottai, Kovilpatti, Tiruchendur and surrounding villages across Tamil Nadu.",
  openGraph: {
    title: "Service Coverage — KG Home Care",
    description: "We serve Tuticorin, Pudukkottai and 14+ surrounding towns and villages.",
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
        description="Based in Pudukkottai, Tuticorin — we serve customers across the district and nearby villages."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Areas we cover</h2>
            <p className="mt-2 text-muted-foreground">
              Don&apos;t see your area? Send us your pincode on WhatsApp — we cover most of the district.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {AREAS.map((a) => (
                <li key={a} className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5 text-sm font-medium text-foreground">
                  <MapPin className="h-4 w-4 text-primary" /> {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border bg-muted shadow-soft">
            <iframe
              title="KG Home Care location"
              src="https://www.google.com/maps?q=Pudukkottai+Tuticorin+Tamil+Nadu&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[420px] w-full"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
