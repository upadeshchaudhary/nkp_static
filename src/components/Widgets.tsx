import { useEffect, useId, useRef, useState } from "react";
import type { InputHTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { useLang } from "../i18n";
import { QUIZ, TABS, catById } from "../data";
import type { Article } from "../data";
import { to } from "../router";

/* ---------- story pieces ---------- */

export function Kicker({ cat }: { cat: string }) {
  const { b } = useLang();
  const c = catById(cat);
  if (!c) return null;
  return (
    <a className="kicker" href={to("/news/" + c.id)}>
      {b(c.n)}
    </a>
  );
}

export function StoryMeta({ a }: { a: Article }) {
  const { b, date } = useLang();
  return (
    <p className="meta">
      <span>{b(a.desk)}</span>
      <time dateTime={a.date}>{date(a.date)}</time>
    </p>
  );
}

/* A plain headline list used on the home, section, search and article pages. */
export function StoryList({ items, kicker = true, summary = true }: { items: Article[]; kicker?: boolean; summary?: boolean }) {
  const { b } = useLang();
  return (
    <ul className="story-list">
      {items.map((a) => (
        <li key={a.slug}>
          {kicker && <Kicker cat={a.cat} />}
          <h3>
            <a href={to("/article/" + a.slug)}>{b(a.title)}</a>
          </h3>
          {summary && <p className="sum">{b(a.summary)}</p>}
          <StoryMeta a={a} />
        </li>
      ))}
    </ul>
  );
}

export function SectionHead({ title, href, id }: { title: string; href?: string; id?: string }) {
  const { t } = useLang();
  return (
    <div className="sec-head">
      <h2 id={id}>{title}</h2>
      {href && <a href={href}>{t("more")}</a>}
    </div>
  );
}

/* ---------- daily quiz ---------- */

export function Quiz() {
  const { b, t, fill } = useLang();
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (picked !== null) nextRef.current?.focus();
  }, [picked]);

  const cur = QUIZ[i];
  const last = i === QUIZ.length - 1;

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === cur.a) setScore((s) => s + 1);
  };
  const advance = () => {
    if (last) setDone(true);
    else {
      setI(i + 1);
      setPicked(null);
    }
  };
  const restart = () => {
    setI(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  };

  return (
    <div className="quiz" role="region" aria-labelledby="quizTitle">
      <div className="quiz-head">
        <h2 id="quizTitle">{t("quiz_title")}</h2>
        {!done && <span>{fill(t("q_of"), { n: i + 1, t: QUIZ.length })}</span>}
      </div>
      {done ? (
        <>
          <p className="score">{fill(t("score"), { s: score, t: QUIZ.length })}</p>
          <button type="button" className="btn" onClick={restart}>
            {t("again")}
          </button>
        </>
      ) : (
        <>
          <p className="q">{b(cur.q)}</p>
          <ul className="opts">
            {cur.o.map((o, idx) => {
              let cls = "";
              if (picked !== null) {
                if (idx === cur.a) cls = "ok";
                else if (idx === picked) cls = "bad";
              }
              return (
                <li key={idx}>
                  <button type="button" className={cls} disabled={picked !== null} onClick={() => choose(idx)}>
                    {b(o)}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className={picked === null ? "fb" : picked === cur.a ? "fb ok" : "fb bad"} aria-live="polite">
            {picked === null ? "" : picked === cur.a ? t("right") : t("wrong") + b(cur.o[cur.a])}
          </p>
          {picked !== null && (
            <button type="button" className="btn" ref={nextRef} onClick={advance}>
              {last ? t("finish") : t("next")}
            </button>
          )}
        </>
      )}
    </div>
  );
}

/* ---------- exam programme tabs ---------- */

export function EducationTabs() {
  const { b, lang } = useLang();
  const [tab, setTab] = useState(0);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (tab + d + TABS.length) % TABS.length;
    setTab(next);
    requestAnimationFrame(() => document.getElementById("tab-" + TABS[next].id)?.focus());
  };

  const active = TABS[tab];
  return (
    <div>
      <div className="tabs" role="tablist" aria-label={lang === "ne" ? "परीक्षा कार्यक्रम" : "Exam programmes"}>
        {TABS.map((x, idx) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            id={"tab-" + x.id}
            aria-selected={idx === tab}
            aria-controls="panel"
            tabIndex={idx === tab ? 0 : -1}
            onClick={() => setTab(idx)}
            onKeyDown={onKey}
          >
            {b(x.n)}
          </button>
        ))}
      </div>
      <div className="panel" id="panel" role="tabpanel" tabIndex={0} aria-labelledby={"tab-" + active.id}>
        <h3>{b(active.h)}</h3>
        <p>{b(active.p)}</p>
      </div>
    </div>
  );
}

/* ---------- forms ---------- */

export function Field({
  label,
  error,
  hint,
  ...input
}: { label: string; error?: string; hint?: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const describedBy = [hint ? id + "-h" : "", error ? id + "-e" : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint && <p className="hint" id={id + "-h"}>{hint}</p>}
      <input id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...input} />
      {error && <p className="err" id={id + "-e"}>{error}</p>}
    </div>
  );
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
