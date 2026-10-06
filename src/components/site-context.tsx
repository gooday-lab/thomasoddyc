"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { copy, type CopyKey, type Language } from "@/lib/copy";
import {
  defaultProfile,
  fetchProfile,
  fetchSiteCopy,
  type ProfileRecord,
} from "@/lib/content";

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

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [profile, setProfile] = useState<ProfileRecord>(defaultProfile);
  const [overrides, setOverrides] = useState<CopyOverrides>({});
  const [heroDesign, setHeroDesign] = useState<HeroDesign>(defaultHeroDesign);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const [profileData, copyRows] = await Promise.all([fetchProfile(), fetchSiteCopy()]);
      if (cancelled) return;
      if (profileData) setProfile(profileData);
      if (copyRows.length) {
        const next: CopyOverrides = {};
        for (const row of copyRows) {
          next[row.copy_key] = { en: row.value_en, id: row.value_id };
        }
        setOverrides(next);
        const value = (key: string) => copyRows.find((row) => row.copy_key === key)?.value_en;
        setHeroDesign({
          font: value("heroFont") || defaultHeroDesign.font,
          size: value("heroSize") || defaultHeroDesign.size,
          align: (["left", "center", "right"] as const).includes(value("heroAlign") as "left" | "center" | "right")
            ? value("heroAlign") as HeroDesign["align"]
            : defaultHeroDesign.align,
          orientation: value("heroOrientation") === "vertical" ? "vertical" : "horizontal",
        });
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<SiteContextValue>(() => {
    const isId = language === "id";
    const t = { ...copy[language] } as Record<CopyKey, string>;
    for (const key of Object.keys(overrides) as CopyKey[]) {
      const override = isId ? overrides[key]?.id : overrides[key]?.en;
      if (override) t[key] = override;
    }
    return {
      language,
      setLanguage,
      isId,
      t,
      profile,
      heroDesign,
      pick: (en, id) => (isId && id ? id : en) ?? "",
    };
  }, [language, profile, overrides, heroDesign]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used inside <SiteProvider>");
  return context;
}
