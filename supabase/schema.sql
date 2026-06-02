create extension if not exists pgcrypto;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  service text,
  brand text,
  location text,
  message text,
  status text not null default 'New',
  created_at timestamptz not null default now()
);

create table if not exists seo_pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  meta_title text,
  meta_description text,
  keywords text,
  location text,
  heading text,
  subheading text,
  content text,
  cta_text text,
  cta_link text,
  status text not null default 'Draft',
  template text not null default 'default',
  image_url text,
  faq jsonb not null default '[]'::jsonb,
  testimonials jsonb not null default '[]'::jsonb,
  other_tags text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  icon text,
  status text not null default 'Active',
  description text,
  content text,
  image_url text,
  meta_title text,
  meta_description text,
  keywords text,
  other_tags text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table leads enable row level security;
alter table seo_pages enable row level security;
alter table services enable row level security;

drop policy if exists "Public insert leads" on leads;
drop policy if exists "Authenticated manage leads" on leads;
drop policy if exists "Public read seo pages" on seo_pages;
drop policy if exists "Authenticated manage seo pages" on seo_pages;
drop policy if exists "Public read services" on services;
drop policy if exists "Authenticated manage services" on services;

create policy "Public insert leads" on leads
  for insert
  with check (true);

create policy "Authenticated manage leads" on leads
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Public read seo pages" on seo_pages
  for select
  using (status = 'Published');

create policy "Authenticated manage seo pages" on seo_pages
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Public read services" on services
  for select
  using (status = 'Active');

create policy "Authenticated manage services" on services
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
