-- ╔══════════════════════════════════════════════════════════════════════════════╗
-- ║  KG Home Care — Full Database Schema                                       ║
-- ║  Run this in your NEW Supabase project's SQL Editor                        ║
-- ║  (Supabase Dashboard → SQL Editor → New Query → Paste & Run)              ║
-- ╚══════════════════════════════════════════════════════════════════════════════╝


-- ═══════════════════════════════════════════════════════════════
-- 1. EXTENSIONS
-- ═══════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ═══════════════════════════════════════════════════════════════
-- 2. TABLE: leads
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS leads (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT,
  service     TEXT,
  brand       TEXT,
  location    TEXT,
  message     TEXT,
  status      TEXT NOT NULL DEFAULT 'New',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for dashboard listing (newest first)
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

-- Index for filtering by status
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);


-- ═══════════════════════════════════════════════════════════════
-- 3. TABLE: services
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS services (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  icon             TEXT,
  status           TEXT NOT NULL DEFAULT 'Active',
  description      TEXT,
  content          TEXT,
  image_url        TEXT,
  meta_title       TEXT,
  meta_description TEXT,
  keywords         TEXT,
  other_tags       TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for public listing (active services)
CREATE INDEX IF NOT EXISTS idx_services_status ON services (status);

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_services_slug ON services (slug);


-- ═══════════════════════════════════════════════════════════════
-- 4. TABLE: seo_pages
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS seo_pages (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title               TEXT NOT NULL,
  slug                TEXT NOT NULL UNIQUE,
  meta_title          TEXT,
  meta_description    TEXT,
  keywords            TEXT,
  location            TEXT,
  heading             TEXT,
  subheading          TEXT,
  content             TEXT,
  cta_text            TEXT,
  cta_link            TEXT,
  status              TEXT NOT NULL DEFAULT 'Draft',
  template            TEXT NOT NULL DEFAULT 'default',
  image_url           TEXT,
  -- Section 2: subheading + heading + content (left) + image (right)
  section2_heading    TEXT,
  section2_subheading TEXT,
  section2_content    TEXT,
  section2_image_url  TEXT,
  -- Section 3: heading + content (full width)
  section3_heading    TEXT,
  section3_content    TEXT,
  -- Section 4: heading + content (full width)
  section4_heading    TEXT,
  section4_content    TEXT,
  -- Section 5: heading + content (full width)
  section5_heading    TEXT,
  section5_content    TEXT,
  -- Structured data
  faq                 JSONB DEFAULT '[]'::jsonb,
  testimonials        JSONB DEFAULT '[]'::jsonb,
  -- Other meta tags (canonical, robots, og:image, etc.)
  other_tags          TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for public slug lookups (published pages only)
CREATE INDEX IF NOT EXISTS idx_seo_pages_slug_status ON seo_pages (slug, status);

-- Index for dashboard listing
CREATE INDEX IF NOT EXISTS idx_seo_pages_created_at ON seo_pages (created_at DESC);


-- ═══════════════════════════════════════════════════════════════
-- 5. ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;

-- ─── LEADS ───
-- Anyone can INSERT (public lead capture form)
CREATE POLICY "leads_insert_public" ON leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can SELECT/UPDATE/DELETE
CREATE POLICY "leads_select_auth" ON leads
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "leads_update_auth" ON leads
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "leads_delete_auth" ON leads
  FOR DELETE TO authenticated
  USING (true);

-- ─── SERVICES ───
-- Anyone can SELECT (public pages read services)
CREATE POLICY "services_select_public" ON services
  FOR SELECT TO anon, authenticated
  USING (true);

-- Only authenticated users can INSERT/UPDATE/DELETE
CREATE POLICY "services_insert_auth" ON services
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "services_update_auth" ON services
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "services_delete_auth" ON services
  FOR DELETE TO authenticated
  USING (true);

-- ─── SEO PAGES ───
-- Anyone can SELECT (public pages render SEO content)
CREATE POLICY "seo_pages_select_public" ON seo_pages
  FOR SELECT TO anon, authenticated
  USING (true);

-- Only authenticated users can INSERT/UPDATE/DELETE
CREATE POLICY "seo_pages_insert_auth" ON seo_pages
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "seo_pages_update_auth" ON seo_pages
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "seo_pages_delete_auth" ON seo_pages
  FOR DELETE TO authenticated
  USING (true);


-- ═══════════════════════════════════════════════════════════════
-- 6. STORAGE BUCKET: images
-- ═══════════════════════════════════════════════════════════════

-- Create the images bucket (public access for reading)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload images
CREATE POLICY "images_upload_auth" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to delete their uploads
CREATE POLICY "images_delete_auth" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'images');

-- Allow public read access to images
CREATE POLICY "images_select_public" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'images');


-- ═══════════════════════════════════════════════════════════════
-- 7. HELPER FUNCTION: auto-update updated_at
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Auto-update updated_at on services
CREATE TRIGGER services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Auto-update updated_at on seo_pages
CREATE TRIGGER seo_pages_updated_at
  BEFORE UPDATE ON seo_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();


-- ═══════════════════════════════════════════════════════════════
-- 8. CREATE YOUR ADMIN USER
-- ═══════════════════════════════════════════════════════════════
-- After running this SQL, go to:
--   Supabase Dashboard → Authentication → Users → Add User
--   Email: your-email@example.com
--   Password: your-secure-password
--
-- Then update your .env.local:
--   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
--   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
-- ═══════════════════════════════════════════════════════════════
