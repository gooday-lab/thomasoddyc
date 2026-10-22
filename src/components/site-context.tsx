"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { copy, type CopyKey, type Language } from "@/lib/copy";
import type { ProfileRecord } from "@/lib/content";

type CopyOverrides = Record<string, { en: string | null; id: string | null }>;

export type HeroDesign = {
  font: string;
  size: string;
  align: "left" | "center" | "right";
  orientation: "horizontal" | "vertical";
};

export const defaultHeroDesign: HeroDesign = {
  font: "Manrope",
  size: "clamp(54px, 7.6vw, 112px)",
  align: "left",
  orientation: "horizontal",
};

/** Resolve the hero design from site_copy overrides (pure, no fetching). */
function resolveHeroDesign(overrides: CopyOverrides): HeroDesign {
  const value = (key: string) => overrides[key]?.en ?? null;
  return {
    font: value("heroFont") || defaultHeroDesign.font,
    size: value("heroSize") || defaultHeroDesign.size,
    align: (["left", "center", "right"] as const).includes(value("heroAlign") as "left" | "center" | "right")
      ? value("heroAlign") as HeroDesign["align"]
      : defaultHeroDesign.align,
    orientation: value("heroOrientation") === "vertical" ? "vertical" : "horizontal",
  };
}

type SiteContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  isId: boolean;
  /** UI copy for the active language, with admin overrides applied. */
  t: Record<CopyKey, string>;
  profile: ProfileRecord;
  heroDesign: HeroDesign;
  /** Pick the translation matching the active language, falling back to EN. */
  pick: (en: string | null | undefined, id: string | null | undefined) => string;
};

const SiteContext = createContext<SiteContextValue | null>(null);

/** Real newlines and literal "\n" both become line breaks in rendered text. */
const withBreaks = (text: string) => text.replace(/\\n/g, "\n");

export function SiteProvider({
  children,
  initialProfile,
  initialOverrides,
}: {
  children: React.ReactNode;
  /** Fetched on the server (root layout), so the first paint is already final. */
  initialProfile: ProfileRecord;
  initialOverrides: CopyOverrides;
}) {
  const [language, setLanguage] = useState<Language>("en");
  const [profile] = useState<ProfileRecord>(initialProfile);
  const [overrides] = useState<CopyOverrides>(initialOverrides);

  const heroDesign = useMemo(() => resolveHeroDesign(overrides), [overrides]);

  const value = useMemo<SiteContextValue>(() => {
    const isId = language === "id";
    const t = { ...copy[language] } as Record<CopyKey, string>;
    for (const key of Object.keys(overrides) as CopyKey[]) {
      const override = isId ? overrides[key]?.id : overrides[key]?.en;
      if (override) t[key] = override;
    }
    for (const key of Object.keys(t) as CopyKey[]) t[key] = withBreaks(t[key]);
    return {
      language,
      setLanguage,
      isId,
      t,
      profile,
      heroDesign,
      pick: (en, id) => withBreaks((isId && id ? id : en) ?? ""),
    };
  }, [language, profile, overrides, heroDesign]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used inside <SiteProvider>");
  return context;
}
