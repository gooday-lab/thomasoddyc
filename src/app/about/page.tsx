import type { Metadata } from "next";
import AboutView from "./view";
import { fetchCertifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | Thomas Oddy Chrisdwianto",
  description: "Skills, education, and continuous learning behind Thomas Oddy's reporting automation work.",
};

export default async function AboutPage() {
  const certifications = await fetchCertifications();
  return <AboutView initialCertifications={certifications} />;
}
