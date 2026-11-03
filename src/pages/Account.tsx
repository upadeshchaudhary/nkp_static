import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useLang } from "../i18n";
import type { Bi } from "../i18n";
import { to, useTitle } from "../router";
import { useSettings } from "../settings";
import type { TextSize } from "../settings";
import { EMAIL_RE, Field } from "../components/Widgets";

/*
  The account forms validate input but have no server behind them yet.
  On a valid submit they say so plainly instead of pretending to succeed.
  Replace the `notConnected` step with the real API call.
*/

const NOT_CONNECTED: Bi = {
  en: "Accounts are not available yet. Nothing was sent: this site does not have an account server connected.",
  ne: "खाता सुविधा अहिले उपलब्ध छैन। केही पनि पठाइएको छैन: यो साइटमा खाता सर्भर जोडिएको छैन।",
};

const E = {
  email: { en: "Enter an email address, like name@example.com.", ne: "name@example.com जस्तो इमेल ठेगाना लेख्नुहोस्।" },
  pass: { en: "Enter your password.", ne: "पासवर्ड लेख्नुहोस्।" },
  short: { en: "Use at least 8 characters.", ne: "कम्तीमा ८ अक्षर प्रयोग गर्नुहोस्।" },
  match: { en: "The passwords do not match.", ne: "पासवर्ड मिलेन।" },
  name: { en: "Enter your name.", ne: "आफ्नो नाम लेख्नुहोस्।" },
  agree: { en: "You need to accept the terms to create an account.", ne: "खाता खोल्न नियम र सर्तहरू स्वीकार गर्नुपर्छ।" },
};

type Errors = Record<string, Bi | undefined>;

