import { supabase } from "./supabase";
import { experience as cvExperience } from "./cv";

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
  file_url: string | null;
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

export type ExperienceRecord = {
  id: string;
  years: string;
  company: string;
  role: string;
  body_en: string | null;
  body_id: string | null;
  result_en: string | null;
  result_id: string | null;
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string | null;
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
    file_url: null,
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
    file_url: null,
    sort_order: 2,
    published: true,
  },
  {
    id: "default-project-3",
    slug: "data-validation-rule-engine-excel-vba",
    title_en: "Data Validation Rule Engine (Excel VBA)",
    title_id: "Mesin Validasi Data Berbasis Aturan (Excel VBA)",
    type: "Portfolio Project",
    body_en:
      "Portfolio project - all data is fictional and simulated.\n\nI built a regulation-driven data validation system in Microsoft Excel VBA: 18 configurable rules over 14 fields, deterministic auto-fix, per-violation reporting, split exports, a full audit trail, and a separate refreshable dashboard workbook.\n\n1. The regulation is configuration, not code. One Rules sheet defines each field as mandatory or optional, with patterns, numeric bounds, reference lists, cross-field maps, severity and an auto-fix switch. A rule change is a one-row edit.\n\n2. The engine checks 5,000 transaction records against the full rule set in seconds: 3,851 accepted, 413 accepted with warnings, and 736 rejected with a documented reason.\n\n3. It caught 1,263 rule violations before reporting and repaired 5,256 cells automatically: name casing, stray spaces, phone separators, canonical reference values, category rebuilt from the product map, dates normalised. Every change is written to a fix audit column.\n\n4. Each run delivers an error report with one row per violation, valid and invalid CSV splits for downstream systems, and an append-only audit log with run id, user, counts and duration.\n\n5. A separate dashboard workbook rebuilds 7 KPI cards and 6 native Excel charts from the engine's statistics export with one click.\n\nEvery number above is recalculated live inside the workbook.",
    body_id:
      "Proyek portofolio - seluruh data bersifat fiktif dan simulasi.\n\nSaya membangun sistem validasi data berbasis regulasi menggunakan Microsoft Excel VBA: 18 aturan yang dapat dikonfigurasi untuk 14 kolom, perbaikan otomatis yang deterministik, laporan per pelanggaran, ekspor data valid/tidak valid, jejak audit lengkap, serta workbook dashboard terpisah yang dapat disegarkan.\n\n1. Regulasi menjadi konfigurasi, bukan kode. Satu sheet Rules menentukan setiap kolom wajib atau opsional, beserta pola format, batas angka, daftar referensi, peta lintas kolom, tingkat keparahan, dan sakelar perbaikan otomatis. Perubahan aturan cukup dilakukan dengan mengedit satu baris.\n\n2. Mesin memeriksa 5.000 catatan transaksi terhadap seluruh aturan dalam hitungan detik: 3.851 diterima, 413 diterima dengan peringatan, dan 736 ditolak dengan alasan yang terdokumentasi.\n\n3. Sebanyak 1.263 pelanggaran aturan tertangkap sebelum masuk laporan, dan 5.256 sel diperbaiki otomatis: huruf besar-kecil nama, spasi berlebih, pemisah nomor telepon, nilai referensi kanonik, kategori dibangun ulang dari peta produk, serta normalisasi tanggal. Setiap perubahan dicatat pada kolom audit perbaikan.\n\n4. Setiap proses menghasilkan laporan kesalahan dengan satu baris per pelanggaran, pembagian CSV valid dan tidak valid untuk sistem lain, serta log audit yang hanya bertambah, berisi id proses, pengguna, jumlah catatan, dan durasi.\n\n5. Workbook dashboard terpisah membangun ulang 7 kartu KPI dan 6 chart Excel dari ekspor statistik mesin hanya dengan satu klik.\n\nSetiap angka di atas dihitung ulang secara langsung di dalam workbook.",
    impact_value: "77.02%",
    impact_label_en: "first-pass compliance",
    impact_label_id: "kepatuhan pada pengiriman pertama",
    tags: ["Excel VBA", "Data Validation", "Rule Engine", "Data Quality", "Automation", "Dashboard", "Audit Trail"],
    cover_url: null,
    file_url: null,
    sort_order: 3,
    published: true,
  },
  {
    id: "default-project-4",
    slug: "enforcing-a-data-regulation-with-18-rules",
    title_en: "Enforcing a data regulation with 18 rules in Excel.",
    title_id: "Menerapkan regulasi data dengan 18 aturan di Excel.",
    type: "Case study",
    body_en:
      "Portfolio case study - all data is fictional and simulated.\n\nProblem. A data-governance regulation classifies every transaction field as mandatory or optional and defines what valid means for each one. With 5,000 records per batch, manual checking is slow, inconsistent and impossible to audit.\n\nApproach. I treated the regulation as configuration. A Rules sheet holds 18 rules - patterns, lengths, reference lookups, a cross-field product and category map, numeric ranges, date windows and composite duplicate detection - each with a severity and an auto-fix switch. A VBA engine runs deterministic clean-up first (casing, spaces, phone formats, canonical reference values, dates), then marks every cell it rejects and gives each row a verdict: valid, warning or invalid.\n\nResult. Of 5,000 records, 3,851 were accepted and 413 accepted with warnings; 736 were rejected with a precise reason. The engine caught 1,263 violations before they reached reporting and repaired 5,256 cells automatically. Compliance stopped being an opinion: it became a 77.02 percent figure with an error report, split exports and an audit log behind it.",
    body_id:
      "Studi kasus portofolio - seluruh data bersifat fiktif dan simulasi.\n\nMasalah. Sebuah regulasi tata kelola data mengklasifikasikan setiap kolom transaksi sebagai wajib atau opsional, dan menentukan arti valid untuk masing-masing kolom. Dengan 5.000 catatan per batch, pemeriksaan manual menjadi lambat, tidak konsisten, dan tidak dapat diaudit.\n\nPendekatan. Saya memperlakukan regulasi sebagai konfigurasi. Sheet Rules berisi 18 aturan - pola format, panjang teks, daftar referensi, peta produk dan kategori lintas kolom, rentang angka, rentang tanggal, serta deteksi duplikat gabungan - masing-masing dengan tingkat keparahan dan sakelar perbaikan otomatis. Mesin VBA menjalankan pembersihan deterministik terlebih dahulu (huruf besar-kecil, spasi, format telepon, nilai referensi kanonik, tanggal), lalu menandai setiap sel yang ditolak dan memberikan vonis untuk setiap baris: valid, peringatan, atau tidak valid.\n\nHasil. Dari 5.000 catatan, 3.851 diterima dan 413 diterima dengan peringatan; 736 ditolak dengan alasan yang tepat. Mesin menangkap 1.263 pelanggaran sebelum masuk laporan dan memperbaiki 5.256 sel secara otomatis. Kepatuhan bukan lagi sekadar pendapat: menjadi angka 77,02 persen yang didukung laporan kesalahan, ekspor terbagi, dan log audit.",
    impact_value: "1,263",
    impact_label_en: "violations caught before reporting",
    impact_label_id: "pelanggaran tertangkap sebelum pelaporan",
    tags: ["Excel VBA", "Data Validation", "Rule Engine", "Audit Trail"],
    cover_url: null,
    file_url: null,
    sort_order: 4,
    published: true,
  },
];

