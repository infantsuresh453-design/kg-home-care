"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DEFAULT_ACTION_STATE,
  formatFaqText,
  formatTestimonialsText,
  slugify,
  type SeoPageRecord,
} from "@/lib/cms.types";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/dashboard/RichTextEditor";
import {
  Globe,
  Settings,
  Image as ImageIcon,
  Send,
  X,
  FileText,
  MessageSquare,
  Star,
  Megaphone,
  MapPin,
  Layers,
} from "lucide-react";

type SeoPageFormProps = {
  action: (state: { success: boolean; message: string }, formData: FormData) => Promise<{
    success: boolean;
    message: string;
  }>;
  initialData?: SeoPageRecord | null;
  submitLabel: string;
};

function FormSection({
  icon: Icon,
  title,
  badge,
  children,
}: {
  icon: React.ElementType;
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-800/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 border-b border-slate-700/60 px-6 py-4">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/15 text-blue-400">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-bold text-white">{title}</h2>
        {badge && (
          <span className="ml-auto rounded-md bg-slate-700/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {badge}
          </span>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function FormField({
  label,
  id,
  children,
  hint,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-slate-500">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-600/80 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";
const textareaClass =
  "w-full rounded-xl border border-slate-600/80 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y";
const selectClass =
  "w-full rounded-xl border border-slate-600/80 bg-slate-900/60 px-4 py-2.5 text-sm text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none";

export function SeoPageForm({ action, initialData, submitLabel }: SeoPageFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, DEFAULT_ACTION_STATE);
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [manualSlug, setManualSlug] = useState(Boolean(initialData?.slug));
  const [preview, setPreview] = useState(initialData?.image_url ?? "");
  const [section2Preview, setSection2Preview] = useState(initialData?.section2_image_url ?? "");

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      router.push("/dashboard/seo-pages");
      router.refresh();
      return;
    }
    toast.error(state.message);
  }, [router, state]);

  const faqText = formatFaqText(initialData?.faq);
  const testimonialsText = formatTestimonialsText(initialData?.testimonials);

  return (
    <form action={formAction}>
      {/* ─── Page Structure Guide ─── */}
      <div className="mb-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
        <div className="flex items-start gap-3">
          <Layers className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
          <div>
            <p className="text-sm font-bold text-blue-300">Page Sections (new structure)</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              1. Hero → 2. Content + Image → 3. Content Block → 4. Content Block → 5. Content Block → 6. Testimonials → 7. FAQ → 8. Lead Form
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* ─── Main column ─── */}
        <div className="space-y-6">

          {/* Section 1: Hero */}
          <FormSection icon={Megaphone} title="Section 1 — Hero" badge="Hero">
            <div className="grid gap-5">
              <FormField label="H1 Heading" id="heading" hint="Main heading displayed in the hero section">
                <input
                  id="heading"
                  name="heading"
                  className={inputClass}
                  defaultValue={initialData?.heading ?? ""}
                  placeholder="Washing Machine Service in [Location]"
                  onChange={(event) => {
                    if (!manualSlug && !slug) {
                      setSlug(slugify(event.target.value));
                    }
                  }}
                />
              </FormField>
              <FormField label="Subheading" id="subheading" hint="Supporting text below H1">
                <textarea
                  id="subheading"
                  name="subheading"
                  className={textareaClass}
                  defaultValue={initialData?.subheading ?? ""}
                  rows={2}
                  placeholder="Professional doorstep washing machine service in [Location]."
                />
              </FormField>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField label="CTA Button Text" id="cta_text" hint="Primary call-to-action">
                  <input
                    id="cta_text"
                    name="cta_text"
                    className={inputClass}
                    defaultValue={initialData?.cta_text ?? ""}
                    placeholder="Call Now"
                  />
                </FormField>
                <FormField label="CTA Link" id="cta_link" hint="Optional custom link">
                  <input
                    id="cta_link"
                    name="cta_link"
                    className={inputClass}
                    defaultValue={initialData?.cta_link ?? ""}
                    placeholder="/contact or leave empty for phone"
                  />
                </FormField>
              </div>
            </div>
          </FormSection>

          {/* Section 2: Subheading + Heading + Content (left) + Image (right) */}
          <FormSection icon={FileText} title="Section 2 — Content + Image" badge="Left-Right">
            <div className="grid gap-5">
              <FormField label="Subheading / Eyebrow" id="section2_subheading" hint="Small text above the heading">
                <input
                  id="section2_subheading"
                  name="section2_subheading"
                  className={inputClass}
                  defaultValue={initialData?.section2_subheading ?? ""}
                  placeholder="Our Services"
                />
              </FormField>
              <FormField label="Heading" id="section2_heading" hint="Section heading">
                <input
                  id="section2_heading"
                  name="section2_heading"
                  className={inputClass}
                  defaultValue={initialData?.section2_heading ?? ""}
                  placeholder="Why We Are the Best Choice"
                />
              </FormField>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Content (left side)
                </label>
                <RichTextEditor
                  name="section2_content"
                  defaultValue={initialData?.section2_content ?? ""}
                  placeholder="Write content for the left column..."
                />
              </div>
              {/* Section 2 Image (right side) */}
              <FormField label="Image URL (right side)" id="section2_image_url" hint="External image link for the right column">
                <input
                  id="section2_image_url"
                  name="section2_image_url"
                  type="url"
                  className={inputClass}
                  defaultValue={initialData?.section2_image_url ?? ""}
                  placeholder="https://example.com/section-image.jpg"
                  onChange={(event) => setSection2Preview(event.target.value)}
                />
              </FormField>
              {section2Preview ? (
                <div className="relative">
                  <img src={section2Preview} alt="Section 2 Preview" className="w-full rounded-xl border border-slate-700 object-cover" />
                  <button
                    type="button"
                    onClick={() => setSection2Preview("")}
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-red-500/90 text-white shadow-lg transition-colors hover:bg-red-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : null}
            </div>
          </FormSection>

          {/* Section 3: Heading + Content */}
          <FormSection icon={FileText} title="Section 3 — Content Block" badge="Full Width">
            <div className="grid gap-5">
              <FormField label="Heading" id="section3_heading" hint="Section heading">
                <input
                  id="section3_heading"
                  name="section3_heading"
                  className={inputClass}
                  defaultValue={initialData?.section3_heading ?? ""}
                  placeholder="How It Works"
                />
              </FormField>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Content
                </label>
                <RichTextEditor
                  name="section3_content"
                  defaultValue={initialData?.section3_content ?? ""}
                  placeholder="Write content for section 3..."
                />
              </div>
            </div>
          </FormSection>

          {/* Section 4: Heading + Content */}
          <FormSection icon={FileText} title="Section 4 — Content Block" badge="Full Width">
            <div className="grid gap-5">
              <FormField label="Heading" id="section4_heading" hint="Section heading">
                <input
                  id="section4_heading"
                  name="section4_heading"
                  className={inputClass}
                  defaultValue={initialData?.section4_heading ?? ""}
                  placeholder="Our Pricing"
                />
              </FormField>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Content
                </label>
                <RichTextEditor
                  name="section4_content"
                  defaultValue={initialData?.section4_content ?? ""}
                  placeholder="Write content for section 4..."
                />
              </div>
            </div>
          </FormSection>

          {/* Section 5: Heading + Content */}
          <FormSection icon={FileText} title="Section 5 — Content Block" badge="Full Width">
            <div className="grid gap-5">
              <FormField label="Heading" id="section5_heading" hint="Section heading">
                <input
                  id="section5_heading"
                  name="section5_heading"
                  className={inputClass}
                  defaultValue={initialData?.section5_heading ?? ""}
                  placeholder="Additional Information"
                />
              </FormField>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Content
                </label>
                <RichTextEditor
                  name="section5_content"
                  defaultValue={initialData?.section5_content ?? ""}
                  placeholder="Write content for section 5..."
                />
              </div>
            </div>
          </FormSection>

          {/* Section 6: Testimonials */}
          <FormSection icon={Star} title="Section 6 — Testimonials" badge="Reviews">
            <div className="space-y-1.5">
              <p className="text-[11px] text-slate-500">
                Include locality names in reviews for hyperlocal SEO. Format: Name / Trip (locality) / Rating / Review
              </p>
              <textarea
                id="testimonials_text"
                name="testimonials_text"
                className={textareaClass}
                defaultValue={testimonialsText}
                rows={10}
                placeholder={`Name: Ravi Kumar\nTrip: Anna Nagar, Chennai\nRating: 5\nReview: Technician arrived within 30 minutes. Fixed my Samsung washing machine quickly.\n\nName: Priya S\nTrip: T. Nagar\nRating: 5\nReview: Excellent service, genuine parts used. Highly recommend.`}
              />
            </div>
          </FormSection>

          {/* Section 7: FAQ */}
          <FormSection icon={MessageSquare} title="Section 7 — FAQ" badge="Schema-Ready">
            <div className="space-y-1.5">
              <p className="text-[11px] text-slate-500">
                Target &ldquo;how much does service cost in [City]&rdquo; type queries. Each Q&A gets structured FAQ schema markup.
              </p>
              <textarea
                id="faq_text"
                name="faq_text"
                className={textareaClass}
                defaultValue={faqText}
                rows={10}
                placeholder={`Q: How much does washing machine service cost in Anna Nagar?\nA: Basic inspection starts at ₹299. Final cost depends on the issue — we share the estimate before starting.\n\nQ: Do you provide same day service?\nA: Yes, book before 4 PM and our technician will visit the same day.`}
              />
            </div>
          </FormSection>

          {/* Legacy content field (hidden, for backward compat) */}
          <input type="hidden" name="content" value={initialData?.content ?? ""} />

          {/* SEO Metadata */}
          <FormSection icon={Globe} title="SEO Metadata" badge="Head Tags">
            <div className="grid gap-5">
              <FormField label="Meta title" id="meta_title" hint="50-60 chars. Include location + service keyword.">
                <input
                  id="meta_title"
                  name="meta_title"
                  className={inputClass}
                  defaultValue={initialData?.meta_title ?? ""}
                  placeholder="Washing Machine Service in Anna Nagar | Same Day Service"
                />
              </FormField>
              <FormField label="Meta description" id="meta_description" hint="150-160 chars. Include location, service, and USP.">
                <textarea
                  id="meta_description"
                  name="meta_description"
                  className={textareaClass}
                  defaultValue={initialData?.meta_description ?? ""}
                  rows={3}
                  placeholder="Expert washing machine service in Anna Nagar. Same day doorstep service, genuine parts, 90-day warranty. Call now."
                />
              </FormField>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField label="Keywords" id="keywords" hint="Comma separated long-tail keywords">
                  <input
                    id="keywords"
                    name="keywords"
                    className={inputClass}
                    defaultValue={initialData?.keywords ?? ""}
                    placeholder="washing machine service anna nagar, washing machine service near me"
                  />
                </FormField>
                <FormField label="Other head tags" id="other_tags">
                  <input
                    id="other_tags"
                    name="other_tags"
                    className={inputClass}
                    defaultValue={initialData?.other_tags ?? ""}
                    placeholder="Additional meta tags (optional)"
                  />
                </FormField>
              </div>
            </div>
          </FormSection>
        </div>

        {/* ─── Sidebar column ─── */}
        <div className="space-y-6">

          {/* Page Settings */}
          <FormSection icon={Settings} title="Page Settings">
            <div className="grid gap-5">
              <FormField label="Internal title" id="title" hint="For admin reference only">
                <input
                  id="title"
                  name="title"
                  className={inputClass}
                  defaultValue={initialData?.title ?? ""}
                  placeholder="e.g. Anna Nagar Landing Page"
                  onChange={(event) => {
                    if (!manualSlug) {
                      setSlug(slugify(event.target.value));
                    }
                  }}
                  required
                />
              </FormField>
              <FormField label="URL slug" id="slug" hint="Page URL: yourdomain.com/[slug]">
                <input
                  id="slug"
                  name="slug"
                  className={inputClass}
                  value={slug}
                  onChange={(event) => {
                    setManualSlug(true);
                    setSlug(slugify(event.target.value));
                  }}
                  required
                />
              </FormField>
              <FormField label="Target location" id="location" hint="Used in headings, CTAs, and schema">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="location"
                    name="location"
                    className={inputClass + " pl-9"}
                    defaultValue={initialData?.location ?? ""}
                    placeholder="e.g. Anna Nagar, Chennai"
                  />
                </div>
              </FormField>
              <FormField label="Status" id="status">
                <select
                  id="status"
                  name="status"
                  className={selectClass}
                  defaultValue={initialData?.status ?? "Draft"}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </FormField>
              <FormField label="Template" id="template">
                <select
                  id="template"
                  name="template"
                  className={selectClass}
                  defaultValue={initialData?.template ?? "default"}
                >
                  <option value="default">Default (Landing Page)</option>
                  <option value="article">Article</option>
                </select>
              </FormField>
            </div>
          </FormSection>

          {/* Hero Image */}
          <FormSection icon={ImageIcon} title="Hero Image">
            <div className="space-y-4">
              <FormField label="Image URL" id="image_url" hint="External image link for hero background">
                <input
                  id="image_url"
                  name="image_url"
                  type="url"
                  className={inputClass}
                  defaultValue={initialData?.image_url ?? ""}
                  placeholder="https://example.com/hero-image.jpg"
                  onChange={(event) => setPreview(event.target.value)}
                />
              </FormField>
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Preview" className="w-full rounded-xl border border-slate-700 object-cover" />
                  <button
                    type="button"
                    onClick={() => { setPreview(""); }}
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-red-500/90 text-white shadow-lg transition-colors hover:bg-red-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : null}
            </div>
          </FormSection>

          {/* Section Preview */}
          <div className="rounded-2xl border border-slate-700/80 bg-slate-800/50 p-5 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Page Preview Structure</p>
            <div className="mt-4 space-y-2">
              {[
                { num: "1", label: "Hero (heading + CTA)", color: "bg-blue-500" },
                { num: "2", label: "Content + Image", color: "bg-emerald-500" },
                { num: "3", label: "Content Block", color: "bg-amber-500" },
                { num: "4", label: "Content Block", color: "bg-violet-500" },
                { num: "5", label: "Content Block", color: "bg-teal-500" },
                { num: "6", label: "Testimonials", color: "bg-pink-500" },
                { num: "7", label: "FAQ", color: "bg-amber-500" },
                { num: "8", label: "Lead Form", color: "bg-blue-500" },
              ].map(({ num, label, color }) => (
                <div key={num} className="flex items-center gap-3">
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded text-[10px] font-bold text-white ${color}`}>
                    {num}
                  </span>
                  <span className="text-xs text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Publish */}
          <div className="rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-sm">
            <div className="space-y-3">
              <Button
                type="submit"
                disabled={pending}
                className="w-full gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_-2px_rgba(59,130,246,0.4)] hover:bg-blue-500"
              >
                <Send className="h-3.5 w-3.5" />
                {pending ? "Saving..." : submitLabel}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl border-slate-600 bg-transparent py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700 hover:text-white"
                onClick={() => router.push("/dashboard/seo-pages")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
