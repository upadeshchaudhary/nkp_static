import { CONFIG, useLang } from "../i18n";
import type { Bi, Key } from "../i18n";
import { CATS } from "../data";
import { to } from "../router";
import { useSettings } from "../settings";

export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 22 22" aria-hidden="true">
      <path d="M2 20 L9 6 L12.5 13 L15 9 L20 20 Z" fill="#B3202D" />
      <path d="M9 6 L10.6 9.2 L7.8 9.2 Z" fill="#fff" />
    </svg>
  );
}

function today() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function Header() {
  const { lang, t, b, date } = useLang();
  const { update } = useSettings();
  return (
    <header className="site">
      <div className="util">
        <div className="wrap util-in">
          <span className="today">{date(today())}</span>
          <div className="util-links">
            <a href={to("/search")}>
              <svg viewBox="0 0 16 16" aria-hidden="true" className="ico">
                <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M10.6 10.6 L14.5 14.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              {t("search")}
            </a>
            <div className="lang" role="group" aria-label={t("lang_label")}>
              <button type="button" lang="en" aria-pressed={lang === "en"} onClick={() => update({ lang: "en" })}>
                English
              </button>
              <button type="button" lang="ne" aria-pressed={lang === "ne"} onClick={() => update({ lang: "ne" })}>
                नेपाली
              </button>
            </div>
            <a href={to("/settings")}>{t("settings")}</a>
            <a className="signin" href={to("/signin")}>{t("sign_in")}</a>
          </div>
        </div>
      </div>
      <div className="wrap mast">
        <a className="brand" href={to("/")}>
          <Mark />
          <span>{b(CONFIG.name)}</span>
        </a>
      </div>
    </header>
  );
}

const NAV: { path: string; n: Bi | Key }[] = [
  { path: "/", n: "home" },
  ...CATS.filter((c) => c.id !== "education").map((c) => ({ path: "/news/" + c.id, n: c.n })),
  { path: "/education", n: "education" },
  { path: "/games", n: "games" },
];

export function SectionNav({ path }: { path: string }) {
  const { t, b } = useLang();
  return (
    <nav className="sections" aria-label={t("sections")}>
      <div className="wrap">
        <ul>
          {NAV.map((x) => {
            const current = x.path === "/" ? path === "/" : path === x.path || path.startsWith(x.path + "/");
            return (
              <li key={x.path}>
                <a href={to(x.path)} aria-current={current ? "page" : undefined}>
                  {typeof x.n === "string" ? t(x.n) : b(x.n)}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export function Footer() {
  const { t, b, num } = useLang();
  return (
    <footer className="site">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <a className="brand" href={to("/")}>
            <Mark />
            <span>{b(CONFIG.name)}</span>
          </a>
          <p>{t("foot")}</p>
        </div>
        <div>
          <h2>{t("sections")}</h2>
          <ul>
            {CATS.map((c) => (
              <li key={c.id}><a href={to("/news/" + c.id)}>{b(c.n)}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{t("f_platform")}</h2>
          <ul>
            <li><a href={to("/education")}>{t("education")}</a></li>
            <li><a href={to("/games")}>{t("games")}</a></li>
            <li><a href={to("/about")}>{t("about")}</a></li>
            <li><a href={to("/contact")}>{t("contact")}</a></li>
          </ul>
        </div>
        <div>
          <h2>{t("f_account")}</h2>
          <ul>
            <li><a href={to("/signin")}>{t("sign_in")}</a></li>
            <li><a href={to("/register")}>{t("register")}</a></li>
            <li><a href={to("/settings")}>{t("settings")}</a></li>
          </ul>
        </div>
        <div>
          <h2>{t("f_legal")}</h2>
          <ul>
            <li><a href={to("/privacy")}>{t("privacy")}</a></li>
            <li><a href={to("/terms")}>{t("terms")}</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap foot-base">
        <span>&copy; {num(new Date().getFullYear())} {b(CONFIG.name)}</span>
        <span>{t("foot2")}</span>
      </div>
    </footer>
  );
}
