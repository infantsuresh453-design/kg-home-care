// Client-safe types and constants — no server imports here.

export type LeadStatus = "New" | "Contacted" | "Converted" | "Closed";
export type ServiceStatus = "Active" | "Inactive";
export type SeoPageStatus = "Draft" | "Published";
export type SeoTemplate = "default" | "article";

export type ActionState = {
  success: boolean;
  message: string;
};

export const DEFAULT_ACTION_STATE: ActionState = {
  success: false,
  message: "",
};

export type LeadRecord = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  brand: string | null;
  location: string | null;
  message: string | null;
  status: LeadStatus;
  created_at: string;
};

export type ServiceRecord = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  status: ServiceStatus;
  description: string | null;
  content: string | null;
  image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string | null;
  other_tags: string | null;
  created_at: string;
  updated_at: string;
};

export type SeoPageRecord = {
  id: string;
  title: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string | null;
  location: string | null;
  heading: string | null;
  subheading: string | null;
  content: string | null;
  cta_text: string | null;
  cta_link: string | null;
  status: SeoPageStatus;
  template: SeoTemplate;
  image_url: string | null;
  // Section 2: subheading + heading + content (left) + image (right)
  section2_heading: string | null;
  section2_subheading: string | null;
  section2_content: string | null;
  section2_image_url: string | null;
  // Section 3: heading + content
  section3_heading: string | null;
  section3_content: string | null;
  // Section 4: heading + content
  section4_heading: string | null;
  section4_content: string | null;
  faq: Array<{ question: string; answer: string }>;
  testimonials: Array<{
    name: string;
    trip?: string;
    rating?: number;
    review: string;
  }>;
  other_tags: string | null;
  created_at: string;
  updated_at: string;
};

// Pure utility functions — safe for client components

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseFaqText(input: string) {
  const lines = input.split(/\r?\n/);
  const items: SeoPageRecord["faq"] = [];
  let currentQuestion = "";
  let currentAnswer = "";

  const pushCurrent = () => {
    if (currentQuestion && currentAnswer) {
      items.push({ question: currentQuestion.trim(), answer: currentAnswer.trim() });
    }
    currentQuestion = "";
    currentAnswer = "";
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("Q:")) {
      pushCurrent();
      currentQuestion = line.slice(2).trim();
      continue;
    }

    if (line.startsWith("A:")) {
      currentAnswer = line.slice(2).trim();
      continue;
    }

    if (currentAnswer) {
      currentAnswer = `${currentAnswer}\n${line}`;
    } else if (currentQuestion) {
      currentQuestion = `${currentQuestion} ${line}`.trim();
    }
  }

  pushCurrent();
  return items;
}

export function parseTestimonialsText(input: string) {
  const blocks = input
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks
    .map((block) => {
      const lines = block.split(/\r?\n/);
      const record: Record<string, string> = {};

      for (const line of lines) {
        const [label, ...rest] = line.split(":");
        if (!label || rest.length === 0) continue;
        record[label.trim().toLowerCase()] = rest.join(":").trim();
      }

      if (!record.name || !record.review) return null;

      return {
        name: record.name,
        trip: record.trip || undefined,
        review: record.review,
        rating: record.rating ? Number(record.rating) : undefined,
      };
    })
    .filter(Boolean) as SeoPageRecord["testimonials"];
}

export function formatFaqText(items: SeoPageRecord["faq"] | null | undefined) {
  return (items ?? [])
    .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
    .join("\n\n");
}

export function formatTestimonialsText(
  items: SeoPageRecord["testimonials"] | null | undefined,
) {
  return (items ?? [])
    .map((item) =>
      [
        `Name: ${item.name}`,
        item.trip ? `Trip: ${item.trip}` : null,
        item.rating ? `Rating: ${item.rating}` : null,
        `Review: ${item.review}`,
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");
}
