import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { BUSINESS, PHONE_DISPLAY, telHref, waHref, bookingMessage } from "@/lib/contact";
import { getPublishedSeoPageBySlug } from "@/lib/cms";
import { Section } from "@/components/site/Section";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { ServiceHeroForm } from "@/components/site/ServiceHeroForm";
import {
  Star,
  ShieldCheck,
  Clock,
  Wrench,
  Award,
  Phone,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

type SeoPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: SeoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedSeoPageBySlug(slug);

  if (!page) {
    return {};
  }

  // Parse other_tags field (format: "key:value" per line)
  // Supported keys: canonical, robots, og:*
  const otherTags = parseOtherTags(page.other_tags);

  const titleText = page.meta_title || page.heading || page.title;

  return {
    title: titleText,
    description: page.meta_description || page.subheading || undefined,
    keywords: page.keywords || undefined,
    alternates: {
      canonical: otherTags.canonical || `/${page.slug}`,
    },
    ...(otherTags.robots ? { robots: otherTags.robots } : {}),
    openGraph: {
      title: titleText,
      description: page.meta_description || page.subheading || undefined,
      url: `/${page.slug}`,
      type: page.template === "article" ? "article" : "website",
      ...otherTags.openGraph,
    },
    other: {
      ...(page.meta_title ? { title: page.meta_title } : {}),
      ...(otherTags.other.length > 0 ? Object.fromEntries(otherTags.other) : {}),
    },
  };
}

/**
 * Parse the other_tags textarea content.
 * Format: one tag per line as "key:value"
 * Supported keys:
 * - canonical:URL — overrides the canonical URL
 * - robots:directives — sets robots meta (e.g. "noindex, nofollow")
 * - og:property:value — sets Open Graph tags (e.g. og:image:https://...)
 * - anyname:value — added as generic <meta name="X" content="Y">
 */
function parseOtherTags(raw: string | null) {
  const result: {
    canonical: string | null;
    robots: string | null;
    openGraph: Record<string, string>;
    other: [string, string][];
  } = { canonical: null, robots: null, openGraph: {}, other: [] };

  if (!raw) return result;

  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);

  for (const line of lines) {
    // If the user just pasted a bare URL, assume it's for canonical
    if (line.startsWith("http://") || line.startsWith("https://")) {
      result.canonical = line;
      continue;
    }

    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim().toLowerCase();
    const value = line.slice(colonIdx + 1).trim();

    if (!value) continue;

    if (key === "canonical") {
      result.canonical = value;
    } else if (key === "robots") {
      result.robots = value;
    } else if (key.startsWith("og:")) {
      // e.g., og:image → image
      const ogKey = key.slice(3);
      const ogValue = value.startsWith(":") ? value.slice(1) : value;
      result.openGraph[ogKey] = ogValue;
    } else {
      result.other.push([key, value]);
    }
  }

  return result;
}

