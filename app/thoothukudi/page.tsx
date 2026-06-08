import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  Phone,
  Wrench,
  ShieldCheck,
  Clock,
  Award,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { PHONE_DISPLAY, telHref, waHref, bookingMessage } from "@/lib/contact";
import { Section } from "@/components/site/Section";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { ServiceHeroForm } from "@/components/site/ServiceHeroForm";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { ContactCTA } from "@/components/site/ContactCTA";

export const metadata: Metadata = {
  title:
    "Washing Machine Service in Thoothukudi | Same Day Doorstep Service — KG Home Care",
  description:
    "Expert washing machine service, installation, drum cleaning & maintenance in Thoothukudi. Same day doorstep service for all models. Genuine parts, 90-day warranty. Call now.",
  keywords:
    "washing machine service thoothukudi, washing machine service centre thoothukudi, washing machine installation thoothukudi, drum cleaning thoothukudi, pcb service thoothukudi, motor service thoothukudi",
  openGraph: {
    title: "Washing Machine Service in Thoothukudi — KG Home Care",
    description:
      "Doorstep washing machine service, installation & maintenance in Thoothukudi. Same day service, genuine parts, 90-day warranty.",
    url: "/thoothukudi",
  },
  alternates: { canonical: "/thoothukudi" },
};

// Internal links to SEO pages — update slugs as you create them in the dashboard
const SERVICE_LINKS = [
  {
    title: "Washing Machine Service",
    description:
      "Complete doorstep service for all washing machine issues — drum, motor, PCB & drainage problems diagnosed and fixed.",
    slug: "/washing-machine-service-thoothukudi",
    icon: Wrench,
  },
  {
    title: "Installation & Uninstallation",
    description:
      "Safe, certified installation with proper leveling, hose connection & test cycle. Uninstallation for shifting or replacement.",
    slug: "/washing-machine-installation-thoothukudi",
    icon: CheckCircle,
  },
  {
    title: "Drum Cleaning & Deep Cleaning",
    description:
      "Professional drum cleaning to remove detergent residue, mold, bacteria & bad odor. Extends machine life by 3-5 years.",
    slug: "/drum-cleaning-thoothukudi",
    icon: Award,
  },
  {
    title: "PCB & Control Board Service",
    description:
      "Component-level PCB diagnosis & soldering. Error code troubleshooting. Save ₹2000-4000 vs full board replacement.",
    slug: "/pcb-service-thoothukudi",
    icon: ShieldCheck,
  },
  {
    title: "Motor Service",
    description:
      "Motor rewinding, bearing replacement, coupling fix & direct drive motor service. All front-load & top-load models.",
    slug: "/motor-service-thoothukudi",
    icon: Wrench,
  },
  {
    title: "Water Leakage Service",
    description:
      "Gasket, inlet valve, tub seal & hose leak diagnosis and fix. Same day resolution for all leakage issues.",
    slug: "/water-leakage-service-thoothukudi",
    icon: Clock,
  },
];

const AREAS_SERVED = [
  "Thoothukudi Town",
  "Caldwell Colony",
  "Bryant Nagar",
  "Millerpuram",
  "Polpettai",
  "Muthiahpuram",
  "Sivagnanapuram",
  "Thermal Nagar",
  "Kamaraj Nagar",
  "VOC Nagar",
  "Ettayapuram Road",
  "Palayamkottai Road",
  "SBI Colony",
  "Harbour Area",
  "Toovipuram",
  "Udangudi",
  "Eral",
  "Kayathar",
];



