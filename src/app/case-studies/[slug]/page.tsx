import type { Metadata } from "next";
import ProjectDetailView from "@/components/project-detail-view";

export const metadata: Metadata = {
  title: "Case study — Thomas Oddy Chrisdwianto",
  description: "An automation case study by Thomas Oddy Chrisdwianto.",
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectDetailView slug={slug} />;
}
