import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { BUSINESS, PHONE_DISPLAY, telHref, waHref, bookingMessage } from "@/lib/contact";
import { getPublishedSeoPageBySlug } from "@/lib/cms";
import { Section } from "@/components/site/Section";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { ServiceHeroForm } from "@/components/site/ServiceHeroForm";
import { Button } from "@/components/ui/button";
import {
  Star,
  ShieldCheck,
  Clock,
  Wrench,
  Phone,
  Zap,
  Award,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

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

const TRUST_ITEMS = [
  { icon: Star, label: "4.9★ Rating", desc: "500+ Google reviews" },
  { icon: Clock, label: "Same Day Service", desc: "Book before 4 PM" },
  { icon: ShieldCheck, label: "Service Warranty", desc: "Written guarantee" },
  { icon: Wrench, label: "Genuine Parts", desc: "OEM-grade spares" },
];

const COMMON_SERVICES = [
  { title: "Not Spinning / Vibrating", desc: "Drum, bearing, belt & motor issues diagnosed and fixed." },
  { title: "Water Not Draining", desc: "Pump, hose blockage & drain valve repair." },
  { title: "Leaking Water", desc: "Gasket, inlet valve & tub seal replacement." },
  { title: "PCB / Error Codes", desc: "Component-level board diagnosis & soldering." },
  { title: "Noisy Operation", desc: "Bearing, shock absorber & suspension repair." },
  { title: "Not Starting / Dead", desc: "Power supply, door lock & wiring faults." },
];

const WHY_CHOOSE = [
  { icon: Zap, value: "Same Day", label: "Technician visit" },
  { icon: ShieldCheck, value: "90 Days", label: "Service warranty" },
  { icon: Award, value: "₹0", label: "Visit charge*" },
  { icon: Wrench, value: "10+", label: "Years experience" },
];

const STEPS = [
  { step: "1", title: "Book a Visit", desc: "Call, WhatsApp, or fill the form — takes 30 seconds." },
  { step: "2", title: "Technician Arrives", desc: "Certified technician reaches your doorstep same day." },
  { step: "3", title: "Problem Solved", desc: "Transparent diagnosis, upfront quote, and quality repair." },
];

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

      {/* ═══ 1. HERO — Background image + Form on right ═══ */}
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
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.08]"
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
            </div>

            {/* Right — Form */}
            <div className="animate-fade-up lg:justify-self-end lg:max-w-md w-full">
              <ServiceHeroForm />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. TRUST BAR ═══ */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 md:grid-cols-4 lg:px-8">
          {TRUST_ITEMS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{label}</p>
                <p className="text-[11px] text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. SERVICES — Common issues (long-tail keyword targets) ═══ */}
      <div className="relative overflow-hidden bg-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.7]" style={{ backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }} />
        <div className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-blue-100/40 blur-[100px]" />
        <div className="pointer-events-none absolute right-12 top-12 h-24 w-24 rounded-full border-[3px] border-primary/15" />
        <div className="pointer-events-none absolute left-10 bottom-10 h-16 w-16 rotate-45 rounded-md border-[3px] border-blue-300/25" />
        <Section
          eyebrow="Our Services"
          title={`Washing Machine Problems We Fix in ${location}`}
          description="From simple fixes to complex board-level repairs — our certified technicians handle it all at your doorstep."
          className="relative"
        >
          <ScrollReveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {COMMON_SERVICES.map(({ title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-red-50 text-red-500">
                      <Wrench className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Section>
      </div>

      {/* ═══ 4. WHY CHOOSE US — Stats ═══ */}
      <div className="relative overflow-hidden bg-primary">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="pointer-events-none absolute -left-60 -top-60 h-[500px] w-[500px] rounded-full bg-white/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-60 -right-60 h-[500px] w-[500px] rounded-full bg-black/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">Why Choose Us</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Why {location} Trusts KG Home Care
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {WHY_CHOOSE.map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                  <Icon className="mx-auto h-6 w-6 text-white/60" />
                  <p className="mt-3 text-2xl font-extrabold text-white">{value}</p>
                  <p className="mt-1 text-xs font-medium text-white/50">{label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ═══ 5. HOW IT WORKS — 3 steps ═══ */}
      <div className="relative overflow-hidden bg-slate-50">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.6]" style={{ backgroundImage: "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-indigo-100/30 blur-[80px]" />
        <div className="pointer-events-none absolute right-8 top-8 h-20 w-20 rounded-full border-[3px] border-slate-300/50" />
        <Section
          eyebrow="How It Works"
          title="Booked in 60 Seconds. Fixed Today."
          align="center"
          className="relative"
        >
          <ScrollReveal>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {STEPS.map(({ step, title, desc }) => (
                <div key={step} className="relative rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-soft">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-lg font-extrabold text-white shadow-lift">
                    {step}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Section>
      </div>

      {/* ═══ 6. REVIEWS — Locality-specific ═══ */}
      {page.testimonials.length > 0 ? (
        <div className="relative overflow-hidden bg-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.6]" style={{ backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)", backgroundSize: "26px 26px" }} />
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

      {/* ═══ 7. CTA BANNER — Mid-page sticky call-to-action ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary via-blue-600 to-primary">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-extrabold text-white sm:text-2xl">
              Need Washing Machine Service in {location}?
            </h2>
            <p className="mt-1 text-sm text-white/70">Same day doorstep visit. No fix, no fee.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={telHref()}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href={waHref(bookingMessage({ location }))}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 8. HTML CONTENT (from CMS) ═══ */}
      {page.content ? (
        <div className="relative overflow-hidden bg-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-blue-100/20 blur-[100px]" />
          <Section className="relative">
            <div
              className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900 prose-ul:my-4 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </Section>
        </div>
      ) : null}

      {/* ═══ 9. FAQ — Schema-ready ═══ */}
      {page.faq.length > 0 ? (
        <div className="relative overflow-hidden bg-slate-50">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
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

      {/* ═══ 10. FOOTER CTA ═══ */}
      <div className="relative overflow-hidden bg-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.6]" style={{ backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }} />
        <div className="pointer-events-none absolute -right-28 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-blue-100/40 blur-[80px]" />
        <Section className="relative">
          <div className="rounded-[2rem] border border-slate-100 bg-gradient-to-br from-white via-blue-50/30 to-white p-8 shadow-lift md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Get Started</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
                Book Washing Machine Service in {location}
              </h2>
              <p className="mt-4 text-base text-slate-500">
                Professional doorstep service with genuine spare parts and a written warranty. Available all 7 days.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={telHref()}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-lift transition-all hover:-translate-y-0.5"
                >
                  <Phone className="h-4 w-4" />
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href={waHref(bookingMessage({ location }))}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-800 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25d366]" />
                  WhatsApp Us
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-800 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  Book Online
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
