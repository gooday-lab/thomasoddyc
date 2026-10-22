"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useSite } from "@/components/site-context";
import { MultiLine, SectionLabel, SiteShell } from "@/components/site-chrome";
import type { ExperienceRecord } from "@/lib/content";
import { defaultExperience } from "@/lib/content";

export default function ExperienceView({ initialExperience }: { initialExperience: ExperienceRecord[] }) {
  const { t, pick } = useSite();
  const [items] = useState<ExperienceRecord[]>(initialExperience.length ? initialExperience : defaultExperience);

  return (
    <SiteShell>
      <section className="experience section-pad">
        <div className="section-intro two-column">
          <div><SectionLabel>{t.experienceLabel}</SectionLabel></div>
          <div><h2><MultiLine text={t.experienceTitle} /></h2><p>{t.experienceBody}</p></div>
        </div>
        <div className="experience-list">
          {items.map((item, index) => (
            <article className="experience-item" key={item.id}>
              <div className="experience-index">0{index + 1}</div>
              <div className="experience-meta"><span>{item.years}</span><span>{item.company}</span></div>
              <div className="experience-detail">
                <h3>{item.role}</h3>
                <p>{pick(item.body_en, item.body_id)}</p>
                <div className="result"><Check size={14} /> {pick(item.result_en, item.result_id)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
