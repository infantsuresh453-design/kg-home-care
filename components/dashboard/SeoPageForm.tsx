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
  const [removeImage, setRemoveImage] = useState(false);

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
      <input type="hidden" name="remove_image" value={removeImage ? "true" : "false"} />
      <input type="hidden" name="existing_image_url" value={initialData?.image_url ?? ""} />

      {/* ─── Page Structure Guide ─── */}
      <div className="mb-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
        <div className="flex items-start gap-3">
          <Layers className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
          <div>
            <p className="text-sm font-bold text-blue-300">Page Sections (auto-generated)</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Hero → Trust Bar → Services → Why Choose Us → How It Works → Reviews → CTA Banner → Content → FAQ → Footer CTA
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* ─── Main column ─── */}
        <div className="space-y-6">

          {/* Section 1: Hero */}
          <FormSection icon={Megaphone} title="Hero Section" badge="Section 1">
            <div className="grid gap-5">
              <FormField label="H1 Heading" id="heading" hint="Include location keyword (e.g. 'Washing Machine Repair in Anna Nagar')">
                <input
                  id="heading"
                  name="heading"
                  className={inputClass}
                  defaultValue={initialData?.heading ?? ""}
                  placeholder="Washing Machine Repair in [Location]"
                  onChange={(event) => {
                    if (!manualSlug && !slug) {
                      setSlug(slugify(event.target.value));
                    }
                  }}
                />
              </FormField>
              <FormField label="Subheading" id="subheading" hint="Supporting text below H1 — describe the service briefly">
                <textarea
                  id="subheading"
                  name="subheading"
                  className={textareaClass}
                  defaultValue={initialData?.subheading ?? ""}
                  rows={2}
                  placeholder="Professional doorstep washing machine service in [Location]. Same day visit, genuine parts, written warranty."
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

          {/* Section 8: Content */}
          <FormSection icon={FileText} title="Page Content (Rich Text)" badge="Section 8">
            <div className="space-y-1.5">
              <p className="text-[11px] text-slate-500">
                This content appears between the CTA banner and FAQ. Use headings, lists, and bold to structure content for SEO.
              </p>
              <RichTextEditor
                name="content"
                defaultValue={initialData?.content ?? ""}
                placeholder="Write detailed service content with H2/H3 headings targeting long-tail keywords..."
              />
            </div>
          </FormSection>

          {/* Section 6: Reviews */}
          <FormSection icon={Star} title="Reviews / Testimonials" badge="Section 6">
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

          {/* Section 9: FAQ */}
          <FormSection icon={MessageSquare} title="FAQ Section (Schema-Ready)" badge="Section 9">
            <div className="space-y-1.5">
              <p className="text-[11px] text-slate-500">
                Target &ldquo;how much does repair cost in [City]&rdquo; type queries. Each Q&A gets structured FAQ schema markup.
              </p>
              <textarea
                id="faq_text"
                name="faq_text"
                className={textareaClass}
                defaultValue={faqText}
                rows={10}
                placeholder={`Q: How much does washing machine repair cost in Anna Nagar?\nA: Basic inspection starts at ₹299. Final cost depends on the issue — we share the estimate before starting.\n\nQ: Do you provide same day service?\nA: Yes, book before 4 PM and our technician will visit the same day.\n\nQ: Which brands do you service?\nA: We service all brands including Samsung, LG, Whirlpool, Bosch, IFB, and Haier.`}
              />
            </div>
          </FormSection>

          {/* SEO Metadata */}
          <FormSection icon={Globe} title="SEO Metadata" badge="Head Tags">
            <div className="grid gap-5">
              <FormField label="Meta title" id="meta_title" hint="50-60 chars. Include location + service keyword.">
                <input
                  id="meta_title"
                  name="meta_title"
                  className={inputClass}
                  defaultValue={initialData?.meta_title ?? ""}
                  placeholder="Washing Machine Repair in Anna Nagar | Same Day Service"
                />
              </FormField>
              <FormField label="Meta description" id="meta_description" hint="150-160 chars. Include location, service, and USP.">
                <textarea
                  id="meta_description"
                  name="meta_description"
                  className={textareaClass}
                  defaultValue={initialData?.meta_description ?? ""}
                  rows={3}
                  placeholder="Expert washing machine repair in Anna Nagar. Same day doorstep service, genuine parts, 90-day warranty. Call now."
                />
              </FormField>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField label="Keywords" id="keywords" hint="Comma separated long-tail keywords">
                  <input
                    id="keywords"
                    name="keywords"
                    className={inputClass}
                    defaultValue={initialData?.keywords ?? ""}
                    placeholder="washing machine repair anna nagar, washing machine service near me"
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
              <FormField label="Target location" id="location" hint="Used in H1, headings, CTAs, and schema">
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

          {/* Featured Image */}
          <FormSection icon={ImageIcon} title="Hero Image">
            <div className="space-y-4">
              <label className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-slate-600/80 bg-slate-900/40 p-6 text-center transition-colors hover:border-blue-500/50 hover:bg-slate-900/60">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-700">
                  <ImageIcon className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Click to upload</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">PNG, JPG or WebP · Used in hero card</p>
                </div>
                <input
                  name="image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setRemoveImage(false);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
              </label>
              {preview && !removeImage ? (
                <div className="relative">
                  <img src={preview} alt="Preview" className="w-full rounded-xl border border-slate-700 object-cover" />
                  <button
                    type="button"
                    onClick={() => setRemoveImage(true)}
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
                { num: "1", label: "Hero + CTAs", color: "bg-blue-500" },
                { num: "2", label: "Trust Bar", color: "bg-emerald-500" },
                { num: "3", label: "Services (auto)", color: "bg-amber-500" },
                { num: "4", label: "Why Choose Us (auto)", color: "bg-violet-500" },
                { num: "5", label: "How It Works (auto)", color: "bg-pink-500" },
                { num: "6", label: "Reviews", color: "bg-amber-500" },
                { num: "7", label: "CTA Banner (auto)", color: "bg-blue-500" },
                { num: "8", label: "Rich Content", color: "bg-emerald-500" },
                { num: "9", label: "FAQ", color: "bg-violet-500" },
                { num: "10", label: "Footer CTA (auto)", color: "bg-pink-500" },
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
