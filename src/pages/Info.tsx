import type { ReactNode } from "react";
import { CONFIG, makeLang, useLang } from "../i18n";
import { STATUS, STEPS, TRUST } from "../data";
import { to, useTitle } from "../router";

/* ---------- about ---------- */

export function AboutPage() {
  const { t, b } = useLang();
  useTitle(t("about"));
  return (
    <div className="wrap page">
      <div className="page-head">
        <h1>{t("about")}</h1>
        <p className="intro">
          {b({
            en: "A bilingual platform for young readers in Nepal. It brings together exam resources, news and explainers, and short daily games, and is built to work on a slow phone connection.",
            ne: "नेपालका युवा पाठकका लागि द्विभाषी मञ्च। यसले परीक्षा सामग्री, समाचार र व्याख्या, र छोटा दैनिक खेललाई एउटै ठाउँमा ल्याउँछ, र ढिलो फोन इन्टरनेटमा पनि चल्ने गरी बनाइएको छ।",
          })}
        </p>
      </div>

      <section className="prose-sec" aria-labelledby="trust-h">
        <h2 id="trust-h">{b({ en: "What readers can rely on", ne: "पाठकले भर पर्न सक्ने कुरा" })}</h2>
        <ul className="ticks">
          {TRUST.map((x, i) => <li key={i}>{b(x)}</li>)}
        </ul>
      </section>

      <section className="prose-sec" aria-labelledby="ai-h">
        <h2 id="ai-h">{b({ en: "How the newsroom uses AI", ne: "न्युजरुमले एआई कसरी प्रयोग गर्छ" })}</h2>
        <p className="intro">
          {b({
            en: "The newsroom has an internal tool that gathers sources, checks claims against evidence and prepares drafts. It is not a public chatbot. A person reads the evidence and makes every publishing decision.",
            ne: "न्युजरुमसँग स्रोत जम्मा गर्ने, दाबीलाई प्रमाणसँग जाँच्ने र मस्यौदा तयार पार्ने आन्तरिक उपकरण छ। यो सार्वजनिक च्याटबोट होइन। प्रमाण पढेर हरेक प्रकाशन निर्णय मानिसले गर्छ।",
          })}
        </p>
        <div className="split">
          <div>
            <h3 className="h-small">{b({ en: "How a story is prepared", ne: "समाचार कसरी तयार हुन्छ" })}</h3>
            <ol className="steps">
              {STEPS.map((s) => (
                <li key={s.h.en}>
                  <div><b>{b(s.h)}</b><span>{b(s.d)}</span></div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <table>
              <caption>{b({ en: "Claim statuses", ne: "दाबीको अवस्था" })}</caption>
              <tbody>
                {STATUS.map((s) => (
                  <tr key={s.n.en}><th scope="row">{b(s.n)}</th><td>{b(s.d)}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="note">
              {b({
                en: "Any score the tool shows is only a way to sort work for review. It is not the chance that a claim is true.",
                ne: "उपकरणले देखाउने अङ्क समीक्षाको काम क्रमबद्ध गर्न मात्र हो। यो दाबी सत्य हुने सम्भावना होइन।",
              })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- contact ---------- */

export function ContactPage() {
  const { t, b } = useLang();
  useTitle(t("contact"));
  const rows = [
    {
      h: { en: "Corrections", ne: "सच्याइ" },
      p: {
        en: "If you find an error in an article, tell us the page and what is wrong. Corrections are added to the article with the date they were made.",
        ne: "कुनै लेखमा त्रुटि भेटे पृष्ठ र के गलत छ भन्नुहोस्। सच्याइ मितिसहित लेखमै थपिन्छ।",
      },
    },
    {
      h: { en: "Study material", ne: "अध्ययन सामग्री" },
      p: {
        en: "Teachers and schools can suggest resources. Please include the source and confirm you have the right to share it.",
        ne: "शिक्षक र विद्यालयले सामग्री सुझाव दिन सक्नुहुन्छ। स्रोत खुलाउनुहोस् र बाँड्ने अधिकार भएको पुष्टि गर्नुहोस्।",
      },
    },
    {
      h: { en: "Privacy and accounts", ne: "गोपनीयता र खाता" },
      p: {
        en: "Questions about your data or a request to delete it.",
        ne: "तपाईंको डाटाबारे प्रश्न वा मेटाउने अनुरोध।",
      },
    },
  ];
  return (
    <div className="wrap page">
      <div className="page-head">
        <h1>{t("contact")}</h1>
        <p className="intro">
          {b({ en: "Write to us at ", ne: "हामीलाई यस ठेगानामा लेख्नुहोस्: " })}
          <a href={"mailto:" + CONFIG.email}>{CONFIG.email}</a>
        </p>
      </div>
      <dl className="defs">
        {rows.map((r) => (
          <div key={r.h.en}>
            <dt>{b(r.h)}</dt>
            <dd>{b(r.p)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------- not found ---------- */

export function NotFound() {
  const { t } = useLang();
  useTitle(t("nf_h"));
  return (
    <div className="wrap page narrow">
      <h1>{t("nf_h")}</h1>
      <p className="intro">{t("nf_p")}</p>
      <p><a className="btn" href={to("/")}>{t("back_home")}</a></p>
    </div>
  );
}

/* ---------- legal ---------- */

/*
  The privacy policy and terms are a starting draft. Have them reviewed by
  a lawyer familiar with Nepali law before launch, and update UPDATED.
*/
const UPDATED = "2026-11-03";

function Legal({ title, children }: { title: string; children: ReactNode }) {
  const { lang, t } = useLang();
  useTitle(title);
  return (
    <div className="wrap page narrow">
      <h1>{title}</h1>
      {lang === "ne" && <p className="note">{t("en_only")}</p>}
      <div className="legal" lang="en">
        <p className="meta">Last updated: <time dateTime={UPDATED}>{makeLang("en").date(UPDATED)}</time></p>
        {children}
      </div>
    </div>
  );
}

export function PrivacyPage() {
  const { t } = useLang();
  const name = CONFIG.name.en;
  return (
    <Legal title={t("privacy")}>
      <p>
        This policy explains what information {name} ("we", "us") collects when you use this website, why we
        collect it and what choices you have. We follow the Individual Privacy Act, 2075 (2018) of Nepal.
      </p>

      <h2>Information we collect</h2>
      <h3>When you browse without an account</h3>
      <p>
        You can read articles, use study material and play games without an account. In that case we do not
        ask for your name or email address. Like most websites, our hosting provider records standard server
        logs, which include your IP address, browser type, the page requested and the time of the request.
      </p>
      <h3>Settings stored on your device</h3>
      <p>
        Your language, text size and home page choices are saved in your browser's local storage so they are
        remembered on your next visit. This information stays on your device and is not sent to us. You can
        clear it at any time from the Settings page or from your browser.
      </p>
      <h3>When you create an account</h3>
      <p>
        If you create an account, we collect your name, email address and a password. Passwords are stored
        only in hashed form. If you use features that need an account, we also store your saved resources,
        quiz and mock test attempts and your email preferences.
      </p>
      <h3>When you contact us</h3>
      <p>If you email us, we keep your message and address so we can reply and keep a record of the request.</p>

      <h2>Third-party services</h2>
      <p>
        This website loads fonts from Google Fonts. When your browser requests a font, Google receives your IP
        address and browser information. See Google's privacy policy for how it handles that data. We do not
        use advertising trackers.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To run the website and keep it secure.</li>
        <li>To provide account features such as saved resources and attempt history.</li>
        <li>To send emails you have chosen to receive. You can stop them at any time.</li>
        <li>To respond to corrections, questions and requests.</li>
      </ul>
      <p>We do not sell personal information.</p>

      <h2>Sharing</h2>
      <p>
        We share information only with service providers that help us run the website, such as hosting and
        email delivery, and only as far as they need it to do that work. We may disclose information when the
        law requires it.
      </p>

      <h2>How long we keep information</h2>
      <p>
        Account information is kept while your account is open. When you delete your account, we delete or
        anonymise your personal information within 30 days, except where the law requires us to keep it.
        Server logs are kept for a limited period for security purposes.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can ask to see the personal information we hold about you, ask us to correct it, or ask us to
        delete it. Email us at <a href={"mailto:" + CONFIG.email}>{CONFIG.email}</a> and we will respond within
        a reasonable time.
      </p>

      <h2>Children</h2>
      <p>
        Many of our readers are students. A person under 16 should create an account only with the permission
        of a parent or guardian. If you believe a child has given us information without that permission,
        contact us and we will delete it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we will update the date at the top of this page. For significant changes,
        we will also notify account holders by email.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to <a href={"mailto:" + CONFIG.email}>{CONFIG.email}</a>.
      </p>
    </Legal>
  );
}

export function TermsPage() {
  const { t } = useLang();
  const name = CONFIG.name.en;
  return (
    <Legal title={t("terms")}>
      <p>
        These terms apply to your use of the {name} website. By using the website you agree to them. If you do
        not agree, please do not use the website.
      </p>

      <h2>Using the website</h2>
      <p>
        You may read, study and play on the website for personal and educational use. Reading and playing do
        not require an account.
      </p>

      <h2>Accounts</h2>
      <p>
        If you create an account, give accurate details and keep your password private. You are responsible
        for activity on your account. A person under 16 should create an account only with the permission of
        a parent or guardian. We may suspend accounts that break these terms.
      </p>

      <h2>Content and licences</h2>
      <p>
        Articles and original material on this website belong to {name} unless stated otherwise. Material
        from other sources, such as past exam papers and official notices, is shown with its source and
        remains subject to its own licence. You may share links to our pages freely. Do not republish our
        articles in full without written permission.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>break the law or infringe anyone's rights while using the website;</li>
        <li>try to gain access to accounts, systems or data that are not yours;</li>
        <li>interfere with the website, including by automated scraping that puts load on it;</li>
        <li>use games or leaderboards dishonestly, for example with scripts or shared answers.</li>
      </ul>

      <h2>Accuracy and corrections</h2>
      <p>
        We work to make our articles and study material accurate, and we show sources and corrections.
        Exam dates, results, notices and scholarship details can change, so always confirm them with the
        official body before you act on them.
      </p>

      <h2>Games</h2>
      <p>Games and quizzes are for learning and fun. They do not involve money, payments or prizes.</p>

      <h2>Links to other websites</h2>
      <p>
        We link to official and other external websites. We are not responsible for their content or their
        privacy practices.
      </p>

      <h2>Liability</h2>
      <p>
        The website is provided as it is. As far as the law allows, we are not liable for loss that results
        from relying on information on the website or from the website being unavailable.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms. The date at the top of this page shows when they last changed. Continuing
        to use the website after a change means you accept the updated terms.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of Nepal.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={"mailto:" + CONFIG.email}>{CONFIG.email}</a>.
      </p>
    </Legal>
  );
}
