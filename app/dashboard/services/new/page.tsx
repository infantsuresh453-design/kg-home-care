import { createServiceAction } from "@/lib/actions/cms";
import { ServiceForm } from "@/components/dashboard/ServiceForm";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold tracking-tight">Create service</h1>
        <p className="mt-2 text-muted-foreground">Add a new service that can appear on `/services` and its own detail page.</p>
      </section>

      <ServiceForm action={createServiceAction} submitLabel="Create service" />
    </div>
  );
}
