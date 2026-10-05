-- Run this in Supabase SQL Editor after creating your project.
-- The first user is created from Authentication > Users.

create extension if not exists "pgcrypto";

create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role text not null,
  email text not null,
  linkedin_url text,
  bio_en text,
  bio_id text,
  profile_photo_url text,
  cv_url text,
  updated_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_en text not null,
  title_id text,
  type text,
  body_en text,
  body_id text,
  impact_value text,
  impact_label_en text,
  impact_label_id text,
  tags text[] default '{}',
  cover_url text,
  sort_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_id text,
  issuer text,
  year text,
  file_url text,
  sort_order integer default 0,
  published boolean default true
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote_en text not null,
  quote_id text,
  author_name text,
  author_role text,
  avatar_url text,
  sort_order integer default 0,
  published boolean default true
);

alter table public.profile enable row level security;
alter table public.projects enable row level security;
alter table public.certifications enable row level security;
alter table public.testimonials enable row level security;

create policy "Public can read profile" on public.profile for select using (true);
create policy "Public can read published projects" on public.projects for select using (published = true or auth.role() = 'authenticated');
create policy "Public can read published certifications" on public.certifications for select using (published = true or auth.role() = 'authenticated');
create policy "Public can read published testimonials" on public.testimonials for select using (published = true or auth.role() = 'authenticated');
create policy "Authenticated users manage profile" on public.profile for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users manage projects" on public.projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users manage certifications" on public.certifications for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users manage testimonials" on public.testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public) values ('portfolio-files', 'portfolio-files', true) on conflict (id) do nothing;
create policy "Public can view portfolio files" on storage.objects for select using (bucket_id = 'portfolio-files');
create policy "Authenticated users upload portfolio files" on storage.objects for insert with check (bucket_id = 'portfolio-files' and auth.role() = 'authenticated');
create policy "Authenticated users update portfolio files" on storage.objects for update using (bucket_id = 'portfolio-files' and auth.role() = 'authenticated');
create policy "Authenticated users delete portfolio files" on storage.objects for delete using (bucket_id = 'portfolio-files' and auth.role() = 'authenticated');
