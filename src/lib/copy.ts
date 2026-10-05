/**
 * UI copy for the public site.
 *
 * Every string here can be overridden from the admin workspace
 * (Admin → Site copy) and is stored per language in the `site_copy` table.
 */

export type Language = "en" | "id";

export const copy = {
  en: {
    navAbout: "About",
    navExperience: "Experience",
    navCaseStudies: "Case studies",
    navProjects: "Projects",
    navContact: "Contact",
    eyebrow: "MIS ANALYST · DATA & REPORTING AUTOMATION",
    heroTitle: "I make complex data\nwork clearly.",
    heroBody:
      "I turn manual reporting workflows into reliable, efficient systems that help teams move with confidence.",
    explore: "Explore my work",
    cv: "Download CV",
    available: "Open to MIS & Data Analyst opportunities",
    scroll: "Scroll to explore",
    statementLabel: "01 / The perspective",
    statementTitle: "Clarity is a competitive advantage.",
    statementBody:
      "For over eight years in banking, I have worked where business operations meet data. My work is not only about producing a report—it is about building a dependable path from raw records to decisions.",
    impactLabel: "02 / Career impact",
    impactTitle: "Small improvements.\nMeasurable outcomes.",
    impactBody:
      "A closer look at the difference thoughtful automation can make to everyday operations.",
    experienceLabel: "03 / Experience",
    experienceTitle: "A career built around\nreliability.",
    experienceBody:
      "From branch performance to regulatory reporting, each role has strengthened my ability to connect detail with the bigger picture.",
    skillsLabel: "04 / Toolkit",
    skillsTitle: "The tools behind\nthe work.",
    workLabel: "05 / Selected work",
    workTitle: "Proof, not just\npossibility.",
    workBody:
      "A selection of projects and workflows where process, precision, and practical thinking came together.",
    aboutProject: "View case study",
    educationLabel: "06 / Foundation",
    educationTitle: "Grounded in systems.\nDriven by curiosity.",
    certLabel: "07 / Continuous learning",
    certTitle: "Always sharpening\nthe toolkit.",
    testimonialLabel: "08 / A good working relationship",
    contactLabel: "09 / Let’s connect",
    contactTitle: "Have a complex\nprocess in mind?",
    contactBody:
      "Whether you are looking for an MIS Analyst or want to make reporting work better, I would be glad to hear from you.",
    email: "Send an email",
    linkedin: "LinkedIn profile",
    admin: "Admin",
    viewAll: "View all projects",
    present: "Present",
  },
  id: {
    navAbout: "Tentang",
    navExperience: "Pengalaman",
    navCaseStudies: "Studi kasus",
    navProjects: "Proyek",
    navContact: "Kontak",
    eyebrow: "MIS ANALYST · OTOMASI DATA & REPORTING",
    heroTitle: "Saya membuat data\nyang kompleks menjadi jelas.",
    heroBody:
      "Saya mengubah alur kerja reporting yang manual menjadi sistem yang andal dan efisien agar tim dapat bergerak dengan percaya diri.",
    explore: "Lihat karya saya",
    cv: "Unduh CV",
    available: "Terbuka untuk kesempatan MIS & Data Analyst",
    scroll: "Gulir untuk menjelajah",
    statementLabel: "01 / Perspektif",
    statementTitle: "Kejelasan adalah keunggulan.",
    statementBody:
      "Selama lebih dari delapan tahun di dunia perbankan, saya bekerja di persimpangan antara operasional bisnis dan data. Bagi saya, pekerjaan bukan hanya menghasilkan laporan—tetapi membangun alur yang tepercaya dari data mentah hingga keputusan.",
    impactLabel: "02 / Dampak karier",
    impactTitle: "Perbaikan kecil.\nHasil yang terukur.",
    impactBody:
      "Melihat lebih dekat perbedaan yang dapat dibuat oleh otomasi yang dipikirkan dengan baik.",
    experienceLabel: "03 / Pengalaman",
    experienceTitle: "Karier yang dibangun\ndi atas keandalan.",
    experienceBody:
      "Dari performa cabang hingga regulatory reporting, setiap peran memperkuat kemampuan saya menghubungkan detail dengan gambaran besar.",
    skillsLabel: "04 / Toolkit",
    skillsTitle: "Tools di balik\npekerjaan saya.",
    workLabel: "05 / Karya pilihan",
    workTitle: "Bukti, bukan sekadar\nkemungkinan.",
    workBody:
      "Pilihan proyek dan workflow ketika proses, presisi, dan cara berpikir praktis bertemu.",
    aboutProject: "Lihat studi kasus",
    educationLabel: "06 / Fondasi",
    educationTitle: "Berpijak pada sistem.\nDidukung rasa ingin tahu.",
    certLabel: "07 / Pembelajaran",
    certTitle: "Selalu mempertajam\ntoolkit.",
    testimonialLabel: "08 / Kolaborasi yang baik",
    contactLabel: "09 / Mari terhubung",
    contactTitle: "Punya proses\nyang kompleks?",
    contactBody:
      "Baik Anda sedang mencari MIS Analyst maupun ingin membuat reporting lebih baik, saya akan senang mendengar dari Anda.",
    email: "Kirim email",
    linkedin: "Profil LinkedIn",
    admin: "Admin",
    viewAll: "Lihat semua proyek",
    present: "Sekarang",
  },
};