function AuthShell({ title, children }: { title: string; children: ReactNode }) {
  useTitle(title);
  return (
    <div className="wrap page">
      <div className="auth">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

function focusFirstError(form: HTMLFormElement) {
  requestAnimationFrame(() => form.querySelector<HTMLInputElement>("[aria-invalid='true']")?.focus());
}

/* ---------- sign in ---------- */

export function SignInPage() {
  const { t, b } = useLang();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<Errors>({});
  const [status, setStatus] = useState<Bi | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {
      email: EMAIL_RE.test(email.trim()) ? undefined : E.email,
      pass: pass ? undefined : E.pass,
    };
    setErr(next);
    if (next.email || next.pass) {
      setStatus(null);
      focusFirstError(e.currentTarget);
      return;
    }
    setStatus(NOT_CONNECTED);
  };

  const e = (k: string) => (err[k] ? b(err[k] as Bi) : undefined);

  return (
    <AuthShell title={t("sign_in")}>
      <form onSubmit={submit} noValidate>
        <Field label={b({ en: "Email address", ne: "इमेल ठेगाना" })} type="email" autoComplete="email" value={email} onChange={(x) => setEmail(x.target.value)} error={e("email")} />
        <Field label={b({ en: "Password", ne: "पासवर्ड" })} type={show ? "text" : "password"} autoComplete="current-password" value={pass} onChange={(x) => setPass(x.target.value)} error={e("pass")} />
        <label className="check">
          <input type="checkbox" checked={show} onChange={(x) => setShow(x.target.checked)} />
          {b({ en: "Show password", ne: "पासवर्ड देखाउनुहोस्" })}
        </label>
        <button type="submit" className="btn wide">{t("sign_in")}</button>
        {status && <p className="note" role="status">{b(status)}</p>}
      </form>
      <div className="auth-links">
        <a href={to("/reset")}>{b({ en: "Forgot your password?", ne: "पासवर्ड बिर्सनुभयो?" })}</a>
        <p>
          {b({ en: "New here? ", ne: "नयाँ हुनुहुन्छ? " })}
          <a href={to("/register")}>{t("register")}</a>
        </p>
      </div>
    </AuthShell>
  );
}

/* ---------- create account ---------- */

export function RegisterPage() {
  const { t, b } = useLang();
  const [f, setF] = useState({ name: "", email: "", pass: "", pass2: "", agree: false });
  const [err, setErr] = useState<Errors>({});
  const [status, setStatus] = useState<Bi | null>(null);
  const set = (k: keyof typeof f, v: string | boolean) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {
      name: f.name.trim() ? undefined : E.name,
      email: EMAIL_RE.test(f.email.trim()) ? undefined : E.email,
      pass: f.pass.length >= 8 ? undefined : E.short,
      pass2: f.pass2 === f.pass ? undefined : E.match,
      agree: f.agree ? undefined : E.agree,
    };
    setErr(next);
    if (Object.values(next).some(Boolean)) {
      setStatus(null);
      focusFirstError(e.currentTarget);
      return;
    }
    setStatus(NOT_CONNECTED);
  };

  const e = (k: string) => (err[k] ? b(err[k] as Bi) : undefined);

  return (
    <AuthShell title={t("register")}>
      <p className="intro">
        {b({
          en: "You do not need an account to read or play. An account lets you save resources, keep your quiz history and choose email updates.",
          ne: "पढ्न वा खेल्न खाता चाहिँदैन। खाताले सामग्री सुरक्षित राख्न, क्विजको इतिहास राख्न र इमेल अपडेट रोज्न दिन्छ।",
        })}
      </p>
      <form onSubmit={submit} noValidate>
        <Field label={b({ en: "Full name", ne: "पूरा नाम" })} autoComplete="name" value={f.name} onChange={(x) => set("name", x.target.value)} error={e("name")} />
        <Field label={b({ en: "Email address", ne: "इमेल ठेगाना" })} type="email" autoComplete="email" value={f.email} onChange={(x) => set("email", x.target.value)} error={e("email")} />
        <Field
          label={b({ en: "Password", ne: "पासवर्ड" })}
          hint={b({ en: "At least 8 characters.", ne: "कम्तीमा ८ अक्षर।" })}
          type="password"
          autoComplete="new-password"
          value={f.pass}
          onChange={(x) => set("pass", x.target.value)}
          error={e("pass")}
        />
        <Field label={b({ en: "Confirm password", ne: "पासवर्ड फेरि लेख्नुहोस्" })} type="password" autoComplete="new-password" value={f.pass2} onChange={(x) => set("pass2", x.target.value)} error={e("pass2")} />
        <div className="field">
          <label className="check">
            <input type="checkbox" checked={f.agree} onChange={(x) => set("agree", x.target.checked)} aria-invalid={err.agree ? true : undefined} aria-describedby={err.agree ? "agree-e" : undefined} />
            <span>
              {b({ en: "I accept the ", ne: "म " })}
              <a href={to("/terms")}>{t("terms")}</a>
              {b({ en: " and have read the ", ne: " स्वीकार गर्छु र " })}
              <a href={to("/privacy")}>{t("privacy")}</a>
              {b({ en: ".", ne: " पढेको छु।" })}
            </span>
          </label>
          {err.agree && <p className="err" id="agree-e">{b(err.agree)}</p>}
        </div>
        <button type="submit" className="btn wide">{t("register")}</button>
        {status && <p className="note" role="status">{b(status)}</p>}
      </form>
      <div className="auth-links">
        <p>
          {b({ en: "Already have an account? ", ne: "खाता छ? " })}
          <a href={to("/signin")}>{t("sign_in")}</a>
        </p>
      </div>
    </AuthShell>
  );
}

/* ---------- reset password ---------- */

export function ResetPage() {
  const { b } = useLang();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<Bi | undefined>();
  const [status, setStatus] = useState<Bi | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bad = EMAIL_RE.test(email.trim()) ? undefined : E.email;
    setErr(bad);
    if (bad) {
      setStatus(null);
      focusFirstError(e.currentTarget);
      return;
    }
    setStatus(NOT_CONNECTED);
  };

  return (
    <AuthShell title={b({ en: "Reset your password", ne: "पासवर्ड रिसेट गर्नुहोस्" })}>
      <p className="intro">
        {b({
          en: "Enter the email address you used for your account and we will send you a link to set a new password.",
          ne: "खातामा प्रयोग गरेको इमेल ठेगाना लेख्नुहोस्। नयाँ पासवर्ड राख्ने लिङ्क पठाइनेछ।",
        })}
      </p>
      <form onSubmit={submit} noValidate>
        <Field label={b({ en: "Email address", ne: "इमेल ठेगाना" })} type="email" autoComplete="email" value={email} onChange={(x) => setEmail(x.target.value)} error={err ? b(err) : undefined} />
        <button type="submit" className="btn wide">{b({ en: "Send reset link", ne: "रिसेट लिङ्क पठाउनुहोस्" })}</button>
        {status && <p className="note" role="status">{b(status)}</p>}
      </form>
      <div className="auth-links">
        <a href={to("/signin")}>{b({ en: "Back to sign in", ne: "साइन इनमा फर्कनुहोस्" })}</a>
      </div>
    </AuthShell>
  );
}

