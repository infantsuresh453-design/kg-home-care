import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { ContactCTA } from "@/components/site/ContactCTA";
import { FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ — Washing Machine Service Questions",
  description:
    "Answers to common questions about washing machine repair, warranty, spare parts, pricing and same-day service in Tuticorin.",
  openGraph: {
    title: "Washing Machine Service FAQ — KG Home Care",
    description: "Repair cost, warranty, spare parts, same day service — all answered.",
    url: "/faq",
  },
  alternates: { canonical: "/faq" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions."
        description="Quick answers on warranty, spare parts, pricing and same-day service."
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion />
        </div>
      </Section>
      <Section>
        <ContactCTA />
      </Section>
    </>
  );
}
