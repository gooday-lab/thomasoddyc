import type { Metadata } from "next";
import "./globals.css";
import { SiteProvider } from "@/components/site-context";

export const metadata: Metadata = {
  title: "Thomas Oddy Chrisdwianto — MIS Analyst",
  description:
    "Personal portfolio of Thomas Oddy Chrisdwianto, a Reporting & Data Automation Analyst based in Sidoarjo, Indonesia.",
  keywords: ["MIS Analyst", "Data Analyst", "Reporting Automation", "Excel VBA", "Thomas Oddy"],
  openGraph: {
    title: "Thomas Oddy Chrisdwianto — MIS Analyst",
    description: "From data complexity to operational clarity.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
