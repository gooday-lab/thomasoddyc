"use client";

import { ExternalLink, Mail } from "lucide-react";
import { useSite } from "@/components/site-context";
import { MultiLine, SectionLabel, SiteShell } from "@/components/site-chrome";

export default function ContactView() {
  const { t, profile } = useSite();

  return (
    <SiteShell>
      <section className="contact section-pad">
        <div className="contact-inner">
          <SectionLabel>{t.contactLabel}</SectionLabel>
          <h2><MultiLine text={t.contactTitle} /></h2>
          <p>{t.contactBody}</p>
          <div className="contact-actions">
            <a href={`mailto:${profile.email}`} className="button button-light"><Mail size={17} /> {t.email}</a>
            <a href={profile.linkedin_url ?? "#"} target="_blank" rel="noreferrer" className="contact-social">in&nbsp; {t.linkedin} <ExternalLink size={14} /></a>
            <a href="https://goodays.pages.dev" target="_blank" rel="noreferrer" className="contact-social">goodays.pages.dev <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
