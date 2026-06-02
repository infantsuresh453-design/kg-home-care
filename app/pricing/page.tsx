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
      <Section>
        <PricingCards />
      </Section>
      <Section>
        <ContactCTA />
      </Section>
    </>
  );
}
