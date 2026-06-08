-- Migration: Add section 5 columns to seo_pages table
-- Run this in your Supabase SQL Editor

ALTER TABLE seo_pages
  ADD COLUMN IF NOT EXISTS section5_heading TEXT,
  ADD COLUMN IF NOT EXISTS section5_content TEXT;
