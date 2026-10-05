import type { Metadata } from "next";
import WorkView from "@/components/work-view";

export const metadata: Metadata = {
  title: "Case studies — Thomas Oddy Chrisdwianto",
  description: "Automation case studies: regulatory reporting, reconciliation, and data validation workflows.",
};

export default function CaseStudiesPage() {
  return <WorkView variant="case-studies" />;
}
