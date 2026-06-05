"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wrench,
  Package,
  Sparkles,
  CircuitBoard,
  Cog,
  Droplets,
  Lock,
  CalendarCheck,
  Box,
  ArrowUpRight,
} from "lucide-react";
import { SERVICES, bookingMessage, waHref } from "@/lib/contact";
import type { ServiceRecord } from "@/lib/cms";

/* ── icon map ─────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  "washing-machine-repair": Wrench,
  installation:             Package,
  "drum-cleaning":          Sparkles,
  "pcb-repair":             CircuitBoard,
  "motor-repair":           Cog,
  "leakage-repair":         Droplets,
  "door-lock-repair":       Lock,
  amc:                      CalendarCheck,
  "spare-parts":            Box,
};

/* ── image map ────────────────────────────────────────────── */
const IMG_MAP: Record<string, string> = {
  repair:       "/service-repair.jpg",
  installation: "/service-installation.jpg",
  cleaning:     "/service-cleaning.jpg",
  pcb:          "/service-pcb.jpg",
  washing_machine: "/service-washing-machine.png",
  installation_new: "/service-installation-new.png",
  drum_cleaning: "/service-drum-cleaning.png",
  pcb_complaint: "/service-pcb-complaint.png",
  motor:        "/service-motor.png",
  leakage:      "/service-leakage.png",
};

/* ── types ────────────────────────────────────────────────── */
type GridItem = {
  slug: string;
  name: string;
  short: string;
  image?: string | null;
  image_url?: string | null;
};

type NormalizedItem = {
  slug: string;
  name: string;
  short: string;
  imgSrc: string;
};

function normalize(
  items?: GridItem[] | ServiceRecord[],
  limit?: number
): NormalizedItem[] {
  const source: NormalizedItem[] = items?.length
    ? (items as GridItem[]).map((item) => {
        const fallbackMatch = SERVICES.find(s => s.slug === item.slug);
        const imageKey = (item as any).image || fallbackMatch?.image || "repair";
        return {
          slug: item.slug,
          name: item.name,
          short:
            "description" in item
              ? ((item as unknown) as ServiceRecord).description ||
                "Professional washing machine service."
              : (item as { short: string }).short,
          imgSrc:
            item.image_url ||
            IMG_MAP[imageKey] ||
            IMG_MAP["repair"],
        };
      })
    : SERVICES.map((s) => ({
        slug: s.slug,
        name: s.name,
        short: s.short,
        imgSrc: IMG_MAP[s.image] ?? IMG_MAP["repair"],
      }));
  return limit ? source.slice(0, limit) : source;
}

/* ── component ────────────────────────────────────────────── */
export function ServicesInteractive({
  limit,
  items,
}: {
  limit?: number;
  items?: GridItem[] | ServiceRecord[];
}) {
  const services = normalize(items, limit);
  const [activeIdx, setActiveIdx] = useState(0);
  const active = services[activeIdx];
  const Icon = ICON_MAP[active.slug] ?? Wrench;

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border shadow-lift lg:grid-cols-2 lg:min-h-[520px]">
      {/* ── LEFT: service list ─────────────────────────────── */}
      {/* mobile: horizontal scrollable pill row; desktop: vertical list */}
      <div className="bg-card">
        {/* mobile pill strip */}
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none lg:hidden">
          {services.map((s, i) => {
            const ItemIcon = ICON_MAP[s.slug] ?? Wrench;
            const isActive = i === activeIdx;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={[
                  "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground hover:bg-secondary/80",
                ].join(" ")}
              >
                <ItemIcon className="h-3.5 w-3.5" />
                {s.name}
              </button>
            );
          })}
        </div>

        {/* desktop vertical list */}
        <div className="hidden divide-y divide-border lg:flex lg:flex-col">
          {services.map((s, i) => {
            const ItemIcon = ICON_MAP[s.slug] ?? Wrench;
            const isActive = i === activeIdx;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={[
                  "group flex w-full items-center gap-4 px-5 py-4 text-left transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary/60 text-foreground",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-primary/10 text-primary group-hover:bg-primary/20",
                  ].join(" ")}
                >
                  <ItemIcon className="h-5 w-5" />
                </span>
                <span className={["text-sm font-semibold", isActive ? "text-white" : "text-foreground"].join(" ")}>
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT: full image with hover overlay ────────────── */}
      <div className="group relative h-64 sm:h-80 lg:h-auto overflow-hidden">
        <Image
          key={active.imgSrc}
          src={active.imgSrc}
          alt={active.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* always-visible bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* service name — always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 transition-all duration-300 group-hover:translate-y-2 group-hover:opacity-0 lg:px-6 lg:pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-white">
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <h3 className="text-base font-bold text-white drop-shadow">{active.name}</h3>
          </div>
        </div>

        {/* hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/55 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-xl font-bold text-white drop-shadow-lg">{active.name}</h3>
          <p className="max-w-xs px-4 text-center text-sm text-white/80">{active.short}</p>
          <div className="flex items-center gap-3 pt-1">
            <Link
              href={`/services/${active.slug}`}
              className="rounded-xl border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Learn More →
            </Link>
            <a
              href={waHref(bookingMessage({ service: active.name }))}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-primary/90"
            >
              Book Now <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
