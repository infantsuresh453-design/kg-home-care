import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { BUSINESS, PHONE_DISPLAY, telHref, waHref } from "@/lib/contact";
import { getPublishedSeoPageBySlug } from "@/lib/cms";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type SeoPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: SeoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedSeoPageBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.meta_title || page.heading || page.title,
    description: page.meta_description || page.subheading || undefined,
    keywords: page.keywords || undefined,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.meta_title || page.heading || page.title,
      description: page.meta_description || page.subheading || undefined,
      url: `/${page.slug}`,
      type: page.template === "article" ? "article" : "website",
    },
  };
}

export default async function SeoPage({ params }: SeoPageProps) {
  const { slug } = await params;
  const page = await getPublishedSeoPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    description: page.meta_description || page.subheading || BUSINESS.tagline,
    telephone: PHONE_DISPLAY,
    areaServed: page.location ? [page.location, BUSINESS.address.city] : [BUSINESS.address.city],
    url: `/${page.slug}`,
  };

  const faqSchema =
    page.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <Script id={`seo-page-schema-${page.id}`} type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>
      {faqSchema ? (
        <Script id={`seo-page-faq-${page.id}`} type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </Script>
      ) : null}

      <section className="relative overflow-hidden border-b bg-radial-primary">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              {page.location || "SEO Landing Page"}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {page.heading || page.title}
            </h1>
            {page.subheading ? (
              <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{page.subheading}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href={telHref()}>{page.cta_text || "Call now"}</a>
              </Button>
              <Button asChild variant="outline">
                <a href={page.cta_link || waHref()} target={page.cta_link ? undefined : "_blank"} rel="noreferrer">
                  WhatsApp us
                </a>
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden border-white/50 bg-white/80 shadow-glow backdrop-blur">
            <CardContent className="p-0">
              {page.image_url ? (
                <img src={page.image_url} alt={page.heading || page.title} className="h-60 w-full object-cover" />
              ) : null}
              <div className="space-y-4 p-6">
                <div>
                  <p className="text-sm text-muted-foreground">Service area</p>
                  <p className="font-semibold">{page.location || BUSINESS.address.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Support</p>
                  <p className="font-semibold">{PHONE_DISPLAY}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hours</p>
                  <p className="font-semibold">{BUSINESS.hours}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Section>
        <div
          className={page.template === "article" ? "prose prose-slate mx-auto max-w-3xl" : "prose prose-slate max-w-none rounded-3xl border bg-card p-8 shadow-soft"}
          dangerouslySetInnerHTML={{ __html: page.content || "<p>Content coming soon.</p>" }}
        />
      </Section>

      {page.faq.length > 0 ? (
        <Section eyebrow="FAQ" title="Common questions">
          <div className="grid gap-4">
            {page.faq.map((item) => (
              <Card key={item.question} className="shadow-soft">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold">{item.question}</h2>
                  <p className="mt-3 text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      {page.testimonials.length > 0 ? (
        <Section eyebrow="Testimonials" title="What customers say">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {page.testimonials.map((item, index) => (
              <Card key={`${item.name}-${index}`} className="shadow-soft">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-primary">
                    {item.rating ? `${item.rating}/5 rating` : "Verified customer"}
                  </p>
                  <p className="mt-3 text-muted-foreground">{item.review}</p>
                  <div className="mt-4 text-sm">
                    <p className="font-semibold">{item.name}</p>
                    {item.trip ? <p className="text-muted-foreground">{item.trip}</p> : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="rounded-[2rem] border bg-card p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Need help now?</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Talk to KG Home Care today.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Book doorstep washing machine service in {page.location || BUSINESS.address.city} with a quick call or WhatsApp message.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href={telHref()}>Call {PHONE_DISPLAY}</a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Open contact page</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
