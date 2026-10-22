import type { Metadata } from "next";
import "./globals.css";
import { SiteProvider } from "@/components/site-context";
import {
  defaultProfile,
  fetchProfile,
  fetchSiteCopy,
  type SiteCopyRecord,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://profile.thomasoddyc.workers.dev"),
  title: "Thomas Oddy Chrisdwianto | MIS Analyst",
  description:
    "Personal portfolio of Thomas Oddy Chrisdwianto, a Reporting & Data Automation Analyst based in Sidoarjo, Indonesia.",
  keywords: ["MIS Analyst", "Data Analyst", "Reporting Automation", "Excel VBA", "Thomas Oddy"],
  openGraph: {
    title: "Thomas Oddy Chrisdwianto | MIS Analyst",
    description: "From data complexity to operational clarity.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Thomas Oddy Chrisdwianto | MIS Analyst" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Oddy Chrisdwianto | MIS Analyst",
    description: "From data complexity to operational clarity.",
    images: ["/og.png"],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Data is fetched on the server so the very first paint already shows the
  // final content — no default-then-updated flash on refresh.
  const [profileData, copyRows] = await Promise.all([fetchProfile(), fetchSiteCopy()]);
  const overrides: Record<string, { en: string | null; id: string | null }> = {};
  for (const row of copyRows as SiteCopyRecord[]) {
    overrides[row.copy_key] = { en: row.value_en, id: row.value_id };
  }

  return (
    <html lang="en">
      <body>
        <SiteProvider initialProfile={profileData ?? defaultProfile} initialOverrides={overrides}>
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}
