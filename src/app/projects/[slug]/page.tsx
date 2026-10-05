import type { Metadata } from "next";
import ProjectDetailView from "@/components/project-detail-view";

export const metadata: Metadata = {
  title: "Project — Thomas Oddy Chrisdwianto",
  description: "A selected project by Thomas Oddy Chrisdwianto.",
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectDetailView slug={slug} />;
}
