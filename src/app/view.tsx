"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, BarChart3, Download, Quote } from "lucide-react";
import { useSite } from "@/components/site-context";
import { MultiLine, SectionLabel, SiteShell } from "@/components/site-chrome";
import { defaultTestimonials, fetchTestimonials, type TestimonialRecord } from "@/lib/content";
import { impact } from "@/lib/cv";

function initials(name: string | null | undefined) {
  if (!name) return "—";
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function HomeView() {
  const { t, isId, pick, profile } = useSite();
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>(defaultTestimonials);

  useEffect(() => {
    let cancelled = false;
    fetchTestimonials().then((rows) => {
      if (!cancelled && rows.length) setTestimonials(rows);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteShell>
      <section className="hero section-pad">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="eyebrow"><span className="eyebrow-dot" /> {t.eyebrow}</div>
            <h1><MultiLine text={t.heroTitle} /></h1>
            <p className="hero-body">{pick(profile.bio_en, profile.bio_id) || t.heroBody}</p>
            <div className="hero-actions">
              <Link href="/about" className="button button-dark">{t.explore} <ArrowUpRight size={16} /></Link>
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
        <a href="#perspective" className="scroll-cue"><span className="scroll-line" /> {t.scroll}</a>
      </section>

      <section className="statement section-pad" id="perspective">
        <div className="two-column">
          <div><SectionLabel>{t.statementLabel}</SectionLabel></div>
          <div className="statement-copy">
            <h2>{t.statementTitle}</h2>
            <p>{t.statementBody}</p>
            <div className="signature">{profile.full_name} <span>— Sidoarjo, Indonesia</span></div>
          </div>
        </div>
      </section>

      <section className="impact section-pad">
        <div className="section-intro two-column">
          <div><SectionLabel>{t.impactLabel}</SectionLabel></div>
          <div><h2><MultiLine text={t.impactTitle} /></h2><p>{t.impactBody}</p></div>
        </div>
        <div className="impact-grid">
          {impact.map((item) => <div className="impact-card" key={item.value}><strong>{item.value}</strong><span>{isId ? item.id : item.label}</span></div>)}
        </div>
      </section>

      <section className="testimonial section-pad">
        <SectionLabel>{t.testimonialLabel}</SectionLabel>
        {testimonials.map((item) => (
          <div className="testimonial-content" key={item.id}>
            <Quote size={38} />
            <blockquote>“{pick(item.quote_en, item.quote_id)}”</blockquote>
            <div className="testimonial-person">
              <span className="avatar-placeholder">{initials(item.author_name)}</span>
              <div><strong>{item.author_name ?? ""}</strong><span>{item.author_role ?? ""}</span></div>
            </div>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
