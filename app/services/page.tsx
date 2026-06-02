import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { ContactCTA } from "@/components/site/ContactCTA";
import { getPublicServices } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Washing Machine Services in Tuticorin",
  description:
    "Full list of washing machine services in Tuticorin: repair, installation, deep cleaning, PCB & motor repair, leakage, door lock, AMC and spare parts.",
  openGraph: {
    title: "Washing Machine Services in Tuticorin",
    description:
      "Repair, installation, deep cleaning, PCB & motor repair, AMC and more — for IFB, LG, Samsung, Bosch and Whirlpool.",
    url: "/services",
  },
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getPublicServices();

  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Every washing machine service, under one roof."
        description="From a quick repair to annual maintenance — KG Home Care covers it all."
      />
      <Section>
        <ServicesGrid items={services} />
      </Section>
      <Section>
        <ContactCTA />
      </Section>
    </>
  );
}
