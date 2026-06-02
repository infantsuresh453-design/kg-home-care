import { notFound } from "next/navigation";
import { updateServiceAction } from "@/lib/actions/cms";
import { getServiceById } from "@/lib/cms";
import { ServiceForm } from "@/components/dashboard/ServiceForm";

type EditServicePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold tracking-tight">Edit service</h1>
        <p className="mt-2 text-muted-foreground">Update content, metadata, and publishing state for this service.</p>
      </section>

      <ServiceForm action={updateServiceAction.bind(null, service.id)} initialData={service} submitLabel="Save changes" />
    </div>
  );
}
