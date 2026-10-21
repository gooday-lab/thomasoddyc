import type { Metadata } from "next";
import "./globals.css";
import { SiteProvider } from "@/components/site-context";

export const metadata: Metadata = {
  metadataBase: new URL("https://profile.thomasoddyc.workers.dev"),
  title: "Thomas Oddy Chrisdwianto — MIS Analyst",
  description:
    "Personal portfolio of Thomas Oddy Chrisdwianto, a Reporting & Data Automation Analyst based in Sidoarjo, Indonesia.",
  keywords: ["MIS Analyst", "Data Analyst", "Reporting Automation", "Excel VBA", "Thomas Oddy"],
  openGraph: {
    title: "Thomas Oddy Chrisdwianto — MIS Analyst",
    description: "From data complexity to operational clarity.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Thomas Oddy Chrisdwianto — MIS Analyst" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Oddy Chrisdwianto — MIS Analyst",
    description: "From data complexity to operational clarity.",
    images: ["/og.png"],
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
