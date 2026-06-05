import { notFound } from "next/navigation";
import { updateSeoPageAction } from "@/lib/actions/cms";
import { getSeoPageById } from "@/lib/cms";
import { SeoPageForm } from "@/components/dashboard/SeoPageForm";
import { FileText } from "lucide-react";

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
      <div className="flex items-center gap-4">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/15 text-violet-400">
          <FileText className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white">Edit SEO Page</h1>
          <p className="text-sm text-slate-400">Update content, metadata, FAQ, testimonials, and publishing state.</p>
        </div>
      </div>

      <SeoPageForm action={updateSeoPageAction.bind(null, page.id)} initialData={page} submitLabel="Save changes" />
    </div>
  );
}