export type CopyKey = keyof (typeof copy)["en"];

export const copyKeys = Object.keys(copy.en) as CopyKey[];

/** Grouped metadata so the admin editor shows friendly, organised fields. */
export const copyGroups: { group: string; items: { key: CopyKey; label: string }[] }[] = [
  {
    group: "Navigation menu",
    items: [
      { key: "navAbout", label: "Menu: About" },
      { key: "navExperience", label: "Menu: Experience" },
      { key: "navCaseStudies", label: "Menu: Case studies" },
      { key: "navProjects", label: "Menu: Projects" },
      { key: "navContact", label: "Menu: Contact" },
      { key: "admin", label: "Admin link" },
    ],
  },
  {
    group: "Home — hero greeting",
    items: [
      { key: "eyebrow", label: "Eyebrow line" },
      { key: "heroTitle", label: "Headline (use \\n for a new line)" },
      { key: "heroBody", label: "Introduction" },
      { key: "explore", label: "Primary button" },
      { key: "cv", label: "CV download link" },
      { key: "available", label: "Availability note" },
      { key: "scroll", label: "Scroll cue" },
    ],
  },
  {
    group: "Home — perspective",
    items: [
      { key: "statementLabel", label: "Section label" },
      { key: "statementTitle", label: "Section title" },
      { key: "statementBody", label: "Section body" },
    ],
  },
  {
    group: "Home — career impact",
    items: [
      { key: "impactLabel", label: "Section label" },
      { key: "impactTitle", label: "Section title" },
      { key: "impactBody", label: "Section body" },
    ],
  },
  {
    group: "Home — testimonial",
    items: [{ key: "testimonialLabel", label: "Section label" }],
  },
  {
    group: "About — toolkit",
    items: [
      { key: "skillsLabel", label: "Section label" },
      { key: "skillsTitle", label: "Section title" },
    ],
  },
  {
    group: "About — foundation",
    items: [
      { key: "educationLabel", label: "Section label" },
      { key: "educationTitle", label: "Section title" },
      { key: "certLabel", label: "Certifications label" },
      { key: "certTitle", label: "Certifications title" },
    ],
  },
  {
    group: "Experience",
    items: [
      { key: "experienceLabel", label: "Section label" },
      { key: "experienceTitle", label: "Section title" },
      { key: "experienceBody", label: "Section body" },
    ],
  },
  {
    group: "Case studies & projects",
    items: [
      { key: "workLabel", label: "Section label" },
      { key: "workTitle", label: "Section title" },
      { key: "workBody", label: "Section body" },
      { key: "aboutProject", label: "Project link" },
      { key: "viewAll", label: "View all link" },
    ],
  },
  {
    group: "Contact",
    items: [
      { key: "contactLabel", label: "Section label" },
      { key: "contactTitle", label: "Section title" },
      { key: "contactBody", label: "Section body" },
      { key: "email", label: "Email button" },
      { key: "linkedin", label: "LinkedIn link" },
    ],
  },
];
