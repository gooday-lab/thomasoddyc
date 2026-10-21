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
    "Most of my work starts the same way: a report that eats hours every week. I turn it into something that runs itself.",
  bio_id:
    "Sebagian besar pekerjaan saya selalu mulai dari hal yang sama: laporan yang memakan waktu berjam-jam setiap minggu. Saya ubah menjadi sistem yang bisa berjalan sendiri.",
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
      "Portfolio project. All data is fictional and simulated.\n\nThe problem always has the same shape: a batch of transaction data arrives, and a regulation decides which fields are mandatory, which are optional, and what valid means for each one. Five thousand records. Manual checking does not scale, and it never leaves a trail.\n\nSo I made the regulation executable.\n\nTHE RULE SHEET\n18 rules over 14 fields: patterns, lengths, reference lookups, a product-to-category map, numeric ranges, date windows and duplicate detection. Every field is flagged mandatory or optional. Every rule carries a severity (blocking or warning) and an auto-fix switch. Changing the regulation is a one-row edit in Excel, not a code change.\n\nTHE ENGINE\nOne button runs the batch in seconds. It cleans first and judges second: name casing, stray spaces, phone separators, canonical reference values, category rebuilt from the product map, dates normalised, with every change written to a fix audit column. Then the rules run, every rejected cell is marked, and each row gets a verdict: valid, warning, or invalid.\n\nWHAT CAME OUT\n5,000 records in, 3,851 accepted, 413 accepted with warnings, 736 rejected with a precise reason. 1,263 violations caught before they reached reporting. 5,256 cells repaired automatically. First-pass compliance: 77.02%.\n\nTHE DELIVERABLES\nAn error report with one row per violation. Valid and invalid CSV splits for downstream systems. An append-only audit log with run id, user, counts and duration. And a separate dashboard workbook (7 KPI cards, 6 native Excel charts) that rebuilds from the engine's statistics export with one click.\n\nPure Excel VBA. No add-ins. Fully reproducible.",
    body_id:
      "Proyek portofolio. Seluruh data bersifat fiktif dan simulasi.\n\nMasalahnya selalu berbentuk sama: satu batch data transaksi datang, dan sebuah regulasi menentukan kolom mana yang wajib, mana yang opsional, serta apa arti valid untuk masing-masing. Lima ribu catatan. Pemeriksaan manual tidak dapat diskalakan, dan tidak pernah meninggalkan jejak.\n\nMaka saya membuat regulasi itu bisa dieksekusi.\n\nSHEET RULES\n18 aturan untuk 14 kolom: pola format, panjang teks, daftar referensi, peta produk ke kategori, rentang angka, rentang tanggal, dan deteksi duplikat. Setiap kolom ditandai wajib atau opsional. Setiap aturan memiliki tingkat keparahan (blocking atau warning) beserta sakelar perbaikan otomatis. Mengubah regulasi cukup satu baris di Excel, bukan mengubah kode.\n\nMESIN\nSatu tombol menyelesaikan satu batch dalam hitungan detik. Mesin membersihkan dulu, menilai kemudian: huruf besar-kecil nama, spasi berlebih, pemisah telepon, nilai referensi kanonik, kategori dibangun ulang dari peta produk, tanggal dinormalkan, dengan setiap perubahan tercatat di kolom audit. Lalu aturan dijalankan, setiap sel yang ditolak ditandai, dan setiap baris menerima vonis: valid, peringatan, atau tidak valid.\n\nHASILNYA\n5.000 catatan masuk, 3.851 diterima, 413 diterima dengan peringatan, 736 ditolak dengan alasan yang tepat. 1.263 pelanggaran tertangkap sebelum masuk laporan. 5.256 sel diperbaiki otomatis. Kepatuhan pada percobaan pertama: 77,02%.\n\nHASIL KERJA\nLaporan kesalahan dengan satu baris per pelanggaran. Pembagian CSV valid dan tidak valid untuk sistem lain. Log audit yang hanya bertambah, berisi id proses, pengguna, jumlah catatan, dan durasi. Serta workbook dashboard terpisah (7 kartu KPI, 6 chart Excel asli) yang membangun ulang diri dari ekspor statistik mesin dengan satu klik.\n\nExcel VBA murni. Tanpa add-in. Sepenuhnya dapat direproduksi.",
    impact_value: "77.02%",
    impact_label_en: "first-pass compliance",
    impact_label_id: "kepatuhan pada pengiriman pertama",
    tags: ["Excel VBA", "Data Validation", "Rule Engine", "Data Quality", "Automation", "Dashboard", "Audit Trail"],
    cover_url: "https://uskayjjqbsntfitrwahj.supabase.co/storage/v1/object/public/portfolio-files/cover_project_v2.png",
    file_url: "https://uskayjjqbsntfitrwahj.supabase.co/storage/v1/object/public/portfolio-files/data-validation-package.zip",
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
      "Portfolio case study. All data is fictional and simulated.\n\nPROBLEM\nA data-governance regulation classifies every transaction field as mandatory or optional and defines what valid means for each one. The batch is 5,000 records. Manual review is slow, two people reach two different answers, and nothing is auditable.\n\nAPPROACH\nI treated the regulation as configuration, not code. A Rules sheet holds 18 rules: patterns, lengths, reference lookups, a cross-field product/category map, numeric ranges, date windows and composite duplicate detection. Each rule has a severity and an auto-fix switch.\n\nThe VBA engine cleans first and judges second. Deterministic fixes (casing, spaces, phone formats, canonical reference values, dates) are applied and logged cell by cell. Then the rules run, every rejected cell is coloured, and each row is stamped: valid, warning, or invalid.\n\nRESULT\n3,851 records accepted. 413 accepted with warnings. 736 rejected with a documented reason. 1,263 violations caught before reporting. The biggest sources: a high-value approval threshold, invalid e-mail and phone formats, and cities outside the registered service area. 5,256 cells repaired automatically.\n\nCompliance stopped being an opinion. It became a 77.02% figure with an error report, split exports and an audit log behind it, plus a dashboard the management team can read in ten seconds.",
    body_id:
      "Studi kasus portofolio. Seluruh data bersifat fiktif dan simulasi.\n\nMASALAH\nSebuah regulasi tata kelola data mengklasifikasikan setiap kolom transaksi sebagai wajib atau opsional, dan menentukan arti valid untuk masing-masing. Batch berisi 5.000 catatan. Tinjauan manual lambat, dua orang menghasilkan dua jawaban berbeda, dan tidak ada yang dapat diaudit.\n\nPENDEKATAN\nSaya memperlakukan regulasi sebagai konfigurasi, bukan kode. Sheet Rules berisi 18 aturan: pola format, panjang teks, daftar referensi, peta produk dan kategori lintas kolom, rentang angka, rentang tanggal, serta deteksi duplikat gabungan. Masing-masing punya tingkat keparahan dan sakelar perbaikan otomatis.\n\nMesin VBA membersihkan dulu dan menilai kemudian. Perbaikan deterministik (huruf besar-kecil, spasi, format telepon, nilai referensi kanonik, tanggal) diterapkan dan dicatat sel per sel. Lalu aturan dijalankan, setiap sel yang ditolak diwarnai, dan setiap baris diberi cap: valid, peringatan, atau tidak valid.\n\nHASIL\n3.851 catatan diterima. 413 diterima dengan peringatan. 736 ditolak dengan alasan terdokumentasi. 1.263 pelanggaran tertangkap sebelum pelaporan. Sumber terbesarnya: ambang persetujuan nilai tinggi, format email dan telepon yang salah, serta kota di luar area layanan terdaftar. 5.256 sel diperbaiki otomatis.\n\nKepatuhan bukan lagi sekadar pendapat. Menjadi angka 77,02 persen yang didukung laporan kesalahan, ekspor terbagi, log audit, serta dashboard yang bisa dibaca tim manajemen dalam sepuluh detik.",
    impact_value: "1,263",
    impact_label_en: "violations caught before reporting",
    impact_label_id: "pelanggaran tertangkap sebelum pelaporan",
    tags: ["Excel VBA", "Data Validation", "Rule Engine", "Audit Trail"],
    cover_url: "https://uskayjjqbsntfitrwahj.supabase.co/storage/v1/object/public/portfolio-files/cover_case_v2.png",
    file_url: "https://uskayjjqbsntfitrwahj.supabase.co/storage/v1/object/public/portfolio-files/DataValidation_Project.xlsm",
    sort_order: 4,
    published: true,
  },
  {
    id: "default-project-5",
    slug: "powerbi-sales-dashboard",
    title_en: "Sales performance dashboard in Power BI.",
    title_id: "Dashboard kinerja penjualan di Power BI.",
    type: "Portfolio Project",
    body_en:
      "Portfolio project. All data is fictional and simulated.\n\nA sales performance dashboard built in Power BI: one semantic model, nine DAX measures and a single-page report covering sales, profit, margin and the monthly trend, with region and category breakdowns.\n\nIt is saved as a PBIP (Power BI Project), so the model and the report are plain text and can live in Git. Download the project files and open SalesDashboard.pbip in Power BI Desktop.",
    body_id:
      "Proyek portofolio. Seluruh data bersifat fiktif dan simulasi.\n\nDashboard kinerja penjualan yang dibangun di Power BI: satu semantic model, sembilan measure DAX, dan satu halaman laporan yang mencakup penjualan, profit, margin, serta tren bulanan, lengkap dengan rincian per region dan kategori.\n\nProject disimpan sebagai PBIP (Power BI Project), sehingga model dan laporannya berupa teks biasa dan bisa disimpan di Git. Unduh file project lalu buka SalesDashboard.pbip di Power BI Desktop.",
    impact_value: "9",
    impact_label_en: "DAX measures in one shared model",
    impact_label_id: "measure DAX dalam satu model bersama",
    tags: ["Power BI", "DAX", "Data Modelling", "Power Query", "Dashboard"],
    cover_url: "/portfolio/powerbi-sales-cover.svg",
    file_url: "/downloads/powerbi-sales-dashboard.zip",
    sort_order: 5,
    published: true,
  },
  {
    id: "default-project-6",
    slug: "sales-performance-power-bi-case-study",
    title_en: "One sales model, nine measures, one source of truth.",
    title_id: "Satu model penjualan, sembilan measure, satu sumber kebenaran.",
    type: "Case study",
    body_en:
      "Portfolio case study. All data is fictional and simulated.\n\nPROBLEM\nSales reporting usually lives in scattered spreadsheets. Each region sends its own file, totals are rebuilt by hand, and management asks the same questions every month: how are we doing, which region is slipping, and which product line makes the margin.\n\nAPPROACH\nI modelled the data as a proper semantic model in Power BI instead of one large sheet. A Sales fact table (5,000 transactions, January 2023 to December 2024) is linked to a generated Calendar table, so every time-based question uses the same date logic. Business definitions live in nine DAX measures: sales, cost of goods, profit, margin, transaction count, average per transaction, same period last year, and year-over-year growth. The visuals do not recalculate anything themselves.\n\nTHE DASHBOARD\nOne page, readable in ten seconds: four KPI cards (sales, profit, margin, transactions), a year slicer, a monthly sales trend, and two column charts: sales by region and profit by product category.\n\nTHE PROJECT FILES\nThe data source path is set once in a parameter, so the same model can point at a real export. The project is saved as PBIP, a text-based format that works with Git, and includes a Node script that regenerates the sample data.\n\nWHAT IT SHOWS\nThe point is not the charts. Every number on the page comes from one definition, and changing a definition means changing one measure.",
    body_id:
      "Studi kasus portofolio. Seluruh data bersifat fiktif dan simulasi.\n\nMASALAH\nLaporan penjualan biasanya tersebar di banyak spreadsheet. Setiap region mengirim file sendiri, total dihitung ulang secara manual, dan manajemen menanyakan pertanyaan yang sama setiap bulan: bagaimana kinerjanya, region mana yang turun, dan lini produk mana yang menghasilkan margin.\n\nPENDEKATAN\nSaya memodelkan data sebagai semantic model yang layak di Power BI, bukan satu sheet besar. Tabel fakta Sales (5.000 transaksi, Januari 2023 sampai Desember 2024) terhubung ke tabel Calendar yang dibuat otomatis, sehingga setiap pertanyaan berbasis waktu memakai logika tanggal yang sama. Definisi bisnis disimpan dalam sembilan measure DAX: penjualan, HPP, profit, margin, jumlah transaksi, rata-rata per transaksi, pembanding periode tahun lalu, dan pertumbuhan year-over-year. Visual tidak menghitung ulang apa pun sendiri.\n\nDASHBOARD\nSatu halaman yang bisa dibaca dalam sepuluh detik: empat kartu KPI (penjualan, profit, margin, transaksi), slicer tahun, tren penjualan bulanan, dan dua grafik kolom: penjualan per region dan profit per kategori produk.\n\nFILE PROJECT\nLokasi sumber data diatur sekali lewat parameter, sehingga model yang sama dapat diarahkan ke ekspor data asli. Project disimpan sebagai PBIP, format teks yang kompatibel dengan Git, dan disertai script Node yang membuat ulang data contoh.\n\nYANG DITUNJUKKAN\nPoinnya bukan grafiknya. Setiap angka di halaman berasal dari satu definisi, dan mengubah definisi cukup dengan mengubah satu measure.",
    impact_value: "5,000",
    impact_label_en: "transactions modelled from one fact table",
    impact_label_id: "transaksi dimodelkan dari satu tabel fakta",
    tags: ["Power BI", "DAX", "Star Schema", "Data Modelling", "Dashboard Design"],
    cover_url: "/portfolio/powerbi-sales-cover.svg",
    file_url: "/downloads/powerbi-sales-dashboard.zip",
    sort_order: 6,
    published: true,
  },
  {
    id: "default-project-7",
    slug: "goodays-curated-product-picks",
    title_en: "GoOdays: curated product picks with honest reviews.",
    title_id: "GoOdays: rekomendasi produk terkurasi dengan review jujur.",
    type: "Live Project",
    body_en:
      "Live project: a real site with real products.\n\nGoOdays is an Indonesian product curation site: top picks, reviews with pros and cons, weekly deals and buying guides. Every buy button is a Shopee Affiliate link tagged with its own SubID per placement, so the affiliate report shows which button actually works.\n\nPrices and ratings are only shown when they can be verified. No invented numbers.\n\nVisit: https://goodays.pages.dev",
    body_id:
      "Proyek live: situs sungguhan dengan produk sungguhan.\n\nGoOdays adalah situs kurasi produk berbahasa Indonesia: top picks, review dengan kelebihan dan kekurangan, deals mingguan, dan panduan belanja. Setiap tombol beli memakai link Shopee Affiliate dengan SubID sendiri per penempatan, sehingga laporan afiliasi menunjukkan tombol mana yang benar-benar bekerja.\n\nHarga dan rating hanya ditampilkan jika bisa diverifikasi. Tanpa angka yang dikarang.\n\nKunjungi: https://goodays.pages.dev",
    impact_value: "10",
    impact_label_en: "pages in the sitemap, no build step",
    impact_label_id: "halaman di sitemap, tanpa build step",
    tags: ["Affiliate Marketing", "Shopee Affiliate", "Vanilla JS", "Supabase", "SEO", "Bilingual ID/EN"],
    cover_url: "/portfolio/goodays-cover.svg",
    file_url: null,
    sort_order: 7,
    published: true,
  },
  {
    id: "default-project-8",
    slug: "goodays-affiliate-curation-case-study",
    title_en: "Affiliate picks people can trust: the GoOdays case study.",
    title_id: "Rekomendasi affiliate yang bisa dipercaya: studi kasus GoOdays.",
    type: "Case study",
    body_en:
      "Live case study: a real site with real products.\n\nPROBLEM\nIndonesian shoppers are flooded with best-product lists that are sponsored in disguise. Affiliate sites that show fake ratings and fake discounts lose trust, and trust is what makes a click turn into a purchase.\n\nAPPROACH\nI built GoOdays around one rule: say less, but only what can be verified. A top pick carries a rating only when it comes from real research. A deal card shows a price only after someone has checked it on Shopee, and it disappears on its own after its valid-until date. Every buy button is a Shopee Affiliate link with a SubID per placement, so the report shows where the clicks come from, not just how many there are.\n\nTHE BUILD\nVanilla HTML, CSS and JavaScript, with Supabase for editable content and an admin panel, deployed on Cloudflare Pages with no build step. Full Indonesian and English copy, a 10-point buy-wisely checklist as the newsletter lead magnet, SEO buying-guide articles, and an internal link builder that adds the SubID to any Shopee link.\n\nWHAT IT SHOWS\nMost affiliate sites compete on hype. GoOdays competes on being checkable: zero invented ratings or prices, and a tracking setup that tells you which placement earns.",
    body_id:
      "Studi kasus live: situs sungguhan dengan produk sungguhan.\n\nMASALAH\nPembeli Indonesia dibanjiri daftar produk terbaik yang sebenarnya berbayar terselubung. Situs affiliate yang menampilkan rating dan diskon palsu kehilangan kepercayaan, dan kepercayaanlah yang membuat klik berubah menjadi pembelian.\n\nPENDEKATAN\nSaya membangun GoOdays dengan satu aturan: tulis lebih sedikit, tetapi hanya yang bisa diverifikasi. Sebuah top pick hanya memuat rating jika berasal dari riset nyata. Kartu deal hanya menampilkan harga setelah seseorang mengeceknya di Shopee, dan kartu itu hilang otomatis setelah tanggal berlakunya habis. Setiap tombol beli memakai link Shopee Affiliate dengan SubID per penempatan, sehingga laporan menunjukkan dari mana klik berasal, bukan sekadar berapa jumlahnya.\n\nPEMBANGUNAN\nHTML, CSS, dan JavaScript murni, dengan Supabase untuk konten yang bisa diedit dan panel admin, di-deploy ke Cloudflare Pages tanpa build step. Copy lengkap dalam Bahasa Indonesia dan Inggris, checklist 10 poin \"beli dengan bijak\" sebagai lead magnet newsletter, artikel panduan belanja SEO, dan link builder internal yang menambahkan SubID ke link Shopee mana pun.\n\nYANG DITUNJUKKAN\nKebanyakan situs affiliate bersaing lewat hype. GoOdays bersaing lewat bisa dicek: nol rating atau harga yang dikarang, dan setup tracking yang memberi tahu penempatan mana yang menghasilkan.",
    impact_value: "0",
    impact_label_en: "invented ratings or prices, shown only when verified",
    impact_label_id: "rating atau harga yang dikarang, hanya tampil jika terverifikasi",
    tags: ["Affiliate Marketing", "Shopee Affiliate", "Conversion Design", "SEO Content", "Lead Magnet", "Click Tracking"],
    cover_url: "/portfolio/goodays-case-cover.svg",
    file_url: null,
    sort_order: 8,
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
      "Thomas is patient and careful with details. He turned reporting processes we used to dread into something routine.",
    quote_id:
      "Thomas sabar dan teliti dengan detail. Ia mengubah proses reporting yang dulu kita takuti menjadi hal yang rutin.",
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
