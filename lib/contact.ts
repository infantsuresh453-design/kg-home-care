// Single source of truth for KG Home Care contact details.
// Replace PHONE_RAW and WHATSAPP_RAW with the real number when provided.

export const BUSINESS = {
  name: "KG Home Care",
  tagline: "Washing Machine Service Centre in Tuticorin",
  address: {
    line1: "5A/394, Caldwell Colony 3rd Street",
    line2: "Tuticorin – 628008",
    city: "Tuticorin",
    state: "Tamil Nadu",
    country: "India",
  },
  hours: "Mon – Sun · 8:00 AM – 9:00 PM",
  email: "support@kghomecare.in",
};

// Use international format without "+" or spaces for wa.me links.
export const PHONE_RAW = "918778838405";
export const WHATSAPP_RAW = "918778838405";

export const PHONE_DISPLAY = "+91 87788 38405";

export function telHref(): string {
  return `tel:+${PHONE_RAW}`;
}

export function waHref(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_RAW}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function bookingMessage(input: {
  location?: string;
  brand?: string;
  issue?: string;
  phone?: string;
  service?: string;
}): string {
  const lines = [
    "Hi KG Home Care, I'd like to book a washing machine service.",
    "",
    input.service ? `Service: ${input.service}` : null,
    input.brand ? `Brand: ${input.brand}` : null,
    input.issue ? `Issue: ${input.issue}` : null,
    input.location ? `Location: ${input.location}` : null,
    input.phone ? `My phone: ${input.phone}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

export const BRANDS = [] as const;

export const SERVICES = [
  {
    slug: "washing-machine-service",
    name: "Washing Machine Service",
    short: "Expert service for all front-load & top-load washing machines.",
    image: "washing_machine",
  },
  {
    slug: "installation",
    name: "Installation Service",
    short: "Safe, certified installation with hose, leveling & test cycle.",
    image: "installation_new",
  },
  {
    slug: "drum-cleaning",
    name: "Drum Cleaning",
    short: "Deep drum cleaning to remove detergent residue, mold & odor.",
    image: "drum_cleaning",
  },
  {
    slug: "pcb-repair",
    name: "PCB Complaint",
    short: "Control board diagnosis, component-level soldering & service.",
    image: "pcb",
  },
  {
    slug: "motor-repair",
    name: "Motor Complaint",
    short: "Motor rewinding, bearing & coupling replacement.",
    image: "motor",
  },
  {
    slug: "leakage-repair",
    name: "Water Leakage Issue",
    short: "Find & fix hose, gasket, valve & tub leaks the same day.",
    image: "leakage",
  },
  {
    slug: "door-lock-repair",
    name: "Door Lock Issue",
    short: "Door lock, latch & interlock replacement for all brands.",
    image: "pcb",
  },
  {
    slug: "amc",
    name: "AMC Service",
    short: "Annual Maintenance — 2 visits, priority support, parts discount.",
    image: "installation",
  },
  {
    slug: "spare-parts",
    name: "Spare Parts Replacement",
    short: "Genuine OEM spare parts for all major brands.",
    image: "repair",
  },
] as const;

export type Service = (typeof SERVICES)[number];
