import type { Metadata } from "next";
import ContactView from "@/components/contact-view";

export const metadata: Metadata = {
  title: "Contact — Thomas Oddy Chrisdwianto",
  description: "Get in touch with Thomas Oddy Chrisdwianto for MIS and data analyst opportunities.",
};

export default function ContactPage() {
  return <ContactView />;
}
