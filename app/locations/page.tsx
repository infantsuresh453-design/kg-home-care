import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { getPublishedSeoPages } from "@/lib/cms";
import { Section } from "@/components/site/Section";
import { ScrollReveal } from "@/components/site/ScrollReveal";

export const metadata: Metadata = {
  title: "Locations — KG Home Care | Washing Machine Service Centre",
  description:
    "Find KG Home Care washing machine service in your area. We serve Tuticorin, Thoothukudi, Chennai and many more locations across Tamil Nadu.",
  keywords:
    "washing machine service locations, kg home care areas, washing machine repair near me, doorstep service tamil nadu",
  openGraph: {
    title: "Our Service Locations — KG Home Care",
    description:
      "All locations where KG Home Care provides doorstep washing machine service.",
    url: "/locations",
  },
  alternates: { canonical: "/locations" },
};

export const revalidate = 60;


export default async function LocationsPage() {
  const seoPages = await getPublishedSeoPages();

  // Group pages by location (or "Other" if no location set)
  const grouped: Record<string, typeof seoPages> = {};
  for (const page of seoPages) {
    const key = page.location || "Other Locations";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(page);
  }

  const locationNames = Object.keys(grouped).sort();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-radial-primary">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full border-[3px] border-primary/10" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-[80px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Our Service Locations
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Professional doorstep washing machine service across multiple locations. Find your area below.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <div className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
          }}
        />
        <Section className="relative">
          <ScrollReveal>
            {seoPages.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No locations available yet. Check back soon!
              </p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {locationNames.map((location) => (
                  <div key={location}>
                    <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
                      <MapPin className="h-4 w-4 text-primary" />
                      {location}
                    </h2>
                    <ul className="mt-3 space-y-2 border-l-2 border-slate-100 pl-4">
                      {grouped[location].map((page) => (
                        <li key={page.id}>
                          <Link
                            href={`/${page.slug}`}
                            className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                          >
                            {page.heading || page.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </ScrollReveal>
        </Section>
      </div>
    </>
  );
}
