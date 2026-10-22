import type { Metadata } from "next";
import ExperienceView from "./view";
import { fetchExperience } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience | Thomas Oddy Chrisdwianto",
  description: "Eight years of banking operations, credit reporting, and reporting automation.",
};

export default async function ExperiencePage() {
  const items = await fetchExperience();
  return <ExperienceView initialExperience={items} />;
}
