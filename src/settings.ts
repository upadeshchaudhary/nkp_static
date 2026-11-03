import { createContext, useContext } from "react";
import type { Lang } from "./i18n";

export type TextSize = "normal" | "large" | "larger";

export interface Settings {
  lang: Lang;
  textSize: TextSize;
  showEdu: boolean;
  showGames: boolean;
}

export const DEFAULTS: Settings = {
  lang: "en",
  textSize: "normal",
  showEdu: true,
  showGames: true,
};

export const TEXT_SCALE: Record<TextSize, string> = {
  normal: "100%",
  large: "112.5%",
  larger: "125%",
};

const STORE_KEY = "settings";

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const v = JSON.parse(raw) as Partial<Settings>;
      return {
        lang: v.lang === "ne" ? "ne" : "en",
        textSize: v.textSize && v.textSize in TEXT_SCALE ? v.textSize : DEFAULTS.textSize,
        showEdu: typeof v.showEdu === "boolean" ? v.showEdu : DEFAULTS.showEdu,
        showGames: typeof v.showGames === "boolean" ? v.showGames : DEFAULTS.showGames,
      };
    }
    // Earlier versions stored only the language under "lang".
    const old = localStorage.getItem("lang");
    if (old === "ne" || old === "en") return { ...DEFAULTS, lang: old };
  } catch {
    /* storage unavailable or bad JSON */
  }
  return DEFAULTS;
}

export function saveSettings(s: Settings) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(s));
    localStorage.removeItem("lang");
  } catch {
    /* storage unavailable */
  }
}

export interface SettingsValue {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  reset: () => void;
}

export const SettingsCtx = createContext<SettingsValue>({
  settings: DEFAULTS,
  update: () => {},
  reset: () => {},
});
export const useSettings = () => useContext(SettingsCtx);
