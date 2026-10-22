import type { Metadata } from "next";
import HomeView from "./view";
import { fetchTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thomas Oddy Chrisdwianto | MIS Analyst",
  description:
    "Personal portfolio of Thomas Oddy Chrisdwianto, a Reporting & Data Automation Analyst based in Sidoarjo, Indonesia.",
};

export default async function HomePage() {
  const testimonials = await fetchTestimonials();
  return <HomeView initialTestimonials={testimonials} />;
}
