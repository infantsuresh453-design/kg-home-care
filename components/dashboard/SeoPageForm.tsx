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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SeoPageFormProps = {
  action: (state: { success: boolean; message: string }, formData: FormData) => Promise<{
    success: boolean;
    message: string;
  }>;
  initialData?: SeoPageRecord | null;
  submitLabel: string;
};

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
    <form action={formAction} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <input type="hidden" name="remove_image" value={removeImage ? "true" : "false"} />
      <input type="hidden" name="existing_image_url" value={initialData?.image_url ?? ""} />

      <div className="space-y-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>SEO metadata</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta title</Label>
              <Input id="meta_title" name="meta_title" defaultValue={initialData?.meta_title ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta description</Label>
              <Textarea
                id="meta_description"
                name="meta_description"
                defaultValue={initialData?.meta_description ?? ""}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input id="keywords" name="keywords" defaultValue={initialData?.keywords ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other_tags">Other head tags</Label>
              <Textarea id="other_tags" name="other_tags" defaultValue={initialData?.other_tags ?? ""} rows={4} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Page content</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                name="heading"
                defaultValue={initialData?.heading ?? ""}
                onChange={(event) => {
                  if (!manualSlug && !slug) {
                    setSlug(slugify(event.target.value));
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subheading">Subheading</Label>
              <Textarea id="subheading" name="subheading" defaultValue={initialData?.subheading ?? ""} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">HTML content</Label>
              <Textarea
                id="content"
                name="content"
                defaultValue={initialData?.content ?? ""}
                rows={18}
                placeholder="<p>Write the full body content for this landing page.</p>"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cta_text">CTA text</Label>
                <Input id="cta_text" name="cta_text" defaultValue={initialData?.cta_text ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta_link">CTA link</Label>
                <Input id="cta_link" name="cta_link" defaultValue={initialData?.cta_link ?? ""} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>FAQ and testimonials</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="faq_text">FAQ text</Label>
              <Textarea
                id="faq_text"
                name="faq_text"
                defaultValue={faqText}
                rows={10}
                placeholder={"Q: How quickly can you send a technician?\nA: Usually the same day in Tuticorin."}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonials_text">Testimonials text</Label>
              <Textarea
                id="testimonials_text"
                name="testimonials_text"
                defaultValue={testimonialsText}
                rows={10}
                placeholder={"Name: Ravi Kumar\nTrip: Home service\nRating: 5\nReview: Fast diagnosis and neat work."}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Page settings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Internal title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={initialData?.title ?? ""}
                onChange={(event) => {
                  if (!manualSlug) {
                    setSlug(slugify(event.target.value));
                  }
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={slug}
                onChange={(event) => {
                  setManualSlug(true);
                  setSlug(slugify(event.target.value));
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Target location</Label>
              <Input id="location" name="location" defaultValue={initialData?.location ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                defaultValue={initialData?.status ?? "Draft"}
                className="flex h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <select
                id="template"
                name="template"
                defaultValue={initialData?.template ?? "default"}
                className="flex h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="default">Default</option>
                <option value="article">Article</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Featured image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              name="image"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                setRemoveImage(false);
                setPreview(URL.createObjectURL(file));
              }}
            />
            {preview && !removeImage ? (
              <img src={preview} alt="SEO page preview" className="w-full rounded-2xl border object-cover" />
            ) : (
              <div className="rounded-2xl border border-dashed p-8 text-sm text-muted-foreground">
                No image selected
              </div>
            )}
            {preview ? (
              <Button type="button" variant="outline" onClick={() => setRemoveImage(true)}>
                Remove image
              </Button>
            ) : null}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Publish</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Saving..." : submitLabel}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => router.push("/dashboard/seo-pages")}>
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
