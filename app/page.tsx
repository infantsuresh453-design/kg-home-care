import type { Metadata } from "next";
import { Hero } from "@/components/site/Hero";
import { TrustStats } from "@/components/site/TrustStats";
import { Section } from "@/components/site/Section";
import { ServicesInteractive } from "@/components/site/ServicesInteractive";
import { CommonProblems } from "@/components/site/CommonProblems";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Reviews } from "@/components/site/Reviews";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { HomeContact } from "@/components/site/HomeContact";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { getPublicServices } from "@/lib/cms";

export const metadata: Metadata = {
  title: "KG Home Care — Washing Machine Service & Installation in Tuticorin",
  description:
    "Doorstep washing machine service, installation, drum cleaning, PCB & motor service in Tuticorin. Same day service.",
  keywords:
    "washing machine service tuticorin, washing machine repair tuticorin, washing machine installation tuticorin, drum cleaning tuticorin, kg home care, washing machine service centre tuticorin",
  openGraph: {
    title: "KG Home Care — Washing Machine Service Centre in Tuticorin",
    description:
      "Trusted washing machine service — same day doorstep visits in Tuticorin.",
    url: "/",
  },
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const services = await getPublicServices();

  return (
    <>
      {/* 1 · Hero — no reveal, loads immediately */}
      <Hero />

      {/* 2 · Marquee stats — primary blue */}
      <TrustStats />

      {/* 3 · Services — white */}
      <div className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.6]" style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="pointer-events-none absolute right-10 top-10 h-32 w-32 rounded-full border-[3px] border-primary/20" />
        <div className="pointer-events-none absolute right-20 top-20 h-16 w-16 rounded-full border-[3px] border-blue-300/30" />
        <div className="pointer-events-none absolute left-16 bottom-12 h-20 w-20 rotate-45 rounded-md border-[3px] border-blue-300/25" />
        <Section
          eyebrow="Our Services"
          title="Premium washing machine services."
          description="We specialise in one thing — and we do it better than anyone in Tuticorin."
          className="relative bg-white"
        >
          <ScrollReveal>
            <ServicesInteractive limit={8} items={services} />
          </ScrollReveal>
        </Section>
      </div>

      {/* 4 · Common Problems — slate-50 */}
      <div className="relative overflow-hidden bg-slate-50">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="pointer-events-none absolute -right-10 top-1/3 h-80 w-80 rounded-full bg-blue-200/40 blur-[80px]" />
        <div className="pointer-events-none absolute left-8 top-12 h-28 w-28 rounded-full border-[3px] border-slate-300/60" />
        <div className="pointer-events-none absolute right-20 bottom-10 h-16 w-16 rotate-12 rounded-md border-[3px] border-indigo-300/40" />
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

      {/* 6 · Why Choose Us — solid primary blue full-width */}
      <div className="relative overflow-hidden bg-primary">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="pointer-events-none absolute -left-60 -top-60 h-[500px] w-[500px] rounded-full bg-white/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-60 -right-60 h-[500px] w-[500px] rounded-full bg-black/15 blur-[120px]" />
        <Section className="relative text-white">
          <ScrollReveal>
            <WhyChooseUs />
          </ScrollReveal>
        </Section>
      </div>

      {/* 7 · How It Works — slate-50 */}
      <div className="relative overflow-hidden bg-slate-50">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.6]" style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-indigo-200/30 blur-[80px]" />
        <div className="pointer-events-none absolute right-12 top-12 h-24 w-24 rounded-full border-[3px] border-slate-300/60" />
        <div className="pointer-events-none absolute left-1/4 bottom-8 h-14 w-14 rotate-45 rounded-md border-[3px] border-indigo-300/40" />
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

      {/* 8 · Reviews — white */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-blue-50/60 blur-[100px]" />
        <div className="pointer-events-none absolute left-10 top-10 h-24 w-24 rounded-full border-2 border-primary/8" />
        <Section
          eyebrow="Customer Reviews"
          title="Loved by 1,000+ homes in Tuticorin."
          align="center"
          className="relative bg-white"
        >
          <ScrollReveal>
            <Reviews />
          </ScrollReveal>
        </Section>
      </div>

      {/* 9 · FAQ — slate-50 */}
      <div className="relative overflow-hidden bg-slate-50">
        {/* Grid lines */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.3]" style={{ backgroundImage: "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-60 w-60 rounded-full bg-indigo-100/30 blur-[80px]" />
        <div className="pointer-events-none absolute left-8 top-8 h-20 w-20 rounded-full border-[3px] border-slate-300/50" />
        <div className="pointer-events-none absolute right-12 bottom-10 h-14 w-14 rotate-12 rounded-md border-[3px] border-indigo-200/30" />
        <div className="pointer-events-none absolute left-1/3 bottom-4 h-16 w-16 rounded-full border-[3px] border-violet-200/20" />
        <Section
          eyebrow="FAQ"
          title="Frequently asked questions"
          align="center"
          className="relative"
        >
          <ScrollReveal>
            <div className="mx-auto max-w-3xl">
              <FaqAccordion />
            </div>
          </ScrollReveal>
        </Section>
      </div>

      {/* 10 · Contact — white */}
      <div className="relative overflow-hidden bg-white">
        {/* Dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.4]" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-blue-50/50 blur-[80px]" />
        <div className="pointer-events-none absolute right-16 top-12 h-24 w-24 rounded-full border-[3px] border-primary/10" />
        <div className="pointer-events-none absolute left-10 top-20 h-14 w-14 rotate-45 rounded-md border-[3px] border-blue-200/25" />
        <Section
          id="contact"
          eyebrow="Contact Us"
          title="Book a service or get in touch."
          description="Available Mon – Sun, 8 AM to 9 PM. Fastest reply on WhatsApp."
          className="relative"
        >
          <ScrollReveal>
            <HomeContact />
          </ScrollReveal>
        </Section>
      </div>
    </>
  );
}
