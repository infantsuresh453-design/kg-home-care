import { SERVICES as FALLBACK_SERVICES } from "@/lib/contact";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createStaticSupabaseClient } from "@/lib/supabase/static";

// Re-export everything from the client-safe types file so existing imports keep working
export type {
  LeadStatus, ServiceStatus, SeoPageStatus, SeoTemplate,
  ActionState, LeadRecord, ServiceRecord, SeoPageRecord,
} from "@/lib/cms.types";
export {
  DEFAULT_ACTION_STATE,
  slugify,
  parseFaqText,
  parseTestimonialsText,
  formatFaqText,
  formatTestimonialsText,
} from "@/lib/cms.types";

// Import types needed internally
import type {
  LeadStatus, ServiceStatus, SeoPageStatus, SeoTemplate,
  LeadRecord, ServiceRecord, SeoPageRecord,
} from "@/lib/cms.types";
import { parseFaqText, parseTestimonialsText } from "@/lib/cms.types";

function normalizeFaq(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const question = String((item as { question?: unknown }).question ?? "").trim();
      const answer = String((item as { answer?: unknown }).answer ?? "").trim();
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter(Boolean) as SeoPageRecord["faq"];
}

function normalizeTestimonials(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const name = String((item as { name?: unknown }).name ?? "").trim();
      const review = String((item as { review?: unknown }).review ?? "").trim();
      const trip = String((item as { trip?: unknown }).trip ?? "").trim();
      const ratingValue = Number((item as { rating?: unknown }).rating ?? 0);

      if (!name || !review) return null;

      return {
        name,
        review,
        trip: trip || undefined,
        rating: Number.isFinite(ratingValue) && ratingValue > 0 ? ratingValue : undefined,
      };
    })
    .filter(Boolean) as SeoPageRecord["testimonials"];
}

function safeHtml(value: string | null | undefined) {
  return value ?? "";
}

function mapSeoPage(row: Record<string, unknown>): SeoPageRecord {
  return {
    id: String(row.id),
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    meta_title: (row.meta_title as string | null) ?? null,
    meta_description: (row.meta_description as string | null) ?? null,
    keywords: (row.keywords as string | null) ?? null,
    location: (row.location as string | null) ?? null,
    heading: (row.heading as string | null) ?? null,
    subheading: (row.subheading as string | null) ?? null,
    content: safeHtml(row.content as string | null),
    cta_text: (row.cta_text as string | null) ?? null,
    cta_link: (row.cta_link as string | null) ?? null,
    status: (row.status as SeoPageStatus) ?? "Draft",
    template: (row.template as SeoTemplate) ?? "default",
    image_url: (row.image_url as string | null) ?? null,
    section2_heading: (row.section2_heading as string | null) ?? null,
    section2_subheading: (row.section2_subheading as string | null) ?? null,
    section2_content: safeHtml(row.section2_content as string | null),
    section2_image_url: (row.section2_image_url as string | null) ?? null,
    section3_heading: (row.section3_heading as string | null) ?? null,
    section3_content: safeHtml(row.section3_content as string | null),
    section4_heading: (row.section4_heading as string | null) ?? null,
    section4_content: safeHtml(row.section4_content as string | null),
    section5_heading: (row.section5_heading as string | null) ?? null,
    section5_content: safeHtml(row.section5_content as string | null),
    faq: normalizeFaq(row.faq),
    testimonials: normalizeTestimonials(row.testimonials),
    other_tags: (row.other_tags as string | null) ?? null,
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
  };
}

function mapService(row: Record<string, unknown>): ServiceRecord {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    slug: String(row.slug ?? ""),
    icon: (row.icon as string | null) ?? null,
    status: (row.status as ServiceStatus) ?? "Active",
    description: (row.description as string | null) ?? null,
    content: safeHtml(row.content as string | null),
    image_url: (row.image_url as string | null) ?? null,
    meta_title: (row.meta_title as string | null) ?? null,
    meta_description: (row.meta_description as string | null) ?? null,
    keywords: (row.keywords as string | null) ?? null,
    other_tags: (row.other_tags as string | null) ?? null,
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
  };
}

function mapLead(row: Record<string, unknown>): LeadRecord {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    phone: String(row.phone ?? ""),
    email: (row.email as string | null) ?? null,
    service: (row.service as string | null) ?? null,
    brand: (row.brand as string | null) ?? null,
    location: (row.location as string | null) ?? null,
    message: (row.message as string | null) ?? null,
    status: (row.status as LeadStatus) ?? "New",
    created_at: String(row.created_at ?? ""),
  };
}

function getFallbackServices(): ServiceRecord[] {
  const now = new Date().toISOString();
  return FALLBACK_SERVICES.map((service, index) => ({
    id: `fallback-${index}`,
    name: service.name,
    slug: service.slug,
    icon: null,
    status: "Active" as ServiceStatus,
    description: service.short,
    content: `<p>${service.short}</p>`,
    image_url: null,
    meta_title: `${service.name} in Tuticorin`,
    meta_description: service.short,
    keywords: `${service.name}, washing machine service, Tuticorin`,
    other_tags: null,
    created_at: now,
    updated_at: now,
  }));
}

async function queryTable(table: string) {
  if (!hasSupabaseEnv()) return null;
  try {
    const supabase = createStaticSupabaseClient();
    const { data, error } = await supabase.from(table).select("*");
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getDashboardLeads() {
  if (!hasSupabaseEnv()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []).map((row) => mapLead(row));
}

export async function getLeadById(id: string) {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("leads").select("*").eq("id", id).single();
  return data ? mapLead(data) : null;
}

export async function getDashboardServices() {
  if (!hasSupabaseEnv()) return getFallbackServices();
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("updated_at", { ascending: false });
  return (data ?? []).map((row) => mapService(row));
}

export async function getServiceById(id: string) {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("services").select("*").eq("id", id).single();
  return data ? mapService(data) : null;
}

export async function getPublicServices() {
  const rows = await queryTable("services");
  if (!rows?.length) return getFallbackServices();
  return rows.map((row) => mapService(row)).filter((s) => s.status === "Active");
}

export async function getPublicServiceBySlug(slug: string) {
  const services = await getPublicServices();
  return services.find((s) => s.slug === slug) ?? null;
}

export async function getDashboardSeoPages() {
  if (!hasSupabaseEnv()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("seo_pages")
    .select("*")
    .order("updated_at", { ascending: false });
  return (data ?? []).map((row) => mapSeoPage(row));
}

export async function getSeoPageById(id: string) {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("seo_pages").select("*").eq("id", id).single();
  return data ? mapSeoPage(data) : null;
}

export async function getPublishedSeoPageBySlug(slug: string) {
  const rows = await queryTable("seo_pages");
  if (!rows?.length) return null;
  const match = rows.find((row) => row.slug === slug && row.status === "Published");
  return match ? mapSeoPage(match) : null;
}
