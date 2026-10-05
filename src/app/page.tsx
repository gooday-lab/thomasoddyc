"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  Download,
  ExternalLink,
  Mail,
  Menu,
  MoveUpRight,
  Quote,
  Sparkles,
  X,
} from "lucide-react";
import {
  defaultCertifications,
  defaultProfile,
  defaultProjects,
  defaultTestimonials,
  fetchCertifications,
  fetchProfile,
  fetchProjects,
  fetchTestimonials,
  type CertificationRecord,
  type ProfileRecord,
  type ProjectRecord,
  type TestimonialRecord,
} from "@/lib/content";

type Language = "en" | "id";

const copy = {
  en: {
    nav: ["About", "Experience", "Case studies", "Projects", "Contact"],
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
    nav: ["Tentang", "Pengalaman", "Studi kasus", "Proyek", "Kontak"],
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

const impact = [
  { value: "8+", label: "years in banking", id: "tahun di perbankan" },
  { value: "50K+", label: "credit records managed", id: "data kredit dikelola" },
  { value: "75%", label: "faster reporting", id: "reporting lebih cepat" },
  { value: "4 → 1", label: "days for weekly reporting", id: "hari untuk reporting mingguan" },
];

const experience = [
  {
    years: "Mar 2022 — Aug 2026",
    company: "PT. Bank Maspion Indonesia Tbk",
    role: "Credit Reporting",
    body: "Prepared and validated 50,000+ credit records for regulatory and internal reporting. Built Excel VBA workflows for reconciliation, validation, file processing, and recurring reports.",
    result: "Reporting time reduced from 8 hours to 2 hours.",
  },
  {
    years: "Mar 2018 — Mar 2022",
    company: "PT. Bank Pan Indonesia Tbk",
    role: "Branch Support",
    body: "Streamlined disbursement and loan settlement reporting while analyzing pipeline, disbursement, settlement, and NPL indicators for branch performance monitoring.",
    result: "Weekly reporting reduced from 4 days to 1 day.",
  },
  {
    years: "Aug 2017 — Sep 2017",
    company: "PT. Telkom Indonesia",
    role: "IT Support Intern",
    body: "Supported the development of a web-based application for monitoring Telkom device distribution, including PHP and MySQL-related activities.",
    result: "First step into building useful systems.",
  },
];

const skills = [
  { group: "Data & reporting", items: ["Data analysis", "Regulatory reporting", "SLIK reporting", "Data reconciliation", "Validation", "Forecasting"] },
  { group: "Automation", items: ["Excel VBA", "Macro development", "TXT import / export", "File processing", "Pivot tables", "Advanced formulas"] },
  { group: "Working style", items: ["Detail-oriented", "Process improvement", "Problem solving", "Performance monitoring", "Business reporting", "Target planning"] },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function initials(name: string | null | undefined) {
  if (!name) return "—";
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileRecord>(defaultProfile);
  const [projects, setProjects] = useState<ProjectRecord[]>(defaultProjects);
  const [certifications, setCertifications] = useState<CertificationRecord[]>(defaultCertifications);
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>(defaultTestimonials);
  const t = copy[language];
  const isId = language === "id";

  const pick = (en: string | null | undefined, id: string | null | undefined) =>
    (isId && id ? id : en) ?? "";

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const [profileData, projectRows, certRows, testimonialRows] = await Promise.all([
        fetchProfile(),
        fetchProjects(),
        fetchCertifications(),
        fetchTestimonials(),
      ]);
      if (cancelled) return;
      if (profileData) setProfile(profileData);
      if (projectRows.length) setProjects(projectRows);
      if (certRows.length) setCertifications(certRows);
      if (testimonialRows.length) setTestimonials(testimonialRows);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" onClick={closeMenu}>
          <span className="brand-mark">TO</span>
          <span className="brand-name">Thomas Oddy<span>.</span></span>
        </a>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#about" onClick={closeMenu}>{t.nav[0]}</a>
          <a href="#experience" onClick={closeMenu}>{t.nav[1]}</a>
          <a href="#work" onClick={closeMenu}>{t.nav[2]}</a>
          <a href="#projects" onClick={closeMenu}>{t.nav[3]}</a>
          <a href="#contact" onClick={closeMenu}>{t.nav[4]}</a>
          <div className="nav-language mobile-language">
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
            <span>/</span>
            <button className={language === "id" ? "active" : ""} onClick={() => setLanguage("id")}>ID</button>
          </div>
        </div>
        <div className="nav-actions">
          <div className="nav-language desktop-language">
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
            <span>/</span>
            <button className={language === "id" ? "active" : ""} onClick={() => setLanguage("id")}>ID</button>
          </div>
          <Link className="nav-admin" href="/admin">{t.admin}</Link>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <section className="hero section-pad" id="top">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="eyebrow"><span className="eyebrow-dot" /> {t.eyebrow}</div>
            <h1>{t.heroTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
            <p className="hero-body">{pick(profile.bio_en, profile.bio_id) || t.heroBody}</p>
            <div className="hero-actions">
              <a href="#about" className="button button-dark">{t.explore} <ArrowUpRight size={16} /></a>
              <a href={profile.cv_url || "/Thomas_Oddy_ATS_CV.docx"} className="text-link"><Download size={15} /> {t.cv}</a>
            </div>
            <div className="availability"><span className="status-dot" /> {t.available}</div>
          </div>
          <div className="hero-visual" aria-label="Data visualization illustration">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-core">
              <span className="core-label">DATA → DECISIONS</span>
              <span className="core-value">75<span>%</span></span>
              <span className="core-caption">efficiency gain</span>
            </div>
            <div className="visual-float float-top"><span className="float-line" /><span>50K+</span><small>records managed</small></div>
            <div className="visual-float float-bottom"><BarChart3 size={17} /><span>Reporting<br /><b>optimized</b></span></div>
            <div className="visual-grid" />
          </div>
        </div>
        <a href="#about" className="scroll-cue"><span className="scroll-line" /> {t.scroll}</a>
      </section>

      <section className="statement section-pad" id="about">
        <div className="two-column">
          <div><SectionLabel>{t.statementLabel}</SectionLabel></div>
          <div className="statement-copy">
            <h2>{t.statementTitle}</h2>
            <p>{t.statementBody}</p>
            <div className="signature">Thomas Oddy Chrisdwianto <span>— Sidoarjo, Indonesia</span></div>
          </div>
        </div>
      </section>

      <section className="impact section-pad">
        <div className="section-intro two-column">
          <div><SectionLabel>{t.impactLabel}</SectionLabel></div>
          <div><h2>{t.impactTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{t.impactBody}</p></div>
        </div>
        <div className="impact-grid">
          {impact.map((item) => <div className="impact-card" key={item.value}><strong>{item.value}</strong><span>{isId ? item.id : item.label}</span></div>)}
        </div>
      </section>

      <section className="experience section-pad" id="experience">
        <div className="section-intro two-column">
          <div><SectionLabel>{t.experienceLabel}</SectionLabel></div>
          <div><h2>{t.experienceTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{t.experienceBody}</p></div>
        </div>
        <div className="experience-list">
          {experience.map((item, index) => <article className="experience-item" key={item.company}>
            <div className="experience-index">0{index + 1}</div>
            <div className="experience-meta"><span>{item.years}</span><span>{item.company}</span></div>
            <div className="experience-detail"><h3>{item.role}</h3><p>{item.body}</p><div className="result"><Check size={14} /> {item.result}</div></div>
          </article>)}
        </div>
      </section>

      <section className="toolkit section-pad">
        <div className="two-column">
          <div><SectionLabel>{t.skillsLabel}</SectionLabel></div>
          <div><h2>{t.skillsTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><div className="skill-groups">{skills.map((skill) => <div className="skill-group" key={skill.group}><h3>{skill.group}</h3><div className="skill-list">{skill.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div></div>
        </div>
      </section>

      <section className="work section-pad" id="work">
        <div className="section-intro two-column">
          <div><SectionLabel>{t.workLabel}</SectionLabel></div>
          <div><h2>{t.workTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{t.workBody}</p></div>
        </div>
        <div className="project-list" id="projects">
          {projects.map((project, index) => <article className="project-card" key={project.id}>
            <div className="project-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{(project.type ?? "Case study").toUpperCase()}</span></div>
            <div className="project-main"><div><h3>{pick(project.title_en, project.title_id)}</h3><p>{pick(project.body_en, project.body_id)}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="project-stat"><strong>{project.impact_value ?? ""}</strong><span>{pick(project.impact_label_en, project.impact_label_id)}</span></div></div>
            <a className="project-link" href="#contact">{t.aboutProject} <MoveUpRight size={16} /></a>
          </article>)}
        </div>
        <Link href="/admin" className="outline-link">{t.viewAll} <ArrowUpRight size={16} /></Link>
      </section>

      <section className="foundation section-pad">
        <div className="two-column foundation-grid">
          <div><SectionLabel>{t.educationLabel}</SectionLabel><h2>{t.educationTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2></div>
          <div className="foundation-right"><div className="education-row"><span>2012 — 2017</span><div><h3>Universitas Brawijaya</h3><p>Bachelor of Computer Systems</p></div></div><div className="education-row"><span>2009 — 2012</span><div><h3>SMAN 1 Madiun</h3><p>Science Major</p></div></div><div className="cert-heading"><SectionLabel>{t.certLabel}</SectionLabel><h2>{t.certTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2></div>{certifications.map((cert) => <div className="cert-row" key={cert.id}><Sparkles size={17} /><div><h3>{pick(cert.name_en, cert.name_id)}</h3><p>{cert.issuer ?? ""}</p></div><span>{cert.year ?? ""}</span></div>)}</div>
        </div>
      </section>

      <section className="testimonial section-pad">
        <SectionLabel>{t.testimonialLabel}</SectionLabel>
        {testimonials.map((item) => <div className="testimonial-content" key={item.id}><Quote size={38} /><blockquote>“{pick(item.quote_en, item.quote_id)}”</blockquote><div className="testimonial-person"><span className="avatar-placeholder">{initials(item.author_name)}</span><div><strong>{item.author_name ?? ""}</strong><span>{item.author_role ?? ""}</span></div></div></div>)}
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-inner"><SectionLabel>{t.contactLabel}</SectionLabel><h2>{t.contactTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{t.contactBody}</p><div className="contact-actions"><a href={`mailto:${profile.email}`} className="button button-light"><Mail size={17} /> {t.email}</a><a href={profile.linkedin_url ?? "#"} target="_blank" rel="noreferrer" className="contact-social">in&nbsp; {t.linkedin} <ExternalLink size={14} /></a><a href="https://goodays.page.dev" target="_blank" rel="noreferrer" className="contact-social">goodays.page.dev <ExternalLink size={14} /></a></div></div>
      </section>

      <footer className="site-footer"><div className="brand"><span className="brand-mark">TO</span><span className="brand-name">Thomas Oddy<span>.</span></span></div><span>© 2026 {profile.full_name}</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
