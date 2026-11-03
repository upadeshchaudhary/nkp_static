import { useState } from "react";
import type { FormEvent } from "react";
import { CONFIG, useLang } from "../i18n";
import { ARTICLES, CATS, EDU_FEATURES, GAMES, articleBySlug, articlesIn, catById } from "../data";
import { go, to, useTitle } from "../router";
import { useSettings } from "../settings";
import { EducationTabs, Kicker, Quiz, SectionHead, StoryList, StoryMeta } from "../components/Widgets";
import { NotFound } from "./Info";

/* ---------- home ---------- */

export function Home() {
  const { t, b } = useLang();
  const { settings } = useSettings();
  useTitle("");

  const [lead, ...rest] = ARTICLES;
  const top = rest.slice(0, 4);
  const sections = CATS.filter((c) => c.id !== "education" && articlesIn(c.id).length > 0);

  return (
    <>
      <h1 className="sr-only">{b(CONFIG.name)}</h1>

      <div className="wrap front">
        <article className="lead">
          <Kicker cat={lead.cat} />
          <h2>
            <a href={to("/article/" + lead.slug)}>{b(lead.title)}</a>
          </h2>
          <p className="stand">{b(lead.summary)}</p>
          <StoryMeta a={lead} />
          <div className="lead-body">
            <p>{b(lead.body[0])}</p>
            <a href={to("/article/" + lead.slug)}>
              {b({ en: "Continue reading", ne: "पूरा पढ्नुहोस्" })}
              <span className="sr-only">: {b(lead.title)}</span>
            </a>
          </div>
        </article>

        <section className="top" aria-labelledby="top-h">
          <SectionHead id="top-h" title={t("top")} />
          <StoryList items={top} summary={false} />
        </section>

        <aside className="latest" aria-labelledby="latest-h">
          <SectionHead id="latest-h" title={t("latest")} />
          <ol>
            {ARTICLES.slice(0, 8).map((a) => (
              <li key={a.slug}>
                <a href={to("/article/" + a.slug)}>{b(a.title)}</a>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      {settings.showEdu && (
        <section className="band" aria-labelledby="edu-h">
          <div className="wrap">
            <SectionHead id="edu-h" title={t("education")} href={to("/education")} />
            <div className="split">
              <EducationTabs />
              <StoryList items={articlesIn("education")} kicker={false} />
            </div>
          </div>
        </section>
      )}

      <section className="band" aria-label={t("sections")}>
        <div className="wrap cat-grid">
          {sections.map((c) => (
            <div key={c.id}>
              <SectionHead title={b(c.n)} href={to("/news/" + c.id)} />
              <StoryList items={articlesIn(c.id).slice(0, 2)} kicker={false} />
            </div>
          ))}
        </div>
      </section>

      {settings.showGames && (
        <section className="band" aria-labelledby="games-h">
          <div className="wrap">
            <SectionHead id="games-h" title={t("games")} href={to("/games")} />
            <div className="split">
              <Quiz />
              <GameList />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* ---------- section page ---------- */

export function CategoryPage({ id }: { id: string }) {
  const { t, b } = useLang();
  const c = catById(id);
  useTitle(c ? b(c.n) : t("nf_h"));
  if (!c) return <NotFound />;
  const items = articlesIn(c.id);
  return (
    <div className="wrap page">
      <div className="page-head">
        <h1>{b(c.n)}</h1>
      </div>
      {items.length ? <StoryList items={items} kicker={false} /> : <p className="empty">{t("empty")}</p>}
    </div>
  );
}

/* ---------- article page ---------- */

export function ArticlePage({ slug }: { slug: string }) {
  const { t, b, fill } = useLang();
  const a = articleBySlug(slug);
  useTitle(a ? b(a.title) : t("nf_h"));
  if (!a) return <NotFound />;
  const c = catById(a.cat);
  const more = articlesIn(a.cat).filter((x) => x.slug !== a.slug);

  return (
    <div className="wrap page">
      <article className="article">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href={to("/")}>{t("home")}</a>
          <span aria-hidden="true">/</span>
          {c && <a href={to("/news/" + c.id)}>{b(c.n)}</a>}
        </nav>
        <h1>{b(a.title)}</h1>
        <p className="stand">{b(a.summary)}</p>
        <StoryMeta a={a} />
        <div className="body">
          {a.body.map((p, i) => (
            <p key={i}>{b(p)}</p>
          ))}
        </div>
        {a.sources.length > 0 && (
          <section className="sources" aria-labelledby="src-h">
            <h2 id="src-h">{t("sources")}</h2>
            <ul>
              {a.sources.map((s) => (
                <li key={s.en}>{b(s)}</li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {c && more.length > 0 && (
        <section className="related" aria-labelledby="rel-h">
          <SectionHead id="rel-h" title={fill(t("more_in"), { s: b(c.n) })} href={to("/news/" + c.id)} />
          <StoryList items={more} kicker={false} />
        </section>
      )}
    </div>
  );
}

/* ---------- search ---------- */

export function SearchPage({ q }: { q: string }) {
  const { lang, t, fill } = useLang();
  const [value, setValue] = useState(q);
  const ne = lang === "ne";
  useTitle(t("search"));

  const needle = q.trim().toLowerCase();
  const hits = needle
    ? ARTICLES.filter((a) =>
        [a.title, a.summary, ...a.body].some((x) => x.en.toLowerCase().includes(needle) || x.ne.includes(needle))
      )
    : [];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = value.trim();
    go(v ? "/search?q=" + encodeURIComponent(v) : "/search");
  };

  return (
    <div className="wrap page">
      <div className="page-head">
        <h1>{t("search")}</h1>
      </div>
      <form className="search-form" role="search" onSubmit={submit}>
        <label htmlFor="q" className="sr-only">{t("search")}</label>
        <input id="q" type="search" value={value} onChange={(e) => setValue(e.target.value)} autoComplete="off" />
        <button type="submit" className="btn">{t("search")}</button>
      </form>
      {needle && (
        <>
          <p className="result-count" role="status">
            {hits.length
              ? fill(ne ? "\"{q}\" का लागि {n} नतिजा" : "{n} results for \"{q}\"", { n: hits.length, q: q.trim() })
              : fill(ne ? "\"{q}\" का लागि कुनै नतिजा भेटिएन।" : "No results for \"{q}\".", { q: q.trim() })}
          </p>
          {hits.length > 0 && <StoryList items={hits} />}
        </>
      )}
    </div>
  );
}

/* ---------- education hub ---------- */

export function EducationPage() {
  const { t, b } = useLang();
  useTitle(t("education"));
  return (
    <div className="wrap page">
      <div className="page-head">
        <h1>{b({ en: "Education Hub", ne: "शिक्षा केन्द्र" })}</h1>
        <p className="intro">
          {b({
            en: "Study material organised by exam and subject: past papers, notes, syllabus, notices, scholarships and timed mock tests. Every resource will list its source, language and the year it applies to.",
            ne: "परीक्षा र विषयअनुसार मिलाइएको अध्ययन सामग्री: पुराना प्रश्नपत्र, नोट, पाठ्यक्रम, सूचना, छात्रवृत्ति र समयबद्ध अभ्यास परीक्षा। हरेक सामग्रीले स्रोत, भाषा र लागू हुने वर्ष देखाउनेछ।",
          })}
        </p>
      </div>
      <div className="split">
        <EducationTabs />
        <div>
          <h2 className="h-small">{b({ en: "What the hub will offer", ne: "केन्द्रमा के हुनेछ" })}</h2>
          <ul className="ticks">
            {EDU_FEATURES.map((x, i) => <li key={i}>{b(x)}</li>)}
          </ul>
        </div>
      </div>
      <section className="related" aria-labelledby="edu-news-h">
        <SectionHead id="edu-news-h" title={b({ en: "Education news and guides", ne: "शिक्षा समाचार र मार्गदर्शन" })} href={to("/news/education")} />
        <StoryList items={articlesIn("education")} kicker={false} />
      </section>
    </div>
  );
}

/* ---------- games ---------- */

export function GamesPage() {
  const { t, b } = useLang();
  useTitle(t("games"));
  return (
    <div className="wrap page">
      <div className="page-head">
        <h1>{b({ en: "Games and puzzles", ne: "खेल र पजल" })}</h1>
        <p className="intro">
          {b({
            en: "Short games that run in a phone browser. Guests can play. An account is only needed to keep history and join leaderboards.",
            ne: "फोन ब्राउजरमै चल्ने छोटा खेल। अतिथिले खेल्न सक्छन्। इतिहास राख्न र लिडरबोर्डमा भाग लिन मात्र खाता चाहिन्छ।",
          })}
        </p>
      </div>
      <div className="split">
        <Quiz />
        <GameList />
      </div>
    </div>
  );
}

function GameList() {
  const { b } = useLang();
  return (
    <ul className="plain-list">
      {GAMES.map((g) => (
        <li key={g.n.en}>
          <strong>{b(g.n)}</strong>
          <span>{b(g.d)}</span>
          <span className={g.ready ? "tag ok" : "tag"}>
            {g.ready ? b({ en: "Available", ne: "उपलब्ध" }) : b({ en: "In development", ne: "निर्माणाधीन" })}
          </span>
        </li>
      ))}
    </ul>
  );
}