/* ---------- settings ---------- */

const SIZES: { v: TextSize; n: Bi }[] = [
  { v: "normal", n: { en: "Standard", ne: "सामान्य" } },
  { v: "large", n: { en: "Large", ne: "ठूलो" } },
  { v: "larger", n: { en: "Larger", ne: "अझ ठूलो" } },
];

export function SettingsPage() {
  const { t, b } = useLang();
  const { settings, update, reset } = useSettings();
  const [saved, setSaved] = useState<Bi | null>(null);
  useTitle(t("settings"));

  const change = (patch: Parameters<typeof update>[0]) => {
    update(patch);
    setSaved({ en: "Saved on this device.", ne: "यो उपकरणमा सुरक्षित भयो।" });
  };

  return (
    <div className="wrap page narrow">
      <h1>{t("settings")}</h1>
      <p className="intro">
        {b({
          en: "Changes apply straight away and are saved in this browser.",
          ne: "परिवर्तन तुरुन्तै लागू हुन्छन् र यही ब्राउजरमा सुरक्षित रहन्छन्।",
        })}
      </p>

      <form className="settings" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend>{t("lang_label")}</legend>
          <label className="check">
            <input type="radio" name="lang" checked={settings.lang === "en"} onChange={() => change({ lang: "en" })} />
            <span lang="en">English</span>
          </label>
          <label className="check">
            <input type="radio" name="lang" checked={settings.lang === "ne"} onChange={() => change({ lang: "ne" })} />
            <span lang="ne">नेपाली</span>
          </label>
        </fieldset>

        <fieldset>
          <legend>{b({ en: "Text size", ne: "अक्षरको आकार" })}</legend>
          {SIZES.map((s) => (
            <label className="check" key={s.v}>
              <input type="radio" name="size" checked={settings.textSize === s.v} onChange={() => change({ textSize: s.v })} />
              {b(s.n)}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>{b({ en: "Home page", ne: "गृहपृष्ठ" })}</legend>
          <label className="check">
            <input type="checkbox" checked={settings.showEdu} onChange={(e) => change({ showEdu: e.target.checked })} />
            {b({ en: "Show the Education section", ne: "शिक्षा खण्ड देखाउनुहोस्" })}
          </label>
          <label className="check">
            <input type="checkbox" checked={settings.showGames} onChange={(e) => change({ showGames: e.target.checked })} />
            {b({ en: "Show the Games section", ne: "खेल खण्ड देखाउनुहोस्" })}
          </label>
        </fieldset>

        <p className="saved" role="status">{saved ? b(saved) : ""}</p>
      </form>

      <section className="settings-block" aria-labelledby="acct-h">
        <h2 id="acct-h">{t("f_account")}</h2>
        <p>
          {b({
            en: "You are not signed in. With an account you will be able to manage saved resources, quiz history and email updates here.",
            ne: "तपाईं साइन इन हुनुभएको छैन। खाता भएपछि सुरक्षित सामग्री, क्विज इतिहास र इमेल अपडेट यहीँबाट मिलाउन सक्नुहुनेछ।",
          })}
        </p>
        <p className="actions">
          <a className="btn" href={to("/signin")}>{t("sign_in")}</a>
          <a className="btn alt" href={to("/register")}>{t("register")}</a>
        </p>
      </section>

      <section className="settings-block" aria-labelledby="data-h">
        <h2 id="data-h">{b({ en: "Data on this device", ne: "यो उपकरणमा रहेको डाटा" })}</h2>
        <p>
          {b({
            en: "These settings are stored only in this browser. Resetting returns everything to the defaults.",
            ne: "यी सेटिङ यही ब्राउजरमा मात्र सुरक्षित छन्। रिसेट गर्दा सबै पूर्वनिर्धारित अवस्थामा फर्कन्छ।",
          })}
        </p>
        <p className="actions">
          <button
            type="button"
            className="btn alt"
            onClick={() => {
              reset();
              setSaved({ en: "Settings reset to the defaults.", ne: "सेटिङ पूर्वनिर्धारित अवस्थामा फर्कियो।" });
            }}
          >
            {b({ en: "Reset settings", ne: "सेटिङ रिसेट गर्नुहोस्" })}
          </button>
        </p>
      </section>
    </div>
  );
}
