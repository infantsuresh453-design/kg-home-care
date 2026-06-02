"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DEFAULT_ACTION_STATE, slugify, type ServiceRecord } from "@/lib/cms.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ServiceFormProps = {
  action: (state: { success: boolean; message: string }, formData: FormData) => Promise<{
    success: boolean;
    message: string;
  }>;
  initialData?: ServiceRecord | null;
  submitLabel: string;
};

export function ServiceForm({ action, initialData, submitLabel }: ServiceFormProps) {
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
      router.push("/dashboard/services");
      router.refresh();
      return;
    }
    toast.error(state.message);
  }, [router, state]);

  return (
    <form action={formAction} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <input type="hidden" name="remove_image" value={removeImage ? "true" : "false"} />
      <input type="hidden" name="existing_image_url" value={initialData?.image_url ?? ""} />

      <div className="space-y-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Basic information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Service name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={initialData?.name ?? ""}
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
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                defaultValue={initialData?.status ?? "Active"}
                className="flex h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon or emoji</Label>
              <Input id="icon" name="icon" defaultValue={initialData?.icon ?? ""} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Short description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={initialData?.description ?? ""}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Page content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">HTML content</Label>
              <Textarea
                id="content"
                name="content"
                defaultValue={initialData?.content ?? ""}
                rows={14}
                placeholder="<p>Explain the service, process, benefits, and CTA.</p>"
              />
            </div>
          </CardContent>
        </Card>

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
              <Textarea
                id="other_tags"
                name="other_tags"
                defaultValue={initialData?.other_tags ?? ""}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
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
              <img src={preview} alt="Service preview" className="w-full rounded-2xl border object-cover" />
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
            <Button type="button" variant="outline" className="w-full" onClick={() => router.push("/dashboard/services")}>
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
