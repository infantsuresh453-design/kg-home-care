import Link from "next/link";
import Image from "next/image";
import { SERVICES, bookingMessage, waHref } from "@/lib/contact";
import { ArrowUpRight } from "lucide-react";
import type { ServiceRecord } from "@/lib/cms";

const IMG_MAP: Record<string, string> = {
  repair:       "/service-repair.jpg",
  installation: "/service-installation.jpg",
  cleaning:     "/service-cleaning.jpg",
  pcb:          "/service-pcb.jpg",
};

type GridItem = {
  slug: string;
  name: string;
  short: string;
  image?: string | null;
  image_url?: string | null;
};

export function ServicesGrid({
  limit,
  items,
}: {
  limit?: number;
  items?: GridItem[] | ServiceRecord[];
}) {
  const source =
    items?.length
      ? items.map((item) => ({
          slug: item.slug,
          name: item.name,
          short:
            "description" in item
              ? (item as ServiceRecord).description || "Professional washing machine service."
              : (item as { short: string }).short,
          image: "image" in item ? item.image : undefined,
          image_url: "image_url" in item ? item.image_url : undefined,
        }))
      : SERVICES;
  const visibleItems = limit ? source.slice(0, limit) : source;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {visibleItems.map((s) => (
        <article
          key={s.slug}
          className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
        >
          {/* Photo */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {s.image_url ? (
              <img
                src={s.image_url}
                alt={s.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <Image
                src={IMG_MAP[(s as { image?: string }).image ?? "repair"]}
                alt={s.name}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8">
              <h3 className="text-base font-bold text-white drop-shadow-sm">{s.name}</h3>
            </div>
          </div>

          {/* Card body */}
          <div className="flex flex-1 flex-col p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">{s.short}</p>

            <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
              <Link
                href={`/services/${s.slug}`}
                className="flex items-center justify-center rounded-xl border border-border py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Details
              </Link>
              <a
                href={waHref(bookingMessage({ service: s.name }))}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Book <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
