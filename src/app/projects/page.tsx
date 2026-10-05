import type { Metadata } from "next";
import WorkView from "@/components/work-view";

export const metadata: Metadata = {
  title: "Projects — Thomas Oddy Chrisdwianto",
  description: "Selected reporting and performance-analysis projects by Thomas Oddy Chrisdwianto.",
};

export default function ProjectsPage() {
  return <WorkView variant="projects" />;
}
