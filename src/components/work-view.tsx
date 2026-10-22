"use client";

import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { useSite } from "./site-context";
import { MultiLine, SectionLabel, SiteShell } from "./site-chrome";
import type { ProjectRecord } from "@/lib/content";

const isCaseStudy = (project: ProjectRecord) => /case\s*stud/i.test(project.type ?? "");

export default function WorkView({ variant, initialProjects }: { variant: "case-studies" | "projects"; initialProjects: ProjectRecord[] }) {
  const { t, pick } = useSite();
  const projects = initialProjects;

  const visible = projects.filter((project) =>
    variant === "case-studies" ? isCaseStudy(project) : !isCaseStudy(project),
  );

  return (
    <SiteShell>
      <section className="work section-pad">
        <div className="section-intro two-column">
          <div><SectionLabel>{t.workLabel}</SectionLabel></div>
          <div><h2><MultiLine text={t.workTitle} /></h2><p>{t.workBody}</p></div>
        </div>
        {visible.length === 0 ? (
          <p className="work-empty">Content is on the way. Add a project from the admin workspace.</p>
        ) : (
          <div className="project-list">
            {visible.map((project, index) => (
              <article className="project-card" key={project.id}>
                <div className="project-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{(project.type ?? "Case study").toUpperCase()}</span></div>
                <div className="project-main">
                  <div>
                    <h3>{pick(project.title_en, project.title_id)}</h3>
                    <p>{pick(project.body_en, project.body_id)}</p>
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                  <div className="project-stat"><strong>{project.impact_value ?? ""}</strong><span>{pick(project.impact_label_en, project.impact_label_id)}</span></div>
                </div>
                <Link className="project-link" href={`/${variant}/${project.slug}`}>{t.aboutProject} <MoveUpRight size={16} /></Link>
              </article>
            ))}
          </div>
        )}
        {variant === "case-studies" && (
          <Link href="/projects" className="outline-link">{t.viewAll} <ArrowUpRight size={16} /></Link>
        )}
      </section>
    </SiteShell>
  );
}
