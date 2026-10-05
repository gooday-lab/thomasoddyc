"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useSite } from "@/components/site-context";
import { MultiLine, SectionLabel, SiteShell } from "@/components/site-chrome";
import { defaultCertifications, fetchCertifications, type CertificationRecord } from "@/lib/content";
import { skills } from "@/lib/cv";

export default function AboutView() {
  const { t, pick } = useSite();
  const [certifications, setCertifications] = useState<CertificationRecord[]>(defaultCertifications);

  useEffect(() => {
    let cancelled = false;
    fetchCertifications().then((rows) => {
      if (!cancelled && rows.length) setCertifications(rows);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteShell>
      <section className="toolkit section-pad">
        <div className="two-column">
          <div><SectionLabel>{t.skillsLabel}</SectionLabel></div>
          <div>
            <h2><MultiLine text={t.skillsTitle} /></h2>
            <div className="skill-groups">
              {skills.map((skill) => (
                <div className="skill-group" key={skill.group}>
                  <h3>{skill.group}</h3>
                  <div className="skill-list">{skill.items.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="foundation section-pad">
        <div className="two-column foundation-grid">
          <div><SectionLabel>{t.educationLabel}</SectionLabel><h2><MultiLine text={t.educationTitle} /></h2></div>
          <div className="foundation-right">
            <div className="education-row"><span>2012 — 2017</span><div><h3>Universitas Brawijaya</h3><p>Bachelor of Computer Systems</p></div></div>
            <div className="education-row"><span>2009 — 2012</span><div><h3>SMAN 1 Madiun</h3><p>Science Major</p></div></div>
            <div className="cert-heading"><SectionLabel>{t.certLabel}</SectionLabel><h2><MultiLine text={t.certTitle} /></h2></div>
            {certifications.map((cert) => (
              <div className="cert-row" key={cert.id}>
                <Sparkles size={17} />
                <div><h3>{pick(cert.name_en, cert.name_id)}</h3><p>{cert.issuer ?? ""}</p></div>
                <span>{cert.year ?? ""}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
