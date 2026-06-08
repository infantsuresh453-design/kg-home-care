-- Migration: Add section 2/3/4 columns to seo_pages table
-- Run this in your Supabase SQL Editor

ALTER TABLE seo_pages
  ADD COLUMN IF NOT EXISTS section2_heading TEXT,
  ADD COLUMN IF NOT EXISTS section2_subheading TEXT,
  ADD COLUMN IF NOT EXISTS section2_content TEXT,
  ADD COLUMN IF NOT EXISTS section2_image_url TEXT,
  ADD COLUMN IF NOT EXISTS section3_heading TEXT,
  ADD COLUMN IF NOT EXISTS section3_content TEXT,
  ADD COLUMN IF NOT EXISTS section4_heading TEXT,
  ADD COLUMN IF NOT EXISTS section4_content TEXT;


-- ═══════════════════════════════════════════════════════════════
-- DUMMY DATA: Insert a sample SEO page with all new sections
-- ═══════════════════════════════════════════════════════════════

INSERT INTO seo_pages (
  title,
  slug,
  status,
  template,
  location,
  heading,
  subheading,
  meta_title,
  meta_description,
  keywords,
  cta_text,
  cta_link,
  image_url,
  section2_subheading,
  section2_heading,
  section2_content,
  section2_image_url,
  section3_heading,
  section3_content,
  section4_heading,
  section4_content,
  faq,
  testimonials
) VALUES (
  'Anna Nagar Chennai Landing Page',
  'washing-machine-repair-anna-nagar-chennai',
  'Published',
  'default',
  'Anna Nagar, Chennai',
  'Washing Machine Repair in Anna Nagar, Chennai',
  'Professional doorstep washing machine repair, installation & deep cleaning in Anna Nagar. Same day visit by certified technicians with genuine spare parts and 90-day service warranty.',
  'Washing Machine Repair in Anna Nagar Chennai | Same Day ₹299',
  'Expert washing machine repair in Anna Nagar, Chennai. Same day doorstep service for all brands — Samsung, LG, Whirlpool, Bosch, IFB. Genuine parts, 90-day warranty. Call now.',
  'washing machine repair anna nagar, washing machine service anna nagar chennai, washing machine not working anna nagar, lg washing machine repair anna nagar',
  'Call Now — ₹299 Only',
  NULL,
  NULL,
  'Our Services',
  'Washing Machine Problems We Fix in Anna Nagar',
  '<p>From simple fixes to complex board-level services — our certified technicians handle it all at your doorstep.</p>
<ul>
  <li><strong>Not Spinning / Vibrating</strong> — Drum, bearing, belt &amp; motor issues diagnosed and fixed.</li>
  <li><strong>Water Not Draining</strong> — Pump, hose blockage &amp; drain valve service.</li>
  <li><strong>Leaking Water</strong> — Gasket, inlet valve &amp; tub seal replacement.</li>
  <li><strong>PCB / Error Codes</strong> — Component-level board diagnosis &amp; soldering.</li>
  <li><strong>Noisy Operation</strong> — Bearing, shock absorber &amp; suspension service.</li>
  <li><strong>Not Starting / Dead</strong> — Power supply, door lock &amp; wiring faults.</li>
</ul>',
  NULL,
  'Brands We Service in Anna Nagar',
  '<p>We repair all major washing machine brands including:</p>
<ul>
  <li><strong>Samsung</strong> — Front load &amp; top load models</li>
  <li><strong>LG</strong> — Inverter, direct drive &amp; semi-automatic</li>
  <li><strong>Whirlpool</strong> — All capacity models</li>
  <li><strong>Bosch</strong> — Front loader specialists</li>
  <li><strong>IFB</strong> — Senator, Senorita, Executive series</li>
  <li><strong>Haier</strong> — Fully automatic &amp; semi-auto</li>
</ul>
<h3>Service Areas Near Anna Nagar</h3>
<p>Our technicians serve Anna Nagar and all surrounding areas including Anna Nagar East, Anna Nagar West, Thirumangalam, Mogappair, Aminjikarai, Shenoy Nagar, Kilpauk, and Arumbakkam.</p>',
  'Our Pricing — Transparent & Honest',
  '<p>We believe in transparent pricing with no hidden charges:</p>
<ul>
  <li><strong>Inspection &amp; Diagnosis:</strong> ₹299 (adjusted against repair)</li>
  <li><strong>Basic Repair:</strong> ₹499 – ₹999</li>
  <li><strong>Motor/PCB Repair:</strong> ₹899 – ₹2,499</li>
  <li><strong>Deep Cleaning:</strong> ₹999</li>
  <li><strong>Installation:</strong> ₹499</li>
</ul>
<h3>How It Works</h3>
<ol>
  <li><strong>Book a Visit</strong> — Call, WhatsApp, or fill the form. Takes 30 seconds.</li>
  <li><strong>Technician Arrives</strong> — Certified technician reaches your doorstep same day.</li>
  <li><strong>Problem Solved</strong> — Transparent diagnosis, upfront quote, and quality repair.</li>
</ol>',
  '[
    {"question": "How much does washing machine repair cost in Anna Nagar?", "answer": "Our inspection charge is ₹299 which gets adjusted against the final repair bill. Basic repairs start at ₹499. We always share the full estimate before starting any work."},
    {"question": "Do you provide same day washing machine service in Anna Nagar?", "answer": "Yes! Book before 4 PM and our certified technician will reach your doorstep in Anna Nagar the same day."},
    {"question": "Which washing machine brands do you repair in Anna Nagar?", "answer": "We service all brands — Samsung, LG, Whirlpool, Bosch, IFB, Haier, Godrej, Panasonic, and more. Both front-load and top-load."},
    {"question": "Is there a warranty on washing machine repairs?", "answer": "Yes, every repair comes with a written 90-day service warranty. If the same issue recurs within the warranty period, we fix it free of charge."},
    {"question": "What if my washing machine cannot be repaired?", "answer": "If a repair isn''t cost-effective, we advise you honestly. You only pay ₹299 inspection — no repair, no additional fee."}
  ]'::jsonb,
  '[
    {"name": "Ravi Kumar", "trip": "Anna Nagar East, Chennai", "rating": 5, "review": "Technician arrived within 40 minutes. Fixed my Samsung front-load which was leaking from the door. Very professional."},
    {"name": "Priya Sundaram", "trip": "Anna Nagar West, Chennai", "rating": 5, "review": "LG machine wasn''t spinning. Diagnosed quickly — worn belt. Replaced on the spot with genuine part. Works perfectly."},
    {"name": "Mohammed Irfan", "trip": "Thirumangalam, Chennai", "rating": 5, "review": "Deep cleaning for my 3-year-old Whirlpool. The amount of gunk cleaned out was shocking. Machine runs like new."},
    {"name": "Lakshmi Narayanan", "trip": "Mogappair, Chennai", "rating": 5, "review": "PCB issue in my IFB machine. Others quoted ₹4000+ for replacement. These guys repaired the board for ₹1200. Honest pricing."},
    {"name": "Deepa Rajendran", "trip": "Anna Nagar, Chennai", "rating": 5, "review": "Installation of new Samsung front-load. Leveled perfectly, connected all hoses, did a test wash. Very neat work."},
    {"name": "Karthik S", "trip": "Aminjikarai, Chennai", "rating": 5, "review": "Bosch front-load was showing error code. Technician identified the issue in minutes. Fixed on the spot. Great service."}
  ]'::jsonb
);
