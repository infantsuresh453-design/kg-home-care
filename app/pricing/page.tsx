import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { PricingCards } from "@/components/site/PricingCards";
import { ContactCTA } from "@/components/site/ContactCTA";

export const metadata: Metadata = {
  title: "Pricing — Washing Machine Service Cost in Tuticorin",
  description:
    "Transparent washing machine service pricing in Tuticorin. Inspection ₹299, Installation ₹499, Deep Cleaning ₹999, AMC ₹2499. No hidden charges.",
  openGraph: {
    title: "Washing Machine Service Pricing — KG Home Care",
    description: "Upfront pricing for inspection, installation, deep cleaning and AMC service in Tuticorin.",
    url: "/pricing",
  },
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Transparent pricing. No surprises."
        description="The price you see is the price you pay. We share the estimate before any work starts."
      />

      {/* Pricing Cards section with decorative background */}
      <div className="relative overflow-hidden">
        {/* Dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-100/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-indigo-100/30 blur-[100px]" />
        {/* Floating shapes */}
        <div className="pointer-events-none absolute right-16 top-16 h-32 w-32 rounded-full border-[3px] border-primary/10" />
        <div className="pointer-events-none absolute right-28 top-28 h-14 w-14 rounded-full border-[3px] border-blue-300/20" />
        <div className="pointer-events-none absolute left-8 top-20 h-24 w-24 rotate-12 rounded-xl border-[3px] border-indigo-200/20" />
        <div className="pointer-events-none absolute left-1/4 bottom-12 h-16 w-16 rotate-45 rounded-md border-[3px] border-violet-200/25" />
        <div className="pointer-events-none absolute right-1/3 bottom-20 h-20 w-20 rounded-full border-[3px] border-primary/8" />
        <Section className="relative">
          <PricingCards />
        </Section>
      </div>

      {/* CTA section */}
      <div className="relative overflow-hidden bg-slate-50">
        {/* Grid lines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-violet-100/30 blur-[80px]" />
        <div className="pointer-events-none absolute left-10 top-6 h-20 w-20 rounded-full border-[3px] border-slate-300/40" />
        <div className="pointer-events-none absolute right-12 bottom-8 h-14 w-14 rotate-45 rounded-md border-[3px] border-indigo-200/30" />
        <Section className="relative">
          <ContactCTA />
        </Section>
      </div>
    </>
  );
}
