import { useEffect, useRef, useState } from "react";
import { LangCtx, makeLang } from "./i18n";
import { useRoute } from "./router";
import { DEFAULTS, SettingsCtx, TEXT_SCALE, loadSettings, saveSettings } from "./settings";
import type { Settings } from "./settings";
import { Footer, Header, SectionNav } from "./components/Layout";
import { ArticlePage, CategoryPage, EducationPage, GamesPage, Home, SearchPage } from "./pages/News";
import { AboutPage, ContactPage, NotFound, PrivacyPage, TermsPage } from "./pages/Info";
import { RegisterPage, ResetPage, SettingsPage, SignInPage } from "./pages/Account";

function Page({ path, query }: { path: string; query: URLSearchParams }) {
  const [, first = "", second = ""] = path.split("/");
  switch (first) {
    case "": return <Home />;
    case "news": return second ? <CategoryPage id={second} /> : <NotFound />;
    case "article": return second ? <ArticlePage slug={second} /> : <NotFound />;
    case "search": return <SearchPage key={query.get("q") ?? ""} q={query.get("q") ?? ""} />;
    case "education": return <EducationPage />;
    case "games": return <GamesPage />;
    case "about": return <AboutPage />;
    case "contact": return <ContactPage />;
    case "privacy": return <PrivacyPage />;
    case "terms": return <TermsPage />;
    case "signin": return <SignInPage />;
    case "register": return <RegisterPage />;
    case "reset": return <ResetPage />;
    case "settings": return <SettingsPage />;
    default: return <NotFound />;
  }
}

export default function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const { path, query } = useRoute();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const lang = makeLang(settings.lang);

  useEffect(() => {
    document.documentElement.lang = settings.lang;
    document.documentElement.style.fontSize = TEXT_SCALE[settings.textSize];
    saveSettings(settings);
  }, [settings]);

  // On navigation, start at the top and move focus to the new page for screen readers.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [path, query.toString()]);

  const settingsValue = {
    settings,
    update: (patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch })),
    reset: () => setSettings(DEFAULTS),
  };

  return (
    <SettingsCtx.Provider value={settingsValue}>
      <LangCtx.Provider value={lang}>
        <a
          className="skip"
          href="#main"
          onClick={(e) => {
            e.preventDefault();
            mainRef.current?.focus();
          }}
        >
          {lang.t("skip")}
        </a>
        <Header />
        <SectionNav path={path} />
        <main id="main" ref={mainRef} tabIndex={-1}>
          <Page path={path} query={query} />
        </main>
        <Footer />
      </LangCtx.Provider>
    </SettingsCtx.Provider>
  );
}
