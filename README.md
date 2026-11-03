# Nepali Knowledge Platform: website front end

A bilingual (Nepali and English) news and learning site. The layout follows a news portal pattern: a utility bar, a masthead, a sticky section bar, a lead story with top stories and a latest list, and a block for each section.

This is a front-end build. It has no backend yet. Articles are sample content, and the sign-in and account forms validate input but tell the user that accounts are not connected.

## Pages

| Path | Page |
| --- | --- |
| `#/` | Home |
| `#/news/<section>` | Section page (nepal, world, education, science, technology, environment, sports, explainers) |
| `#/article/<slug>` | Article |
| `#/search?q=` | Search across sample articles |
| `#/education` | Education Hub |
| `#/games` | Games, with the working daily quiz |
| `#/about` | About, trust commitments and how the newsroom uses AI |
| `#/contact` | Contact |
| `#/signin`, `#/register`, `#/reset` | Sign in, create account, reset password |
| `#/settings` | Language, text size, home page sections, account, reset |
| `#/privacy`, `#/terms` | Privacy policy, terms and conditions |

The site uses hash URLs (`#/path`) so it works on any static host without rewrite rules.

## Files

```text
index.html               Page shell, favicon link, meta description
public/favicon.svg       Favicon
src/
  main.tsx               React entry point
  App.tsx                Providers and the route switch
  i18n.ts                Name, contact email, interface text (en and ne), language helpers
  settings.ts            User settings, saved in localStorage
  router.ts              Hash router and page titles
  data.ts                Sections, sample articles, quiz, education tabs, games
  components/Layout.tsx  Header, section bar, footer
  components/Widgets.tsx Story lists, quiz, education tabs, form field
  pages/News.tsx         Home, section, article, search, education, games
  pages/Info.tsx         About, contact, 404, privacy, terms
  pages/Account.tsx      Sign in, create account, reset password, settings
  styles.css             All styling (light theme only)
```

## Setup

Node.js 18 or newer.

```bash
npm install
npm run dev      # development server
npm run build    # type check and production build into dist/
npm run preview  # serve the production build locally
```

## Before launch

Done in the code:

- [x] Favicon (`public/favicon.svg`)
- [x] Privacy policy and terms and conditions pages, linked in the footer and on the create account form
- [x] No "Made with AI" or builder tag anywhere in the site

Still to do:

- [ ] Connect the custom domain at your host and set up HTTPS
- [ ] Replace `CONFIG.email` in `src/i18n.ts` (currently `contact@example.com`) with a real address on that domain
- [ ] Have a lawyer review the privacy policy and terms against Nepali law, then update `UPDATED` in `src/pages/Info.tsx`
- [ ] Replace the sample articles in `src/data.ts` with real, edited content and remove "Articles are sample content" from `foot2` in `src/i18n.ts`
- [ ] Connect the sign-in, create account and reset forms to a real auth API (see the comment at the top of `src/pages/Account.tsx`)
- [ ] Have a native Nepali editor review the Nepali text
- [ ] Optional: add a PNG icon (`apple-touch-icon`, 180x180) for older iOS home screens

## Customising

| What | Where |
| --- | --- |
| Product name, contact email | `CONFIG` in `src/i18n.ts` |
| Interface text | `en` and `ne` in `src/i18n.ts`. `ne` is typed against `en`, so a missing translation fails the type check. |
| Articles | `RAW` in `src/data.ts`. Each one needs both languages. |
| Colours and fonts | CSS variables at the top of `src/styles.css` |
