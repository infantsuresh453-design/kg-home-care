-- Migration: Add other_tags column to seo_pages table
-- Run this in your Supabase SQL Editor

ALTER TABLE seo_pages
  ADD COLUMN IF NOT EXISTS other_tags TEXT;

-- Also add to services table if not present
ALTER TABLE services
  ADD COLUMN IF NOT EXISTS other_tags TEXT;
