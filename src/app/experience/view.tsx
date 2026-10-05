"use client";

import { Check } from "lucide-react";
import { useSite } from "@/components/site-context";
import { MultiLine, SectionLabel, SiteShell } from "@/components/site-chrome";
import { experience } from "@/lib/cv";

export default function ExperienceView() {
  const { t } = useSite();

  return (
    <SiteShell>
      <section className="experience section-pad">
        <div className="section-intro two-column">
          <div><SectionLabel>{t.experienceLabel}</SectionLabel></div>
          <div><h2><MultiLine text={t.experienceTitle} /></h2><p>{t.experienceBody}</p></div>
        </div>
        <div className="experience-list">
          {experience.map((item, index) => (
            <article className="experience-item" key={item.company}>
              <div className="experience-index">0{index + 1}</div>
              <div className="experience-meta"><span>{item.years}</span><span>{item.company}</span></div>
              <div className="experience-detail">
                <h3>{item.role}</h3>
                <p>{item.body}</p>
                <div className="result"><Check size={14} /> {item.result}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
