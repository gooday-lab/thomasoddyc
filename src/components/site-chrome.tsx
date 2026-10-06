"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSite } from "./site-context";

const navLinks = [
  { href: "/about", key: "navAbout" },
  { href: "/experience", key: "navExperience" },
  { href: "/case-studies", key: "navCaseStudies" },
  { href: "/projects", key: "navProjects" },
  { href: "/contact", key: "navContact" },
] as const;

function LanguageToggle({ className }: { className: string }) {
  const { language, setLanguage } = useSite();
  return (
    <div className={`nav-language ${className}`}>
      <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
      <span>/</span>
      <button className={language === "id" ? "active" : ""} onClick={() => setLanguage("id")}>ID</button>
    </div>
  );
}

export function SiteNav() {
  const { t } = useSite();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link className="brand" href="/" onClick={closeMenu}>
        <span className="brand-mark">TO</span>
        <span className="brand-name">Thomas Oddy<span>.</span></span>
      </Link>
      <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "active" : ""}
            onClick={closeMenu}
          >
            {t[link.key]}
          </Link>
        ))}
        <LanguageToggle className="mobile-language" />
      </div>
      <div className="nav-actions">
        <LanguageToggle className="desktop-language" />
        <Link className="nav-admin" href="/admin">{t.admin}</Link>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  const { profile, t } = useSite();
  return (
    <footer className="site-footer">
      <Link className="brand" href="/">
        <span className="brand-mark">TO</span>
        <span className="brand-name">Thomas Oddy<span>.</span></span>
      </Link>
      <span>{t.copyright || `© 2026 ${profile.full_name}`}</span>
      <Link href="/">Back to home ↑</Link>
    </footer>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

/** Renders text containing line breaks (real newlines or typed \\n) as stacked lines. */
export function MultiLine({ text }: { text: string }) {
  return <>{text.split(/\n|\\n/).map((line) => <span key={line}>{line}</span>)}</>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="site-shell" id="top">
      <SiteNav />
      {children}
      <SiteFooter />
    </main>
  );
}
