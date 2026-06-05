import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vvjpcgswkgvpiufinmpx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2anBjZ3N3a2d2cGl1ZmlubXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODIyNzgsImV4cCI6MjA5NjA1ODI3OH0.UlRbVI8_hTv3MjJEKyy2PNefHq1u7zJugpTFPbsXjcM";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const samplePage = {
  title: "Anna Nagar Chennai Landing Page",
  slug: "washing-machine-repair-anna-nagar-chennai",
  status: "Published",
  template: "default",
  location: "Anna Nagar, Chennai",
  heading: "Washing Machine Repair in Anna Nagar, Chennai",
  subheading: "Professional doorstep washing machine repair, installation & deep cleaning in Anna Nagar. Same day visit by certified technicians with genuine spare parts and 90-day service warranty.",
  meta_title: "Washing Machine Repair in Anna Nagar Chennai | Same Day ₹299",
  meta_description: "Expert washing machine repair in Anna Nagar, Chennai. Same day doorstep service for all brands — Samsung, LG, Whirlpool, Bosch, IFB. Genuine parts, 90-day warranty. Call now.",
  keywords: "washing machine repair anna nagar, washing machine service anna nagar chennai, washing machine not working anna nagar, lg washing machine repair anna nagar",
  cta_text: "Call Now — ₹299 Only",
  cta_link: null,
  image_url: null,
  content: `<h2>Expert Washing Machine Repair Service in Anna Nagar</h2><p>KG Home Care provides fast, reliable washing machine repair services in Anna Nagar, Chennai. Whether your machine is leaking, not spinning, making strange noises, or showing error codes — our certified technicians can fix it at your doorstep.</p><h3>Brands We Service in Anna Nagar</h3><p>We repair all major washing machine brands including:</p><ul><li><strong>Samsung</strong> — Front load & top load models</li><li><strong>LG</strong> — Inverter, direct drive & semi-automatic</li><li><strong>Whirlpool</strong> — All capacity models</li><li><strong>Bosch</strong> — Front loader specialists</li><li><strong>IFB</strong> — Senator, Senorita, Executive series</li><li><strong>Haier</strong> — Fully automatic & semi-auto</li></ul><h3>Our Pricing</h3><p>We believe in transparent pricing with no hidden charges:</p><ul><li><strong>Inspection & Diagnosis:</strong> ₹299 (adjusted against repair)</li><li><strong>Basic Repair:</strong> ₹499 – ₹999</li><li><strong>Motor/PCB Repair:</strong> ₹899 – ₹2,499</li><li><strong>Deep Cleaning:</strong> ₹999</li><li><strong>Installation:</strong> ₹499</li></ul><h3>Service Areas Near Anna Nagar</h3><p>Our technicians serve Anna Nagar and all surrounding areas including Anna Nagar East, Anna Nagar West, Thirumangalam, Mogappair, Aminjikarai, Shenoy Nagar, Kilpauk, and Arumbakkam.</p>`,
  faq: [
    { question: "How much does washing machine repair cost in Anna Nagar?", answer: "Our inspection charge is ₹299 which gets adjusted against the final repair bill. Basic repairs start at ₹499. We always share the full estimate before starting any work." },
    { question: "Do you provide same day washing machine service in Anna Nagar?", answer: "Yes! Book before 4 PM and our certified technician will reach your doorstep in Anna Nagar the same day." },
    { question: "Which washing machine brands do you repair in Anna Nagar?", answer: "We service all brands — Samsung, LG, Whirlpool, Bosch, IFB, Haier, Godrej, Panasonic, and more. Both front-load and top-load." },
    { question: "Is there a warranty on washing machine repairs?", answer: "Yes, every repair comes with a written 90-day service warranty. If the same issue recurs within the warranty period, we fix it free of charge." },
    { question: "What if my washing machine cannot be repaired?", answer: "If a repair isn't cost-effective, we advise you honestly. You only pay ₹299 inspection — no repair, no additional fee." }
  ],
  testimonials: [
    { name: "Ravi Kumar", trip: "Anna Nagar East, Chennai", rating: 5, review: "Technician arrived within 40 minutes. Fixed my Samsung front-load which was leaking from the door. Very professional." },
    { name: "Priya Sundaram", trip: "Anna Nagar West, Chennai", rating: 5, review: "LG machine wasn't spinning. Diagnosed quickly — worn belt. Replaced on the spot with genuine part. Works perfectly." },
    { name: "Mohammed Irfan", trip: "Thirumangalam, Chennai", rating: 5, review: "Deep cleaning for my 3-year-old Whirlpool. The amount of gunk cleaned out was shocking. Machine runs like new." },
    { name: "Lakshmi Narayanan", trip: "Mogappair, Chennai", rating: 5, review: "PCB issue in my IFB machine. Others quoted ₹4000+ for replacement. These guys repaired the board for ₹1200. Honest pricing." },
    { name: "Deepa Rajendran", trip: "Anna Nagar, Chennai", rating: 5, review: "AMC service — two visits done, thorough cleaning and checkup both times. Machine running smoothly. Worth every rupee." },
    { name: "Karthik S", trip: "Aminjikarai, Chennai", rating: 5, review: "Installation of new Bosch front-load. Leveled perfectly, connected all hoses, did a test wash. Very neat work." }
  ],
  other_tags: null
};

async function seed() {
  console.log("Inserting sample SEO page via SQL...");
  
  // Use rpc to bypass RLS (if available) or try direct insert
  const { data, error } = await supabase
    .from("seo_pages")
    .insert(samplePage)
    .select()
    .single();

  if (error) {
    console.error("Direct insert failed (RLS):", error.message);
    console.log("\n─── Alternative: Insert via Supabase Dashboard SQL Editor ───\n");
    console.log("Go to: https://supabase.com/dashboard → SQL Editor → Run this:\n");
    
    const faqJson = JSON.stringify(samplePage.faq).replace(/'/g, "''");
    const testimonialsJson = JSON.stringify(samplePage.testimonials).replace(/'/g, "''");
    const contentEscaped = samplePage.content.replace(/'/g, "''");
    
    console.log(`INSERT INTO seo_pages (title, slug, status, template, location, heading, subheading, meta_title, meta_description, keywords, cta_text, content, faq, testimonials)
VALUES (
  '${samplePage.title}',
  '${samplePage.slug}',
  '${samplePage.status}',
  '${samplePage.template}',
  '${samplePage.location}',
  '${samplePage.heading}',
  '${samplePage.subheading}',
  '${samplePage.meta_title}',
  '${samplePage.meta_description}',
  '${samplePage.keywords}',
  '${samplePage.cta_text}',
  '${contentEscaped}',
  '${faqJson}'::jsonb,
  '${testimonialsJson}'::jsonb
);`);
    return;
  }

  console.log("✓ Sample SEO page created!");
  console.log(`  View at: http://localhost:3000/${data.slug}`);
}

seed();
