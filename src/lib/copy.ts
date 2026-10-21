/**
 * UI copy for the public site.
 *
 * Every string here can be overridden from the admin workspace
 * (Admin → Site copy) and is stored per language in the `site_copy` table.
 */

export type Language = "en" | "id";

export const copy = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navExperience: "Experience",
    navCaseStudies: "Case studies",
    navProjects: "Projects",
    navContact: "Contact",
    eyebrow: "MIS Analyst · Data & Reporting",
    heroTitle: "I make complex data\nwork clearly.",
    heroBody:
      "Most of my work starts the same way: a report that eats hours every week. I turn it into something that runs itself.",
    explore: "Explore my work",
    cv: "Download CV",
    available: "Open to MIS & Data Analyst opportunities",
    scroll: "Scroll to explore",
    heroCoreLabel: "DATA → DECISIONS",
    heroCoreValue: "75",
    heroCoreSuffix: "%",
    heroCoreCaption: "Efficiency gain",
    heroFloatValue: "50K+",
    heroFloatCaption: "Records managed",
    heroFloatLine1: "Reporting",
    heroFloatLine2: "Optimized",
    statementLabel: "The perspective",
    statementTitle: "I build reports people can trust.",
    statementBody:
      "I have spent more than eight years in banking, mostly where operations meet data. Producing reports is only half the job; the other half is making sure the numbers hold up when someone actually uses them.",
    impactLabel: "Career impact",
    impactTitle: "Small fixes.\nBig time savings.",
    impactBody:
      "Changes that gave my team hours back every single week.",
    experienceLabel: "Experience",
    experienceTitle: "Where I've\nbeen working.",
    experienceBody:
      "From branch reports to regulatory reporting. Different desks, same lesson: the details matter.",
    skillsLabel: "Toolkit",
    skillsTitle: "What I use\nevery day.",
    workLabel: "Selected work",
    workTitle: "Things I've\nactually built.",
    workBody:
      "A mix of banking workflows and personal projects. Anything with fictional data says so up front.",
    aboutProject: "View case study",
    educationLabel: "Foundation",
    educationTitle: "Where it\nall started.",
    certLabel: "Learning",
    certTitle: "Still collecting\ncertificates.",
    testimonialLabel: "A good working relationship",
    contactLabel: "Let's connect",
    contactTitle: "Have a complex\nprocess in mind?",
    contactBody:
      "If you need an MIS Analyst, or just want reporting that runs better, send me a message.",
    email: "Send an email",
    linkedin: "LinkedIn profile",
    admin: "Admin",
    viewAll: "View all projects",
    projectCta: "Let’s discuss this work",
    backToList: "Back to all work",
    copyright: "© 2026 Thomas Oddy Chrisdwianto",
  },
  id: {
    navHome: "Beranda",
    navAbout: "Tentang",
    navExperience: "Pengalaman",
    navCaseStudies: "Studi kasus",
    navProjects: "Proyek",
    navContact: "Kontak",
    eyebrow: "MIS Analyst · Data & Reporting",
    heroTitle: "Saya membuat data\nyang kompleks menjadi jelas.",
    heroBody:
      "Sebagian besar pekerjaan saya selalu mulai dari hal yang sama: laporan yang memakan waktu berjam-jam setiap minggu. Saya ubah menjadi sistem yang bisa berjalan sendiri.",
    explore: "Lihat karya saya",
    cv: "Unduh CV",
    available: "Terbuka untuk kesempatan MIS & Data Analyst",
    scroll: "Gulir untuk menjelajah",
    heroCoreLabel: "DATA → KEPUTUSAN",
    heroCoreValue: "75",
    heroCoreSuffix: "%",
    heroCoreCaption: "Efisiensi meningkat",
    heroFloatValue: "50K+",
    heroFloatCaption: "Data dikelola",
    heroFloatLine1: "Reporting",
    heroFloatLine2: "Optimal",
    statementLabel: "Perspektif",
    statementTitle: "Saya membangun laporan yang bisa dipercaya.",
    statementBody:
      "Lebih dari delapan tahun di perbankan, sebagian besar waktu saya di persimpangan antara operasional dan data. Menghasilkan laporan hanya separuh pekerjaan; separuh lainnya memastikan angkanya tetap berdiri saat benar-benar dipakai.",
    impactLabel: "Dampak karier",
    impactTitle: "Perbaikan kecil.\nWaktu yang terasa.",
    impactBody:
      "Perubahan yang mengembalikan waktu tim saya setiap minggunya.",
    experienceLabel: "Pengalaman",
    experienceTitle: "Tempat saya\nbekerja selama ini.",
    experienceBody:
      "Dari laporan cabang sampai regulatory reporting. Meja kerjanya berbeda, pelajarannya sama: detail itu penting.",
    skillsLabel: "Toolkit",
    skillsTitle: "Yang saya pakai\nsehari-hari.",
    workLabel: "Karya pilihan",
    workTitle: "Hal-hal yang\nbenar-benar saya bangun.",
    workBody:
      "Campuran workflow perbankan dan proyek pribadi. Yang datanya fiktif, ditulis begitu di awal.",
    aboutProject: "Lihat studi kasus",
    educationLabel: "Fondasi",
    educationTitle: "Dari mana\nsemuanya mulai.",
    certLabel: "Pembelajaran",
    certTitle: "Terus mengumpulkan\nsertifikat.",
    testimonialLabel: "Kolaborasi yang baik",
    contactLabel: "Mari terhubung",
    contactTitle: "Punya proses\nyang kompleks?",
    contactBody:
      "Kalau Anda butuh MIS Analyst, atau hanya ingin reporting yang berjalan lebih baik, kirim saya pesan.",
    email: "Kirim email",
    linkedin: "Profil LinkedIn",
    admin: "Admin",
    viewAll: "Lihat semua proyek",
    projectCta: "Mari diskusikan",
    backToList: "Kembali ke daftar",
    copyright: "© 2026 Thomas Oddy Chrisdwianto",
  },
};

