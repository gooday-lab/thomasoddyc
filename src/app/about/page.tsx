import type { Metadata } from "next";
import AboutView from "./view";

export const metadata: Metadata = {
  title: "About — Thomas Oddy Chrisdwianto",
  description: "Skills, education, and continuous learning behind Thomas Oddy's reporting automation work.",
};

export default function AboutPage() {
  return <AboutView />;
}