export default async function SeoPage({ params }: SeoPageProps) {
  const { slug } = await params;
  const page = await getPublishedSeoPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const location = page.location || BUSINESS.address.city;

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

      {/* ═══ 1. HERO SECTION ═══ */}
      <section className="dark relative overflow-hidden min-h-[720px] flex flex-col justify-center text-foreground">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-[#07090f]">
          {page.image_url ? (
            <img
              src={page.image_url}
              alt={page.heading || page.title}
              className="h-full w-full object-cover object-right sm:object-center"
            />
          ) : (
            <Image
              src="/hero-bg-2.png"
              alt="Washing machine service background"
              fill
              className="object-cover object-right sm:object-center"
              priority
            />
          )}
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090f] from-10% via-[#07090f]/85 via-50% to-transparent sm:via-[#07090f]/60 sm:to-[#07090f]/20" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07090f] to-transparent" />
        </div>

        {/* Dot grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left — Content */}
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
                </span>
                Serving {location} · Same Day Service
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
                {page.heading || page.title}
              </h1>

              {page.subheading ? (
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                  {page.subheading}
                </p>
              ) : null}

              <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-3">
                {[
                  { icon: Clock, label: "Same Day Service" },
                  { icon: Award, label: "Genuine Parts" },
                  { icon: ShieldCheck, label: "90-Day Warranty" },
                  { icon: Wrench, label: "Expert Technicians" },
                ].map((b) => (
                  <li
                    key={b.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
                  >
                    <b.icon className="h-3.5 w-3.5 text-green-400" />
                    {b.label}
                  </li>
                ))}
              </ul>

              {/* Hero CTA buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={telHref()}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <Phone className="h-4 w-4" />
                  {page.cta_text || `Call ${PHONE_DISPLAY}`}
                </a>
                <a
                  href={waHref(bookingMessage({ location }))}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Right — Lead capture form */}
            <div className="hidden lg:block">
              <ServiceHeroForm />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. CONTENT (left) + IMAGE (right) ═══ */}
      {(page.section2_heading || page.section2_content) ? (
        <div className="relative overflow-hidden bg-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.09]" style={{ backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }} />
          <div className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-blue-100/40 blur-[100px]" />
          <Section className="relative">
            <ScrollReveal>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Left — Text content */}
                <div>
                  {page.section2_subheading ? (
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                      {page.section2_subheading}
                    </p>
                  ) : null}
                  {page.section2_heading ? (
                    <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                      {page.section2_heading}
                    </h2>
                  ) : null}
                  {page.section2_content ? (
                    <div
                      className="mt-6 prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900"
                      dangerouslySetInnerHTML={{ __html: page.section2_content }}
                    />
                  ) : null}
                </div>
                {/* Right — Image */}
                <div className="flex justify-center lg:justify-end">
                  {page.section2_image_url ? (
                    <img
                      src={page.section2_image_url}
                      alt={page.section2_heading || "Section image"}
                      className="w-full max-w-md rounded-2xl border border-slate-100 object-cover shadow-lift"
                    />
                  ) : (
                    <div className="grid h-64 w-full max-w-md place-items-center rounded-2xl border border-slate-100 bg-slate-50">
                      <span className="text-sm text-slate-400">Image</span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </Section>
        </div>
      ) : null}

      {/* ═══ 3. CONTENT BLOCK ═══ */}
      {(page.section3_heading || page.section3_content) ? (
        <div className="relative overflow-hidden bg-slate-50">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.3]" style={{ backgroundImage: "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-indigo-100/30 blur-[80px]" />
          <Section className="relative">
            <ScrollReveal>
              <div>
                {page.section3_heading ? (
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    {page.section3_heading}
                  </h2>
                ) : null}
                {page.section3_content ? (
                  <div
                    className="mt-6 prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900"
                    dangerouslySetInnerHTML={{ __html: page.section3_content }}
                  />
                ) : null}
              </div>
            </ScrollReveal>
          </Section>
        </div>
      ) : null}

      {/* ═══ 4. CONTENT BLOCK ═══ */}
      {(page.section4_heading || page.section4_content) ? (
        <div className="relative overflow-hidden bg-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.25]" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-blue-100/20 blur-[100px]" />
          <Section className="relative">
            <ScrollReveal>
              <div>
                {page.section4_heading ? (
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    {page.section4_heading}
                  </h2>
                ) : null}
                {page.section4_content ? (
                  <div
                    className="mt-6 prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900"
                    dangerouslySetInnerHTML={{ __html: page.section4_content }}
                  />
                ) : null}
              </div>
            </ScrollReveal>
          </Section>
        </div>
      ) : null}

      {/* ═══ 5. CONTENT BLOCK ═══ */}
      {(page.section5_heading || page.section5_content) ? (
        <div className="relative overflow-hidden bg-slate-50">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.3]" style={{ backgroundImage: "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-violet-100/30 blur-[80px]" />
          <Section className="relative">
            <ScrollReveal>
              <div>
                {page.section5_heading ? (
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    {page.section5_heading}
                  </h2>
                ) : null}
                {page.section5_content ? (
                  <div
                    className="mt-6 prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900"
                    dangerouslySetInnerHTML={{ __html: page.section5_content }}
                  />
                ) : null}
              </div>
            </ScrollReveal>
          </Section>
        </div>
      ) : null}

      {/* ═══ 6. TESTIMONIALS ═══ */}
      {page.testimonials.length > 0 ? (
        <div className="relative overflow-hidden bg-slate-50">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.3]" style={{ backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)", backgroundSize: "26px 26px" }} />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-blue-100/30 blur-[80px]" />
          <div className="pointer-events-none absolute right-16 top-12 h-24 w-24 rounded-full border-[3px] border-primary/12" />
          <Section
            eyebrow="Customer Reviews"
            title={`Loved by Homes in ${location}`}
            align="center"
            className="relative"
          >
            <ScrollReveal>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {page.testimonials.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    {/* Star rating */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">&ldquo;{item.review}&rdquo;</p>
                    <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {item.name[0]}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                        {item.trip ? (
                          <p className="text-[11px] text-slate-500">{item.trip}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </Section>
        </div>
      ) : null}

      {/* ═══ 7. FAQ ═══ */}
      {page.faq.length > 0 ? (
        <div className="relative overflow-hidden bg-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.25]" style={{ backgroundImage: "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
          <div className="pointer-events-none absolute -right-20 top-1/3 h-60 w-60 rounded-full bg-indigo-100/30 blur-[80px]" />
          <div className="pointer-events-none absolute left-8 top-6 h-20 w-20 rounded-full border-[3px] border-slate-300/50" />
          <Section
            eyebrow="FAQ"
            title={`Frequently Asked Questions — ${location}`}
            align="center"
            className="relative"
          >
            <ScrollReveal>
              <div className="mx-auto max-w-3xl space-y-4">
                {page.faq.map((item, i) => (
                  <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
                    <h3 className="flex items-start gap-3 text-base font-bold text-slate-900">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        Q
                      </span>
                      {item.question}
                    </h3>
                    <p className="mt-3 pl-9 text-sm leading-relaxed text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </Section>
        </div>
      ) : null}

      {/* ═══ 8. LEAD CAPTURE FORM ═══ */}
      <div className="relative overflow-hidden bg-slate-50">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.3]" style={{ backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }} />
        <div className="pointer-events-none absolute -right-28 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-blue-100/40 blur-[80px]" />
        <Section className="relative">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left — text */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Get Started</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
                  Book Washing Machine Service in {location}
                </h2>
                <p className="mt-4 text-base text-slate-500">
                  Professional doorstep service with genuine spare parts and a written warranty. Available all 7 days.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={telHref()}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lift transition-all hover:-translate-y-0.5"
                  >
                    <Phone className="h-4 w-4" />
                    Call {PHONE_DISPLAY}
                  </a>
                  <a
                    href={waHref(bookingMessage({ location }))}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#25d366]" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
              {/* Right — Form */}
              <div>
                <ServiceHeroForm />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
