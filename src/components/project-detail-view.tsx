"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSite } from "./site-context";
import { MultiLine, SiteShell } from "./site-chrome";
import type { ProjectRecord } from "@/lib/content";

const listPath = (project: ProjectRecord) =>
  /case\s*stud/i.test(project.type ?? "") ? "/case-studies" : "/projects";

export default function ProjectDetailView({ initialProject }: { initialProject: ProjectRecord | null }) {
  const { t, pick } = useSite();
  const project = initialProject;

  if (!project) {
    return (
      <SiteShell>
        <section className="work section-pad">
          <div className="section-intro">
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
        <div className="section-intro">
          <div>
            <h2><MultiLine text={pick(project.title_en, project.title_id)} /></h2>
            <p>{pick(project.body_en, project.body_id)}</p>
          </div>
        </div>
        {project.cover_url && (
          <figure className="detail-cover">
            <img src={project.cover_url} alt={pick(project.title_en, project.title_id)} loading="lazy" />
          </figure>
        )}
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
              {project.file_url && (
                <a href={project.file_url} download className="button button-dark">Download project file <ArrowUpRight size={16} /></a>
              )}
              <Link href="/contact" className="button button-dark">{t.projectCta} <ArrowUpRight size={16} /></Link>
              <Link href={listPath(project)} className="text-link">{t.backToList}</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
