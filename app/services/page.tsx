import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { ContactCTA } from "@/components/site/ContactCTA";
import { HowItWorks } from "@/components/site/HowItWorks";
import { CommonProblems } from "@/components/site/CommonProblems";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { ServiceHeroForm } from "@/components/site/ServiceHeroForm";

export const metadata: Metadata = {
  title: "Washing Machine Services in Tuticorin — KG Home Care",
  description:
    "Expert front-load and top-load washing machine repair, installation, deep cleaning, and maintenance services in Tuticorin.",
  openGraph: {
    title: "Washing Machine Services in Tuticorin",
    description:
      "Front-load & top-load washing machine repair, installation, cleaning & AMC in Tuticorin.",
    url: "/services",
  },
  alternates: { canonical: "/services" },
};

const HIGHLIGHTS = [
  "Same-day doorstep visits",
  "All major brands supported",
  "Genuine OEM spare parts",
  "Written service warranty",
  "No fix, no fee policy",
];

const FRONT_LOAD_POINTS = [
  "Drum not spinning or vibration issues",
  "Door seal & gasket replacement",
  "Water leakage from front panel",
  "PCB & control board repair",
  "Deep cleaning — drum, gasket, filter & dispenser",
  "Installation & uninstallation",
  "Motor rewinding & bearing replacement",
  "Error code diagnosis & reset",
];

const TOP_LOAD_POINTS = [
  "Not draining or draining slowly",
  "Agitator & pulsator issues",
  "Timer & program selector repair",
  "Motor, belt & capacitor replacement",
  "Full tub cleaning & sanitization",
  "Installation & uninstallation",
  "Overflow & inlet valve problems",
  "Excessive noise & vibration fix",
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero with Form ── */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_50%,#0f172a_100%)]" />
        {/* Dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[150px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-1/4 top-0 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[100px]" />
        {/* Floating shapes */}
        <div className="pointer-events-none absolute left-[8%] top-[12%] h-28 w-28 rounded-full border border-white/[0.06]" />
        <div className="pointer-events-none absolute left-[12%] top-[22%] h-12 w-12 rounded-full border border-white/[0.08]" />
        <div className="pointer-events-none absolute right-[8%] bottom-[15%] h-20 w-20 rotate-45 rounded-lg border border-white/[0.05]" />
        <div className="pointer-events-none absolute right-[40%] bottom-[8%] h-10 w-10 rotate-12 rounded-md border border-blue-400/[0.1]" />
        <div className="pointer-events-none absolute left-[55%] top-[8%] h-16 w-16 rounded-full border border-white/[0.04]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">Our Services</p>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
              Expert washing machine services at your doorstep.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300">
              We service both front-loading and top-loading washing machines — all brands, all models, all problems.
            </p>
            <ul className="mt-8 space-y-3">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <ServiceHeroForm />
          </div>
        </div>
      </section>

      {/* ── Front Loading Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-white">
        <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-indigo-50/40 blur-[80px]" />
        {/* Dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        {/* Floating shapes */}
        <div className="pointer-events-none absolute right-12 top-12 h-28 w-28 rounded-full border-[3px] border-primary/12" />
        <div className="pointer-events-none absolute right-24 top-24 h-12 w-12 rounded-full border-[3px] border-blue-300/30" />
        <div className="pointer-events-none absolute left-20 bottom-16 h-20 w-20 rotate-45 rounded-md border-[3px] border-blue-200/40" />
        <div className="pointer-events-none absolute left-1/2 top-8 h-16 w-16 rounded-full border-[3px] border-violet-200/20" />
        <div className="pointer-events-none absolute right-1/3 bottom-10 h-14 w-14 rotate-12 rounded-lg border-[3px] border-indigo-200/25" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <ScrollReveal>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Content */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Front Loading</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  Front-Load Washing Machine Service
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-500">
                  Front-load machines need specialized care. Our technicians are trained to handle all front-loader issues — from drum bearing noise to door seal leaks and PCB failures.
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {FRONT_LOAD_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
                <Image
                  src="/service-repair.jpg"
                  alt="Front-load washing machine repair service"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Top Loading Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-slate-50 via-indigo-50/30 to-slate-50">
        <div className="pointer-events-none absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-indigo-100/50 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 top-0 h-60 w-60 rounded-full bg-violet-50/40 blur-[80px]" />
        {/* Grid lines */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.4]" style={{ backgroundImage: "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Floating shapes */}
        <div className="pointer-events-none absolute left-10 top-10 h-24 w-24 rounded-full border-[3px] border-indigo-200/40" />
        <div className="pointer-events-none absolute left-20 top-20 h-10 w-10 rounded-full border-[3px] border-violet-300/30" />
        <div className="pointer-events-none absolute right-16 bottom-12 h-16 w-16 rotate-12 rounded-md border-[3px] border-violet-200/40" />
        <div className="pointer-events-none absolute right-1/4 top-8 h-20 w-20 rounded-full border-[3px] border-slate-300/30" />
        <div className="pointer-events-none absolute left-1/3 bottom-8 h-12 w-12 rotate-45 rounded-md border-[3px] border-primary/10" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <ScrollReveal>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Image — left on desktop */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift order-2 lg:order-1">
                <Image
                  src="/service-installation.jpg"
                  alt="Top-load washing machine repair service"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Content — right on desktop */}
              <div className="order-1 lg:order-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Top Loading</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  Top-Load Washing Machine Service
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-500">
                  Whether it&apos;s a fully-automatic or semi-automatic top-loader, we fix everything — drainage issues, motor faults, timer problems and more.
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {TOP_LOAD_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Common Problems ── */}
      <div className="relative overflow-hidden bg-white">
        {/* Dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-blue-100/30 blur-[100px]" />
        <div className="pointer-events-none absolute right-12 top-8 h-24 w-24 rounded-full border-[3px] border-primary/10" />
        <div className="pointer-events-none absolute left-10 bottom-12 h-16 w-16 rotate-45 rounded-md border-[3px] border-blue-200/30" />
        <Section
          eyebrow="Common Problems"
          title="We fix every washing machine fault."
          description="Whatever the issue, our certified technicians have seen it — and fixed it."
          className="relative"
        >
          <ScrollReveal>
            <CommonProblems />
          </ScrollReveal>
        </Section>
      </div>

      {/* ── How It Works ── */}
      <div className="relative overflow-hidden bg-slate-50">
        {/* Grid lines */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.3]" style={{ backgroundImage: "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)", backgroundSize: "55px 55px" }} />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-indigo-100/30 blur-[80px]" />
        <div className="pointer-events-none absolute left-8 top-8 h-20 w-20 rounded-full border-[3px] border-indigo-200/30" />
        <div className="pointer-events-none absolute right-16 bottom-12 h-14 w-14 rotate-12 rounded-md border-[3px] border-violet-200/30" />
        <Section
          eyebrow="How It Works"
          title="Booked in 60 seconds. Fixed today."
          align="center"
          className="relative"
        >
          <ScrollReveal>
            <HowItWorks />
          </ScrollReveal>
        </Section>
      </div>

      {/* ── CTA ── */}
      <div className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-50/60 blur-[80px]" />
        <div className="pointer-events-none absolute left-12 top-8 h-20 w-20 rounded-full border-2 border-primary/8" />
        <Section className="relative">
          <ContactCTA />
        </Section>
      </div>
    </>
  );
}