export type CopyKey = keyof (typeof copy)["en"];

export const copyKeys = Object.keys(copy.en) as CopyKey[];

/** Grouped metadata so the admin editor shows friendly, organised fields. */
export const copyGroups: { group: string; items: { key: CopyKey; label: string }[] }[] = [
  {
    group: "Navigation menu",
    items: [
      { key: "navHome", label: "Menu: Home" },
      { key: "navAbout", label: "Menu: About" },
      { key: "navExperience", label: "Menu: Experience" },
      { key: "navCaseStudies", label: "Menu: Case studies" },
      { key: "navProjects", label: "Menu: Projects" },
      { key: "navContact", label: "Menu: Contact" },
      { key: "admin", label: "Admin link" },
    ],
  },
  {
    group: "Home · hero greeting",
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
    group: "Home · hero visual",
    items: [
      { key: "heroCoreLabel", label: "Lingkaran tengah: label" },
      { key: "heroCoreValue", label: "Lingkaran tengah: angka" },
      { key: "heroCoreSuffix", label: "Lingkaran tengah: satuan" },
      { key: "heroCoreCaption", label: "Lingkaran tengah: keterangan" },
      { key: "heroFloatValue", label: "Kartu melayang: angka" },
      { key: "heroFloatCaption", label: "Kartu melayang: keterangan" },
      { key: "heroFloatLine1", label: "Kartu kecil: baris 1" },
      { key: "heroFloatLine2", label: "Kartu kecil: baris 2 (bold)" },
    ],
  },
  {
    group: "Home · perspective",
    items: [
      { key: "statementLabel", label: "Section label" },
      { key: "statementTitle", label: "Section title" },
      { key: "statementBody", label: "Section body" },
    ],
  },
  {
    group: "Home · career impact",
    items: [
      { key: "impactLabel", label: "Section label" },
      { key: "impactTitle", label: "Section title" },
      { key: "impactBody", label: "Section body" },
    ],
  },
  {
    group: "Home · testimonial",
    items: [{ key: "testimonialLabel", label: "Section label" }],
  },
  {
    group: "About · toolkit",
    items: [
      { key: "skillsLabel", label: "Section label" },
      { key: "skillsTitle", label: "Section title" },
    ],
  },
  {
    group: "About · foundation",
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
      { key: "projectCta", label: "Detail page button" },
      { key: "backToList", label: "Detail page back link" },
    ],
  },
  {
    group: "Footer",
    items: [{ key: "copyright", label: "Copyright notice" }],
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
