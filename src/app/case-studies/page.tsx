import type { Metadata } from "next";
import WorkView from "@/components/work-view";
import { defaultProjects, fetchProjects, mergeProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case studies | Thomas Oddy Chrisdwianto",
  description: "Automation case studies: regulatory reporting, reconciliation, and data validation workflows.",
};

export default async function CaseStudiesPage() {
  const rows = await fetchProjects();
  return <WorkView variant="case-studies" initialProjects={mergeProjects(defaultProjects, rows)} />;
}
