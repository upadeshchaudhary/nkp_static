import { createContext, useContext } from "react";

/* ---------- types and config ---------- */

export type Lang = "en" | "ne";
export type Bi = Record<Lang, string>;

export const CONFIG = {
  name: { en: "Nepali Knowledge Platform", ne: "नेपाली ज्ञान मञ्च" } as Bi,
  // Placeholder. Replace with the real address once the domain is set up.
  email: "contact@example.com",
};

/* ---------- interface text ---------- */

const en = {
  skip: "Skip to content",
  home: "Home",
  search: "Search",
  sign_in: "Sign in",
  register: "Create account",
  settings: "Settings",
  sections: "Sections",
  lang_label: "Language",
  education: "Education",
  games: "Games",
  top: "Top stories",
  latest: "Latest",
  more: "More",
  more_in: "More in {s}",
  empty: "No stories in this section yet.",
  sources: "Sources",
  by: "By",
  back_home: "Back to the home page",
  nf_h: "Page not found",
  nf_p: "The page you asked for does not exist or has moved.",
  f_platform: "Platform",
  f_account: "Account",
  f_legal: "Legal",
  about: "About",
  contact: "Contact",
  privacy: "Privacy policy",
  terms: "Terms and conditions",
  foot: "Education, news and games in Nepali and English.",
  foot2: "Design preview. Articles are sample content. The name and domain are not final.",
  en_only: "This page is currently available in English only.",
  quiz_title: "Daily GK quiz",
  q_of: "Question {n} of {t}",
  next: "Next question",
  finish: "See result",
  again: "Play again",
  right: "Correct.",
  wrong: "Not quite. Correct answer: ",
  score: "You scored {s} of {t}.",
};

export type Key = keyof typeof en;

const ne: Record<Key, string> = {
  skip: "मुख्य सामग्रीमा जानुहोस्",
  home: "गृहपृष्ठ",
  search: "खोज",
  sign_in: "साइन इन",
  register: "खाता खोल्नुहोस्",
  settings: "सेटिङ",
  sections: "खण्डहरू",
  lang_label: "भाषा",
  education: "शिक्षा",
  games: "खेल",
  top: "मुख्य समाचार",
  latest: "पछिल्लो",
  more: "थप",
  more_in: "{s}: थप सामग्री",
  empty: "यस खण्डमा अहिलेसम्म कुनै सामग्री छैन।",
  sources: "स्रोत",
  by: "लेखक:",
  back_home: "गृहपृष्ठमा फर्कनुहोस्",
  nf_h: "पृष्ठ भेटिएन",
  nf_p: "तपाईंले खोजेको पृष्ठ छैन वा अर्को ठाउँमा सारिएको छ।",
  f_platform: "मञ्च",
  f_account: "खाता",
  f_legal: "कानुनी",
  about: "हाम्रोबारे",
  contact: "सम्पर्क",
  privacy: "गोपनीयता नीति",
  terms: "नियम र सर्तहरू",
  foot: "नेपाली र अंग्रेजीमा शिक्षा, समाचार र खेल।",
  foot2: "डिजाइन नमुना। लेखहरू नमुना सामग्री हुन्। नाम र डोमेन अन्तिम होइनन्।",
  en_only: "यो पृष्ठ हाल अंग्रेजीमा मात्र उपलब्ध छ।",
  quiz_title: "दैनिक सामान्य ज्ञान",
  q_of: "प्रश्न {n} / {t}",
  next: "अर्को प्रश्न",
  finish: "नतिजा हेर्नुहोस्",
  again: "फेरि खेल्नुहोस्",
  right: "सही।",
  wrong: "मिलेन। सही उत्तर: ",
  score: "तपाईंले {t} मध्ये {s} अंक ल्याउनुभयो।",
};

const T: Record<Lang, Record<Key, string>> = { en, ne };

/* ---------- language context ---------- */

export interface LangValue {
  lang: Lang;
  t: (k: Key) => string;
  b: (x: Bi) => string;
  num: (n: number) => string;
  fill: (s: string, vars: Record<string, number | string>) => string;
  date: (iso: string) => string;
}

const DEVANAGARI = "०१२३४५६७८९";

export function makeLang(lang: Lang): LangValue {
  const num = (n: number) =>
    lang === "ne" ? String(n).replace(/\d/g, (d) => DEVANAGARI[Number(d)]) : String(n);
  const fmt = new Intl.DateTimeFormat(lang === "ne" ? "ne-NP" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return {
    lang,
    t: (k) => T[lang][k],
    b: (x) => x[lang],
    num,
    fill: (s, vars) =>
      s.replace(/\{(\w+)\}/g, (_m, k: string) => {
        const v = vars[k];
        return typeof v === "number" ? num(v) : v;
      }),
    // ISO dates are read as local dates so the day never shifts with the time zone.
    date: (iso) => {
      const [y, m, d] = iso.split("-").map(Number);
      return fmt.format(new Date(y, m - 1, d));
    },
  };
}

export const LangCtx = createContext<LangValue>(makeLang("en"));
export const useLang = () => useContext(LangCtx);
