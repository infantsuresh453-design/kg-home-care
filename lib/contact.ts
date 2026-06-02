// Single source of truth for KG Home Care contact details.
// Replace PHONE_RAW and WHATSAPP_RAW with the real number when provided.

export const BUSINESS = {
  name: "KG Home Care",
  tagline: "Washing Machine Repair Experts in Tuticorin",
  address: {
    line1: "7/1, Kovil Street",
    line2: "Pudukkottai - 628103",
    city: "Tuticorin",
    state: "Tamil Nadu",
    country: "India",
  },
  hours: "Mon – Sun · 8:00 AM – 9:00 PM",
  email: "support@kghomecare.in",
};

// Use international format without "+" or spaces for wa.me links.
export const PHONE_RAW = "919999999999"; // TODO: replace with real number
export const WHATSAPP_RAW = "919999999999"; // TODO: replace with real number

export const PHONE_DISPLAY = "+91 99999 99999";

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

export const BRANDS = ["IFB", "LG", "Samsung", "Bosch", "Whirlpool"] as const;

export const SERVICES = [
  {
    slug: "washing-machine-repair",
    name: "Washing Machine Repair",
    short: "Expert repair for all front-load & top-load washing machines.",
    image: "repair",
  },
  {
    slug: "installation",
    name: "Installation Service",
    short: "Safe, certified installation with hose, leveling & test cycle.",
    image: "installation",
  },
  {
    slug: "drum-cleaning",
    name: "Drum Cleaning",
    short: "Deep drum cleaning to remove detergent residue, mold & odor.",
    image: "cleaning",
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    short: "Full machine deep clean — drum, gasket, filter & dispenser.",
    image: "cleaning",
  },
  {
    slug: "pcb-repair",
    name: "PCB Repair",
    short: "Control board diagnosis, component-level soldering & repair.",
    image: "pcb",
  },
  {
    slug: "motor-repair",
    name: "Motor Repair",
    short: "Motor rewinding, bearing & coupling replacement.",
    image: "repair",
  },
  {
    slug: "leakage-repair",
    name: "Water Leakage Repair",
    short: "Find & fix hose, gasket, valve & tub leaks the same day.",
    image: "repair",
  },
  {
    slug: "door-lock-repair",
    name: "Door Lock Repair",
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
    short: "Genuine OEM spare parts for IFB, LG, Samsung, Bosch, Whirlpool.",
    image: "pcb",
  },
] as const;

export type Service = (typeof SERVICES)[number];
