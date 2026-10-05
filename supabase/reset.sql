-- Optional: wipe the portfolio tables and start fresh.
-- Run this FIRST, then run supabase/schema.sql in the same SQL Editor.
--
-- WARNING: this permanently deletes all rows in the portfolio tables
-- (profile, projects, certifications, testimonials).
-- Supabase Auth users and Storage files are NOT touched.

drop table if exists public.site_copy cascade;
drop table if exists public.testimonials cascade;
drop table if exists public.certifications cascade;
drop table if exists public.projects cascade;
drop table if exists public.profile cascade;

notify pgrst, 'reload schema';
