import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { ContactCTA } from "@/components/site/ContactCTA";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { TrustStats } from "@/components/site/TrustStats";

export const metadata: Metadata = {
  title: "About KG Home Care — Washing Machine Experts in Tuticorin",
  description:
    "Family-run washing machine service in Tuticorin since 2014. Certified technicians, genuine spare parts, and a written warranty on every repair.",
  openGraph: {
    title: "About KG Home Care",
    description: "Family-run, focused only on washing machines — since 2014.",
    url: "/about",
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Tuticorin's washing machine specialists since 2014."
        description="KG Home Care is a family-run service founded with one mission: do one thing — washing machine service — and do it better than anyone else in the district."
      />
      <TrustStats />
      <Section>
        <WhyChooseUs />
      </Section>
      <Section>
        <ContactCTA />
      </Section>
    </>
  );
}
