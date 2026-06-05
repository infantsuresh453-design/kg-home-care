import { createSeoPageAction } from "@/lib/actions/cms";
import { SeoPageForm } from "@/components/dashboard/SeoPageForm";
import { Plus } from "lucide-react";

export default function NewSeoPagePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/15 text-blue-400">
          <Plus className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white">Create SEO Page</h1>
          <p className="text-sm text-slate-400">Add a new location or service landing page with SEO metadata and structured content.</p>
        </div>
      </div>

      <SeoPageForm action={createSeoPageAction} submitLabel="Create SEO page" />
    </div>
  );
}
