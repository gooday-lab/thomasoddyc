import type { Metadata } from "next";
import ProjectDetailView from "@/components/project-detail-view";
import { defaultProjects, fetchProjects, mergeProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Project | Thomas Oddy Chrisdwianto",
  description: "A selected project by Thomas Oddy Chrisdwianto.",
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rows = await fetchProjects();
  const pool = rows.length ? mergeProjects(defaultProjects, rows) : defaultProjects;
  return <ProjectDetailView initialProject={pool.find((item) => item.slug === slug) ?? null} />;
}
