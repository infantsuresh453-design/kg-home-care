import { notFound } from "next/navigation";
import { updateSeoPageAction } from "@/lib/actions/cms";
import { getSeoPageById } from "@/lib/cms";
import { SeoPageForm } from "@/components/dashboard/SeoPageForm";

type EditSeoPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditSeoPage({ params }: EditSeoPageProps) {
  const { id } = await params;
  const page = await getSeoPageById(id);

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold tracking-tight">Edit SEO page</h1>
        <p className="mt-2 text-muted-foreground">Update the landing page content, metadata, FAQ, testimonials, and publishing state.</p>
      </section>

      <SeoPageForm action={updateSeoPageAction.bind(null, page.id)} initialData={page} submitLabel="Save changes" />
    </div>
  );
}
