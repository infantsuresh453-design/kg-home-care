import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { deleteLeadAction, updateLeadStatusAction } from "@/lib/actions/cms";
import { getLeadById } from "@/lib/cms";
import { Button } from "@/components/ui/button";

const statuses = ["New", "Contacted", "Converted", "Closed"] as const;

type LeadDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-white p-8 shadow-soft">
        <Link href="/dashboard/leads" className="text-sm font-medium text-primary hover:underline">
          ← Back to leads
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{lead.name}</h1>
        <p className="mt-2 text-muted-foreground">
          Received {lead.created_at ? format(new Date(lead.created_at), "dd MMM yyyy, p") : "-"}
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-3xl border bg-white p-6 shadow-soft">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="mt-1 font-semibold">{lead.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="mt-1 font-semibold">{lead.email || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Service</p>
              <p className="mt-1 font-semibold">{lead.service || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Brand</p>
              <p className="mt-1 font-semibold">{lead.brand || "-"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="mt-1 font-semibold">{lead.location || "-"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">Message</p>
              <p className="mt-1 whitespace-pre-wrap rounded-2xl bg-secondary/40 p-4">{lead.message || "-"}</p>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Quick actions</h2>
            <div className="mt-4 grid gap-3">
              <a href={`tel:${lead.phone}`} className="rounded-xl border px-4 py-3 text-center text-sm font-medium hover:bg-secondary">
                Call lead
              </a>
              <a
                href={`https://wa.me/91${lead.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
              >
                Open WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Update status</h2>
            <div className="mt-4 grid gap-3">
              {statuses.map((status) => (
                <form key={status} action={updateLeadStatusAction.bind(null, lead.id)}>
                  <input type="hidden" name="status" value={status} />
                  <Button type="submit" variant={lead.status === status ? "default" : "outline"} className="w-full">
                    Mark as {status}
                  </Button>
                </form>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-soft">
            <form action={deleteLeadAction.bind(null, lead.id)}>
              <Button type="submit" variant="destructive" className="w-full">
                Delete lead
              </Button>
            </form>
          </div>
        </aside>
      </section>
    </div>
  );
}
