import { createSeoPageAction } from "@/lib/actions/cms";
import { SeoPageForm } from "@/components/dashboard/SeoPageForm";

export default function NewSeoPagePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold tracking-tight">Create SEO page</h1>
        <p className="mt-2 text-muted-foreground">Add a new location or service landing page with SEO metadata and structured content.</p>
      </section>

      <SeoPageForm action={createSeoPageAction} submitLabel="Create SEO page" />
    </div>
  );
}
