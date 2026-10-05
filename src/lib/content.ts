import { supabase } from "./supabase";

/**
 * Shared content layer for the public portfolio and the admin workspace.
 *
 * Every fetch falls back to the built-in defaults, so the site always renders
 * a complete CV even before Supabase is connected (or if a query fails).
 */

export type ProjectRecord = {
  id: string;
  slug: string;
  title_en: string;
  title_id: string | null;
  type: string | null;
  body_en: string | null;
  body_id: string | null;
  impact_value: string | null;
  impact_label_en: string | null;
  impact_label_id: string | null;
  tags: string[];
  cover_url: string | null;
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string | null;
};

export type CertificationRecord = {
  id: string;
  name_en: string;
  name_id: string | null;
  issuer: string | null;
  year: string | null;
  file_url: string | null;
  sort_order: number;
  published: boolean;
};

export type TestimonialRecord = {
  id: string;
  quote_en: string;
  quote_id: string | null;
  author_name: string | null;
  author_role: string | null;
  avatar_url: string | null;
  sort_order: number;
  published: boolean;
};

export type ProfileRecord = {
  id: string;
  full_name: string;
  role: string;
  email: string;
  linkedin_url: string | null;
  bio_en: string | null;
  bio_id: string | null;
  profile_photo_url: string | null;
  cv_url: string | null;
  updated_at?: string | null;
};

export const defaultProfile: ProfileRecord = {
  id: "default-profile",
  full_name: "Thomas Oddy Chrisdwianto",
  role: "MIS Analyst · Data & Reporting Automation",
  email: "thomasoddyc@gmail.com",
  linkedin_url: "https://linkedin.com/in/thomasoddyc",
  bio_en:
    "I turn manual reporting workflows into reliable, efficient systems that help teams move with confidence.",
  bio_id:
    "Saya mengubah alur kerja reporting yang manual menjadi sistem yang andal dan efisien agar tim dapat bergerak dengan percaya diri.",
  profile_photo_url: null,
  cv_url: "/Thomas_Oddy_ATS_CV.docx",
};

export const defaultProjects: ProjectRecord[] = [
  {
    id: "default-project-1",
    slug: "regulatory-reporting-automation",
    title_en: "Regulatory reporting, without the repetitive work.",
    title_id: "Regulatory reporting, tanpa pekerjaan berulang.",
    type: "Automation case study",
    body_en:
      "A VBA-powered workflow that reconciles records, validates inputs, and prepares reporting files with less manual intervention.",
    body_id:
      "Workflow berbasis VBA yang merekonsiliasi data, memvalidasi input, dan menyiapkan file laporan dengan lebih sedikit pekerjaan manual.",
    impact_value: "75%",
    impact_label_en: "less processing time",
    impact_label_id: "waktu proses lebih singkat",
    tags: ["Excel VBA", "Reconciliation", "Data validation"],
    cover_url: null,
    sort_order: 1,
    published: true,
  },
  {
    id: "default-project-2",
    slug: "branch-performance-reporting",
    title_en: "From four days of reporting to one.",
    title_id: "Dari empat hari reporting menjadi satu hari.",
    type: "Performance reporting",
    body_en:
      "A more structured weekly workflow for disbursement and loan settlement reporting, built to support faster branch decisions.",
    body_id:
      "Alur kerja mingguan yang lebih terstruktur untuk reporting pencairan dan pelunasan kredit, dirancang untuk mendukung keputusan cabang yang lebih cepat.",
    impact_value: "4 → 1",
    impact_label_en: "days per report",
    impact_label_id: "hari per laporan",
    tags: ["Advanced Excel", "Forecasting", "Management reporting"],
    cover_url: null,
    sort_order: 2,
    published: true,
  },
];

export const defaultCertifications: CertificationRecord[] = [
  {
    id: "default-cert-1",
    name_en: "Data & Reporting Practice",
    name_id: "Praktik Data & Reporting",
    issuer: "Professional development",
    year: "Ongoing",
    file_url: null,
    sort_order: 1,
    published: true,
  },
  {
    id: "default-cert-2",
    name_en: "Excel Automation & VBA",
    name_id: "Otomasi Excel & VBA",
    issuer: "Applied workflow development",
    year: "Core skill",
    file_url: null,
    sort_order: 2,
    published: true,
  },
];

export const defaultTestimonials: TestimonialRecord[] = [
  {
    id: "default-testimonial-1",
    quote_en:
      "Thomas brings a rare combination of patience, precision, and practical thinking. He makes difficult reporting processes feel manageable.",
    quote_id:
      "Thomas memiliki kombinasi langka antara kesabaran, ketelitian, dan cara berpikir praktis. Ia membuat proses reporting yang sulit terasa mudah dikelola.",
    author_name: "Associate colleague",
    author_role: "Banking operations",
    avatar_url: null,
    sort_order: 1,
    published: true,
  },
];

/** A UI copy override stored in the `site_copy` table (admin → Site copy). */
export type SiteCopyRecord = {
  copy_key: string;
  value_en: string | null;
  value_id: string | null;
};

export async function fetchSiteCopy(): Promise<SiteCopyRecord[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("site_copy").select("*");
  if (error || !data) return [];
  return data as SiteCopyRecord[];
}

export async function fetchProfile(): Promise<ProfileRecord | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("profile").select("*").limit(1).maybeSingle();
  if (error || !data) return null;
  return data as ProfileRecord;
}

export async function fetchProjects(options?: { publishedOnly?: boolean }): Promise<ProjectRecord[]> {
  const publishedOnly = options?.publishedOnly ?? true;
  if (!supabase) return [];
  let query = supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (publishedOnly) query = query.eq("published", true);
  const { data, error } = await query;
  if (error || !data) return [];
  return data as ProjectRecord[];
}

export async function fetchCertifications(options?: { publishedOnly?: boolean }): Promise<CertificationRecord[]> {
  const publishedOnly = options?.publishedOnly ?? true;
  if (!supabase) return [];
  let query = supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });
  if (publishedOnly) query = query.eq("published", true);
  const { data, error } = await query;
  if (error || !data) return [];
  return data as CertificationRecord[];
}

export async function fetchTestimonials(options?: { publishedOnly?: boolean }): Promise<TestimonialRecord[]> {
  const publishedOnly = options?.publishedOnly ?? true;
  if (!supabase) return [];
  let query = supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  if (publishedOnly) query = query.eq("published", true);
  const { data, error } = await query;
  if (error || !data) return [];
  return data as TestimonialRecord[];
}

/** Display label for an item's last update, used in the admin lists. */
export function formatUpdated(iso: string | null | undefined): string {
  if (!iso) return "Just now";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "Just now";
  const diffMs = Date.now() - then;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(then).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
