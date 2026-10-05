import type { Metadata } from "next";
import ExperienceView from "./view";

export const metadata: Metadata = {
  title: "Experience — Thomas Oddy Chrisdwianto",
  description: "Eight years of banking operations, credit reporting, and reporting automation.",
};

export default function ExperiencePage() {
  return <ExperienceView />;
}
