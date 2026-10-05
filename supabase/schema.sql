-- Run this in the Supabase SQL Editor after creating your project.
-- Safe to re-run at any time: it adds missing columns to existing tables,
-- refreshes policies, and reloads the PostgREST schema cache.
-- The first user is created from Authentication > Users.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables (created if missing, then aligned column-by-column)
-- ---------------------------------------------------------------------------

create table if not exists public.profile (
  id uuid primary key default gen_random_uuid()
);

alter table public.profile
  add column if not exists full_name text not null default '',
  add column if not exists role text not null default '',
  add column if not exists email text not null default '',
  add column if not exists linkedin_url text,
  add column if not exists bio_en text,
  add column if not exists bio_id text,
  add column if not exists profile_photo_url text,
  add column if not exists cv_url text,
  add column if not exists updated_at timestamptz default now();

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null
);

alter table public.projects
  add column if not exists title_en text not null default '',
  add column if not exists title_id text,
  add column if not exists type text,
  add column if not exists body_en text,
  add column if not exists body_id text,
  add column if not exists impact_value text,
  add column if not exists impact_label_en text,
  add column if not exists impact_label_id text,
  add column if not exists tags text[] default '{}',
  add column if not exists cover_url text,
  add column if not exists sort_order integer default 0,
  add column if not exists published boolean default false,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid()
);

alter table public.certifications
  add column if not exists name_en text not null default '',
  add column if not exists name_id text,
  add column if not exists issuer text,
  add column if not exists year text,
  add column if not exists file_url text,
  add column if not exists sort_order integer default 0,
  add column if not exists published boolean default true;

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid()
);

alter table public.testimonials
  add column if not exists quote_en text not null default '',
  add column if not exists quote_id text,
  add column if not exists author_name text,
  add column if not exists author_role text,
  add column if not exists avatar_url text,
  add column if not exists sort_order integer default 0,
  add column if not exists published boolean default true;

create table if not exists public.site_copy (
  copy_key text primary key
);

alter table public.site_copy
  add column if not exists value_en text,
  add column if not exists value_id text,
  add column if not exists updated_at timestamptz default now();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profile enable row level security;
alter table public.projects enable row level security;
alter table public.certifications enable row level security;
alter table public.testimonials enable row level security;
alter table public.site_copy enable row level security;

drop policy if exists "Public can read profile" on public.profile;
create policy "Public can read profile" on public.profile for select using (true);

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects" on public.projects for select using (published = true or auth.role() = 'authenticated');

drop policy if exists "Public can read published certifications" on public.certifications;
create policy "Public can read published certifications" on public.certifications for select using (published = true or auth.role() = 'authenticated');

drop policy if exists "Public can read published testimonials" on public.testimonials;
create policy "Public can read published testimonials" on public.testimonials for select using (published = true or auth.role() = 'authenticated');

drop policy if exists "Public can read site copy" on public.site_copy;
create policy "Public can read site copy" on public.site_copy for select using (true);

drop policy if exists "Authenticated users manage profile" on public.profile;
create policy "Authenticated users manage profile" on public.profile for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users manage projects" on public.projects;
create policy "Authenticated users manage projects" on public.projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users manage certifications" on public.certifications;
create policy "Authenticated users manage certifications" on public.certifications for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users manage testimonials" on public.testimonials;
create policy "Authenticated users manage testimonials" on public.testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users manage site copy" on public.site_copy;
create policy "Authenticated users manage site copy" on public.site_copy for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Storage
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public) values ('portfolio-files', 'portfolio-files', true) on conflict (id) do nothing;

drop policy if exists "Public can view portfolio files" on storage.objects;
create policy "Public can view portfolio files" on storage.objects for select using (bucket_id = 'portfolio-files');

drop policy if exists "Authenticated users upload portfolio files" on storage.objects;
create policy "Authenticated users upload portfolio files" on storage.objects for insert with check (bucket_id = 'portfolio-files' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users update portfolio files" on storage.objects;
create policy "Authenticated users update portfolio files" on storage.objects for update using (bucket_id = 'portfolio-files' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users delete portfolio files" on storage.objects;
create policy "Authenticated users delete portfolio files" on storage.objects for delete using (bucket_id = 'portfolio-files' and auth.role() = 'authenticated');

-- Reload the PostgREST schema cache so new columns are visible immediately.
notify pgrst, 'reload schema';
