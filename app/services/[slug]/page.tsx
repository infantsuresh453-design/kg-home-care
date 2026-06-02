import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { ContactCTA } from "@/components/site/ContactCTA";
import { SERVICES, BRANDS, bookingMessage, waHref } from "@/lib/contact";
import { getPublicServiceBySlug } from "@/lib/cms";
import { Check, ArrowRight, ShieldCheck, Wrench, Clock } from "lucide-react";

const IMG_MAP: Record<string, string> = {
  repair: "/service-repair.jpg",
  installation: "/service-installation.jpg",
  cleaning: "/service-cleaning.jpg",
  pcb: "/service-pcb.jpg",
};

const DETAIL: Record<string, { intro: string; includes: string[]; price: string }> = {
  "washing-machine-repair": {
    intro:
      "Our certified technicians diagnose and fix every washing machine fault — front-load or top-load, fully or semi-automatic.",
    includes: ["Full diagnostic check", "Component-level repair", "Genuine spare parts", "Test wash & sign-off", "60-day service warranty"],
    price: "₹299 inspection · final cost after diagnosis",
  },
  installation: {
    intro:
      "Safe, certified installation of a new washing machine — including leveling, inlet/drain hose setup and a full test cycle.",
    includes: ["Unboxing & placement", "Hose & drain connections", "Leveling & vibration check", "Test wash cycle", "Customer walkthrough"],
    price: "Starts at ₹499",
  },
  "drum-cleaning": {
    intro:
      "Deep drum cleaning to remove detergent residue, mold, bacteria and unpleasant odor — restoring your machine's hygiene.",
    includes: ["Eco-safe drum solution", "Hot rinse cycle", "Odor removal", "Visible residue removal"],
    price: "Starts at ₹599",
  },
  "deep-cleaning": {
    intro:
      "Full machine deep clean covering drum, door gasket, detergent dispenser and lint filter — leaves your machine like new.",
    includes: ["Drum + gasket + filter", "Dispenser cleaning", "Outer panel polish", "Odor & residue removal"],
    price: "Starts at ₹999",
  },
  "pcb-repair": {
    intro:
      "Control board (PCB) faults are the #1 cause of unresponsive machines. We do component-level diagnosis and soldering.",
    includes: ["Multi-meter diagnosis", "Component-level repair", "Genuine replacement when needed", "Software/program reset"],
    price: "Starts at ₹899",
  },
  "motor-repair": {
    intro:
      "Motor faults — humming, no spin, knocking — are diagnosed and repaired in-home, including motor rewinding when needed.",
    includes: ["Motor rewinding", "Bearing & capacitor replacement", "Drive belt & coupling", "Vibration balance check"],
    price: "Starts at ₹799",
  },
  "leakage-repair": {
    intro:
      "Water leakage is usually a hose, gasket, tub seal or valve issue. We trace it precisely and fix it the same day.",
    includes: ["Leak source diagnosis", "Hose & valve replacement", "Door gasket replacement", "Tub seal repair"],
    price: "Starts at ₹499",
  },
  "door-lock-repair": {
    intro:
      "Door lock and interlock failures lock you out mid-cycle. We replace the lock and reset the cycle safely.",
    includes: ["Door lock replacement", "Interlock switch repair", "Door hinge alignment", "Safety check"],
    price: "Starts at ₹599",
  },
  amc: {
    intro:
      "Annual Maintenance Contract: 2 scheduled service visits per year, priority response and a discount on all spare parts.",
    includes: ["2 service visits / year", "Priority technician dispatch", "10% off spare parts", "Free inspection visits"],
    price: "₹2,499 / year",
  },
  "spare-parts": {
    intro:
      "Genuine OEM spare parts for IFB, LG, Samsung, Bosch and Whirlpool — sourced and fitted by our technicians.",
    includes: ["OEM-only parts", "Bill & warranty card", "Free fitting on most parts", "Wide stock for all brands"],
    price: "Quoted per part",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const managedService = await getPublicServiceBySlug(slug);
  const service = managedService ?? SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title:
      "meta_title" in service && service.meta_title
        ? service.meta_title
        : `${service.name} in Tuticorin`,
    description:
      "meta_description" in service && service.meta_description
        ? service.meta_description
        : "short" in service
          ? service.short
          : service.description || "",
    openGraph: {
      title: `${service.name} — KG Home Care`,
      description:
        "short" in service ? service.short : service.description || "",
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const managedService = await getPublicServiceBySlug(slug);
  const fallbackService = SERVICES.find((s) => s.slug === slug);
  const service = managedService ?? fallbackService;
  if (!service) notFound();

  const d =
    DETAIL[service.slug] ??
    ({
      intro: "Doorstep service from trained washing machine specialists in Tuticorin.",
      includes: [
        "Fast technician dispatch",
        "Transparent diagnosis",
        "Genuine spares when required",
        "Clean, careful workmanship",
      ],
      price: "Price shared after inspection",
    } as const);
  const img = "image" in service ? IMG_MAP[service.image] : null;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-radial-primary">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <div>
            <Link href="/services" className="text-xs font-semibold uppercase tracking-widest text-primary hover:underline">
              ← All Services
            </Link>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{service.name}</h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              {"description" in service && service.description ? service.description : d.intro}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold shadow-soft">
              <Wrench className="h-4 w-4 text-primary" />
              {d.price}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={waHref(bookingMessage({ service: service.name }))}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lift"
              >
                Book this service <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/pricing" className="inline-flex h-12 items-center rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground hover:bg-secondary">
                View pricing
              </Link>
            </div>
          </div>
          <div>
            {"image_url" in service && service.image_url ? (
              <img
                src={service.image_url}
                alt={service.name}
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-glow"
              />
            ) : (
              <Image
                src={img ?? "/service-repair.jpg"}
                alt={service.name}
                width={1024}
                height={768}
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-glow"
              />
            )}
          </div>
        </div>
      </section>

      <Section eyebrow="What's Included" title={`Every ${service.name.toLowerCase()} visit includes:`}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {d.includes.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-foreground">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <span className="font-medium text-foreground">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-4 rounded-3xl bg-secondary p-6 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <div><div className="font-semibold">Warranty</div><div className="text-sm text-muted-foreground">On every repair</div></div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-primary" />
            <div><div className="font-semibold">Same day service</div><div className="text-sm text-muted-foreground">Book before 4 PM</div></div>
          </div>
          <div className="flex items-center gap-3">
            <Wrench className="h-6 w-6 text-primary" />
            <div><div className="font-semibold">All brands</div><div className="text-sm text-muted-foreground">{BRANDS.join(" · ")}</div></div>
          </div>
        </div>
      </Section>

      {"content" in service && service.content ? (
        <Section eyebrow="Service details" title={`About ${service.name}`}>
          <div
            className="prose prose-slate max-w-none rounded-3xl border bg-card p-6 shadow-soft"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
        </Section>
      ) : null}

      <Section>
        <ContactCTA />
      </Section>
    </>
  );
}
