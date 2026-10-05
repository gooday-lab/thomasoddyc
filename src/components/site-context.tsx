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

type SiteContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  isId: boolean;
  /** UI copy for the active language, with admin overrides applied. */
  t: Record<CopyKey, string>;
  profile: ProfileRecord;
  /** Pick the translation matching the active language, falling back to EN. */
  pick: (en: string | null | undefined, id: string | null | undefined) => string;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [profile, setProfile] = useState<ProfileRecord>(defaultProfile);
  const [overrides, setOverrides] = useState<CopyOverrides>({});

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const [profileData, copyRows] = await Promise.all([fetchProfile(), fetchSiteCopy()]);
      if (cancelled) return;
      if (profileData) setProfile(profileData);
      if (copyRows.length) {
        const next: CopyOverrides = {};
        for (const row of copyRows) next[row.copy_key] = { en: row.value_en, id: row.value_id };
        setOverrides(next);
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
      pick: (en, id) => (isId && id ? id : en) ?? "",
    };
  }, [language, profile, overrides]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used inside <SiteProvider>");
  return context;
}
