# AGENTS.md — Spain Motorcars (landing page)

Entry point for any AI agent starting from scratch. The public site is https://spainmotorcars.vercel.app. Read this, then `README.md` (the full guide to the project structure and inventory).

## What it is
Single-page landing for a car dealer that hand-picks premium everyday cars and a few classics. Pages: `/` (Spanish), `/en/` (English), and legal pages (`aviso-legal`, `privacidad`, `cookies`) in both languages, plus `404`. No backend and no runtime dependencies: plain HTML, SCSS and vanilla JavaScript modules, bundled with **Webpack 5**, hosted on **Vercel**.

## Commands
```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build into dist/
npm run preview   # serve dist/ locally to check the result
```
Node 18+. There are no tests; check the change in the browser, in both light and dark mode, and at phone width (≤ 768px).

## Where things live
- `site.config.js` — **single source of truth** for brand, contact, social links and legal data. Use `{{phone}}`, `{{email}}`, … in HTML.
- `src/i18n/strings.js` — shared text in Spanish and English (`{{t.key}}`).
- `src/*.html` (Spanish) and `src/en/*.html` (English) — page content. Both versions must change together.
- `src/partials/` — `head`, `header`, `footer`, `cookie-banner`, inserted with `{{> name}}`.
- `src/scripts/data/cars.js` — **the inventory**. Images go in `src/assets/images/cars/` as WebP, 960 × 688 px.
- `src/scripts/modules/` — header menu, cookie banner, hero video, reveal on scroll, theme (light/dark), year.
- `src/styles/` — SCSS: tokens in `base/_variables.scss` (dark mode in the `dark-tokens` block). Components only use variables; a new colour must be defined in both modes.
- `webpack.config.js` — the list of pages. A new page needs both language templates **and** an entry there.

## Rules
1. **Placeholder data must not go live.** `site.config.js` still contains values marked `EJEMPLO` (phone, legal name, tax ID, registered address, registry data, Instagram handle). The legal pages publish those values, so they must be replaced with the real data before the site is considered published. Flag this to the owner whenever you touch contact or legal content; never invent real-looking data.
2. **Domain consistency:** the brand domain is written in two forms in the repo (`spainmotorcars` in the site URL and `spainmotorscars` in the email and the `package.json` homepage). Check with the owner which one is real before changing either.
3. **Cookies:** the banner is visual only and loads no tracking script. If analytics is added, it needs a real consent manager first.
4. **Fonts** are self-hosted (`@fontsource`). Do not add external font or script CDNs.
5. **Commits:** small, English conventional messages, **no co-author or AI attribution trailers**. Push to `main` only when asked.
6. **Language:** the site copy is Spanish with an English version; the legal texts state that the Spanish version prevails.