/**
 * Merge Supabase rows over the built-in defaults (matched by slug).
 * CMS content wins for the same slug; code-only entries always stay visible.
 */
export function mergeProjects(
  defaults: ProjectRecord[],
  rows: ProjectRecord[],
): ProjectRecord[] {
  if (!rows.length) return defaults;
  const bySlug = new Map<string, ProjectRecord>();
  for (const item of defaults) bySlug.set(item.slug, item);
  for (const row of rows) bySlug.set(row.slug, row);
  return [...bySlug.values()].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );
}

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

/** Built-in work history, seeded from the CV facts in `cv.ts`. */
export const defaultExperience: ExperienceRecord[] = cvExperience.map((item, index) => ({
  id: `default-experience-${index + 1}`,
  years: item.years,
  company: item.company,
  role: item.role,
  body_en: item.body,
  body_id: null,
  result_en: item.result,
  result_id: null,
  sort_order: index + 1,
  published: true,
}));

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

export async function fetchExperience(options?: { publishedOnly?: boolean }): Promise<ExperienceRecord[]> {
  const publishedOnly = options?.publishedOnly ?? true;
  if (!supabase) return [];
  let query = supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true });
  if (publishedOnly) query = query.eq("published", true);
  const { data, error } = await query;
  if (error || !data) return [];
  return data as ExperienceRecord[];
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
