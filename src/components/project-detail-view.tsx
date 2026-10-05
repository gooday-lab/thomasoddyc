"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useSite } from "./site-context";
import { MultiLine, SectionLabel, SiteShell } from "./site-chrome";
import { defaultProjects, fetchProjects, type ProjectRecord } from "@/lib/content";

const listPath = (project: ProjectRecord) =>
  /case\s*stud/i.test(project.type ?? "") ? "/case-studies" : "/projects";

export default function ProjectDetailView({ slug }: { slug: string }) {
  const { t, pick } = useSite();
  // Defaults render instantly; Supabase content replaces them once loaded.
  const [project, setProject] = useState<ProjectRecord | null>(
    () => defaultProjects.find((item) => item.slug === slug) ?? null,
  );
  const [loading, setLoading] = useState(
    () => !defaultProjects.some((item) => item.slug === slug),
  );

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const rows = await fetchProjects();
      if (cancelled) return;
      const pool = rows.length ? rows : defaultProjects;
      setProject(pool.find((item) => item.slug === slug) ?? null);
      setLoading(false);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <SiteShell>
        <section className="work section-pad">
          <p className="work-empty">Loading…</p>
        </section>
      </SiteShell>
    );
  }

  if (!project) {
    return (
      <SiteShell>
        <section className="work section-pad">
          <div className="section-intro two-column">
            <div><SectionLabel>{t.workLabel}</SectionLabel></div>
            <div>
              <h2><MultiLine text={t.workTitle} /></h2>
              <p className="work-empty">This project could not be found. It may have been unpublished or removed.</p>
              <Link href="/projects" className="text-link">{t.backToList}</Link>
            </div>
          </div>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="work section-pad">
        <div className="section-intro two-column">
          <div><SectionLabel>{(project.type ?? "Case study").toUpperCase()}</SectionLabel></div>
          <div>
            <h2><MultiLine text={pick(project.title_en, project.title_id)} /></h2>
            <p>{pick(project.body_en, project.body_id)}</p>
          </div>
        </div>
        <div className="two-column">
          <div />
          <div>
            <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            {project.impact_value && (
              <div className="detail-stat">
                <strong>{project.impact_value}</strong>
                <span>{pick(project.impact_label_en, project.impact_label_id)}</span>
              </div>
            )}
            <div className="detail-actions">
              <Link href="/contact" className="button button-dark">{t.projectCta} <ArrowUpRight size={16} /></Link>
              <Link href={listPath(project)} className="text-link">{t.backToList}</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
