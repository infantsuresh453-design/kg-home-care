import type { Metadata } from "next";
import { Hero } from "@/components/site/Hero";
import { TrustStats } from "@/components/site/TrustStats";
import { Section } from "@/components/site/Section";
import { ServicesInteractive } from "@/components/site/ServicesInteractive";
import { CommonProblems } from "@/components/site/CommonProblems";
import { BrandsStrip } from "@/components/site/BrandsStrip";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Reviews } from "@/components/site/Reviews";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { HomeContact } from "@/components/site/HomeContact";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { getPublicServices } from "@/lib/cms";

export const metadata: Metadata = {
  title: "KG Home Care — Washing Machine Repair, Installation & AMC in Tuticorin",
  description:
    "Doorstep washing machine repair, installation, deep cleaning, PCB & motor repair in Tuticorin for IFB, LG, Samsung, Bosch and Whirlpool. Same day service.",
  openGraph: {
    title: "KG Home Care — Washing Machine Repair in Tuticorin",
    description:
      "Trusted washing machine service for IFB, LG, Samsung, Bosch and Whirlpool — same day doorstep visits in Tuticorin.",
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
      <Section
        eyebrow="Our Services"
        title="Premium washing machine services."
        description="We specialise in one thing — and we do it better than anyone in Tuticorin."
        className="bg-white"
      >
        <ScrollReveal>
          <ServicesInteractive limit={8} items={services} />
        </ScrollReveal>
      </Section>

      {/* 4 · Common Problems — slate-50 */}
      <Section
        eyebrow="Common Problems"
        title="We fix every washing machine fault."
        description="Whatever the issue, our certified technicians have seen it — and fixed it."
        className="bg-slate-50"
      >
        <ScrollReveal>
          <CommonProblems />
        </ScrollReveal>
      </Section>

      {/* 5 · Brands — white */}
      <Section
        eyebrow="Brands We Service"
        title="Genuine parts for every major brand."
        align="center"
        className="bg-white"
      >
        <ScrollReveal>
          <BrandsStrip />
        </ScrollReveal>
      </Section>

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
      <Section
        eyebrow="How It Works"
        title="Booked in 60 seconds. Fixed today."
        align="center"
        className="bg-slate-50"
      >
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>
      </Section>

      {/* 8 · Reviews — white */}
      <Section
        eyebrow="Customer Reviews"
        title="Loved by 1,000+ homes in Tuticorin."
        align="center"
        className="bg-white"
      >
        <ScrollReveal>
          <Reviews />
        </ScrollReveal>
      </Section>

      {/* 9 · FAQ — slate-50 */}
      <Section
        eyebrow="FAQ"
        title="Frequently asked questions"
        align="center"
        className="bg-slate-50"
      >
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion />
          </div>
        </ScrollReveal>
      </Section>

      {/* 10 · Contact — white */}
      <Section
        id="contact"
        eyebrow="Contact Us"
        title="Book a service or get in touch."
        description="Available Mon – Sun, 8 AM to 9 PM. Fastest reply on WhatsApp."
        className="bg-white"
      >
        <ScrollReveal>
          <HomeContact />
        </ScrollReveal>
      </Section>
    </>
  );
}
