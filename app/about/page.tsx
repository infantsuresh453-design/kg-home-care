import type { Metadata } from "next";
import { ShieldCheck, Wrench, Clock, Award, Users, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { ContactCTA } from "@/components/site/ContactCTA";
import { Section } from "@/components/site/Section";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { ServiceHeroForm } from "@/components/site/ServiceHeroForm";

export const metadata: Metadata = {
  title: "About KG Home Care — Washing Machine Service Centre in Tuticorin",
  description:
    "Family-run washing machine service in Tuticorin since 2014. Certified technicians, genuine spare parts, and a written warranty on every service.",
  keywords:
    "about kg home care, washing machine service tuticorin, certified technicians tuticorin, genuine spare parts, washing machine experts",
  openGraph: {
    title: "About KG Home Care",
    description: "Family-run, focused only on washing machines — since 2014.",
    url: "/about",
  },
  alternates: { canonical: "/about" },
};

const STATS = [
  { value: "10+", label: "Years of Experience" },
  { value: "5,000+", label: "Services Completed" },
  { value: "1,000+", label: "Happy Homes" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Written Warranty",
    description: "Every service comes with a written service warranty so you have complete peace of mind.",
  },
  {
    icon: Wrench,
    title: "Genuine Spare Parts",
    description: "We use only OEM-grade spare parts from authorised distributors for lasting service.",
  },
  {
    icon: Clock,
    title: "Same Day Service",
    description: "Book before noon and we arrive the same day. No waiting around for days.",
  },
  {
    icon: Award,
    title: "Certified Technicians",
    description: "Our team is trained and certified to handle all major washing machine brands.",
  },
  {
    icon: Users,
    title: "Family-Run Business",
    description: "We treat every customer like family. Honest pricing, no hidden charges.",
  },
  {
    icon: ThumbsUp,
    title: "Pay After Service",
    description: "No advance payments needed. You pay only after you're satisfied with the work.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero with Form ── */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#0f172a_0%,#1a2744_40%,#0f2a6b_100%)]" />
        {/* Dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,1) 1.2px, transparent 1.2px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[150px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
        {/* Floating shapes */}
        <div className="pointer-events-none absolute right-[10%] top-[15%] h-32 w-32 rounded-full border-2 border-white/[0.12]" />
        <div className="pointer-events-none absolute right-[15%] top-[25%] h-14 w-14 rounded-full border-2 border-white/[0.15]" />
        <div className="pointer-events-none absolute left-[5%] bottom-[20%] h-24 w-24 rotate-45 rounded-lg border-2 border-white/[0.1]" />
        <div className="pointer-events-none absolute left-[45%] bottom-[10%] h-10 w-10 rotate-12 rounded-md border-2 border-blue-400/[0.2]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:gap-12 lg:px-8">
          {/* Left — Content */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400">About Us</p>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
              Tuticorin&apos;s trusted washing machine service centre since 2014.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300">
              KG Home Care is a family-run service with one mission — do one thing, washing machine service, and do it better than anyone else. Over 10 years and 5,000+ services later, we&apos;re still going strong.
            </p>

            {/* Stats inline */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur-sm">
                  <p className="text-xl font-extrabold text-white">{stat.value}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <ServiceHeroForm />
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
        <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-indigo-50/40 blur-[80px]" />
        {/* Dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.8]" style={{ backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }} />
        {/* Floating circles */}
        <div className="pointer-events-none absolute right-16 top-16 h-32 w-32 rounded-full border-[3px] border-primary/20" />
        <div className="pointer-events-none absolute right-28 top-28 h-14 w-14 rounded-full border-[3px] border-blue-400/35" />
        <div className="pointer-events-none absolute left-10 bottom-10 h-20 w-20 rotate-45 rounded-md border-[3px] border-blue-300/40" />
        <div className="pointer-events-none absolute left-1/3 top-8 h-16 w-16 rounded-full border-[3px] border-violet-300/30" />
        <div className="pointer-events-none absolute right-1/4 bottom-16 h-12 w-12 rotate-12 rounded-lg border-[3px] border-indigo-300/30" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <ScrollReveal>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Our Story</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  One focus. One promise.
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
                  <p>
                    What started as a small service centre in 2014 has grown into Tuticorin&apos;s most trusted washing machine service provider. We made a conscious decision early on — instead of being a general appliance service shop, we would specialise entirely in washing machines.
                  </p>
                  <p>
                    That focus means our technicians know every model, every brand, and every common fault inside out. From a simple drum clean to complex PCB services, we handle it all with the same care and expertise.
                  </p>
                  <p>
                    Today, we serve over 1,000 homes across Tuticorin and surrounding areas, with same-day doorstep service and a written warranty on every job.
                  </p>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
                <Image
                  src="/hero-bg-2.png"
                  alt="KG Home Care technician at work"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-slate-50 via-indigo-50/30 to-slate-50">
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-100/40 blur-[120px]" />
        <div className="pointer-events-none absolute -left-20 top-0 h-60 w-60 rounded-full bg-blue-50/40 blur-[80px]" />
        {/* Grid pattern */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.7]" style={{ backgroundImage: "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        {/* Floating shapes */}
        <div className="pointer-events-none absolute left-8 top-8 h-28 w-28 rounded-full border-[3px] border-violet-300/45" />
        <div className="pointer-events-none absolute left-16 top-16 h-10 w-10 rounded-full border-[3px] border-indigo-400/35" />
        <div className="pointer-events-none absolute right-12 top-20 h-20 w-20 rotate-12 rounded-md border-[3px] border-indigo-300/40" />
        <div className="pointer-events-none absolute left-1/2 bottom-8 h-24 w-24 rounded-full border-[3px] border-primary/15" />
        <div className="pointer-events-none absolute right-1/3 bottom-12 h-14 w-14 rotate-45 rounded-md border-[3px] border-violet-300/30" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Why Choose Us</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                What makes us different
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {VALUES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="relative overflow-hidden bg-white">
        {/* Dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.7]" style={{ backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }} />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-100/60 blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 -bottom-10 h-60 w-60 rounded-full bg-indigo-100/50 blur-[80px]" />
        {/* Floating shapes */}
        <div className="pointer-events-none absolute right-16 top-10 h-24 w-24 rounded-full border-[3px] border-primary/20" />
        <div className="pointer-events-none absolute right-28 top-20 h-10 w-10 rounded-full border-[3px] border-blue-300/35" />
        <div className="pointer-events-none absolute left-10 bottom-12 h-16 w-16 rotate-45 rounded-md border-[3px] border-indigo-300/30" />
        <div className="pointer-events-none absolute left-1/3 top-8 h-20 w-20 rounded-full border-[3px] border-violet-300/25" />
        <Section className="relative">
          <ContactCTA />
        </Section>
      </div>
    </>
  );
}