export default function ThoothukudiPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="dark relative overflow-hidden min-h-[720px] flex flex-col justify-center text-foreground">
        <div className="absolute inset-0 z-0 bg-[#07090f]">
          <Image
            src="/hero-bg-2.png"
            alt="Washing machine service in Thoothukudi"
            fill
            className="object-cover object-right sm:object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090f] from-10% via-[#07090f]/85 via-50% to-transparent sm:via-[#07090f]/60 sm:to-[#07090f]/20" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07090f] to-transparent" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
                </span>
                Serving Thoothukudi · Same Day Service
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
                Washing Machine Service Centre in Thoothukudi
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                Professional doorstep washing machine service, installation &
                deep cleaning in Thoothukudi. Same day visit by certified
                technicians with genuine spare parts and 90-day service warranty.
              </p>

              <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-3">
                {[
                  { icon: Clock, label: "Same Day Service" },
                  { icon: Award, label: "Genuine Parts" },
                  { icon: ShieldCheck, label: "90-Day Warranty" },
                  { icon: Wrench, label: "Expert Technicians" },
                ].map((b) => (
                  <li
                    key={b.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
                  >
                    <b.icon className="h-3.5 w-3.5 text-green-400" />
                    {b.label}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={telHref()}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <Phone className="h-4 w-4" />
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href={waHref(
                    bookingMessage({ location: "Thoothukudi" })
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <ServiceHeroForm />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE DO — SERVICE LINKS ═══ */}
      <div className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              "radial-gradient(#94a3b8 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-blue-100/40 blur-[100px]" />
        <Section
          eyebrow="Our Services"
          title="What We Do in Thoothukudi"
          description="From simple fixes to complex board-level services — our certified technicians handle it all at your doorstep. Click on any service to learn more."
          className="relative"
        >
          <ScrollReveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_LINKS.map((service) => (
                <Link
                  key={service.slug}
                  href={service.slug}
                  className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift hover:border-primary/20"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <service.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </Section>
      </div>



      {/* ═══ PRICING ═══ */}
      <div className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <Section
          eyebrow="Transparent Pricing"
          title="Our Pricing — No Hidden Charges"
          className="relative"
        >
          <ScrollReveal>
            <div className="mx-auto max-w-md text-center">
              <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-soft">
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  Visiting & Service Charges
                </p>
                <p className="mt-3 text-4xl font-extrabold text-slate-900">
                  ₹400
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Inclusive of technician visit, inspection & diagnosis at your doorstep.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Section>
      </div>

      {/* ═══ AREAS SERVED ═══ */}
      <div className="relative overflow-hidden bg-slate-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(#94a3b8 1.2px, transparent 1.2px)",
            backgroundSize: "26px 26px",
          }}
        />
        <Section
          eyebrow="Service Coverage"
          title="Areas We Serve in Thoothukudi"
          description="Our technicians cover all major areas and colonies in Thoothukudi and surrounding regions."
          align="center"
          className="relative"
        >
          <ScrollReveal>
            <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2.5">
              {AREAS_SERVED.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {area}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </Section>
      </div>

      {/* ═══ WHY CHOOSE US ═══ */}
      <div className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <Section
          eyebrow="Why KG Home Care"
          title="Why Thoothukudi Trusts Us"
          align="center"
          className="relative"
        >
          <ScrollReveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Clock,
                  title: "Same Day Service",
                  text: "Book before 4 PM, we arrive the same day. No waiting.",
                },
                {
                  icon: Award,
                  title: "Genuine Spare Parts",
                  text: "Only OEM parts from authorized suppliers. No duplicates.",
                },
                {
                  icon: ShieldCheck,
                  title: "90-Day Warranty",
                  text: "Written warranty on every repair. Same issue? Free re-visit.",
                },
                {
                  icon: Wrench,
                  title: "Certified Technicians",
                  text: "Factory-trained experts with 5+ years experience.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-soft"
                >
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Section>
      </div>

      {/* ═══ CTA ═══ */}
      <div className="relative overflow-hidden bg-slate-50">
        <div className="pointer-events-none absolute -right-28 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-blue-100/40 blur-[80px]" />
        <Section className="relative">
          <ContactCTA />
        </Section>
      </div>
    </>
  );
}
