# Mohammed Ahmed — Portfolio

A premium, production-ready personal portfolio for **Mohammed Ahmed**, Computer
Engineer & IT Support Engineer. Built with React, Vite, Tailwind CSS and
Framer Motion — fully bilingual (English / Arabic with RTL), light & dark
mode, and no backend required.

## Tech stack

- **React 18** + **Vite 5** — fast dev server & optimized production build
- **Tailwind CSS 3** — utility-first styling, custom design tokens (colors, fonts, shadows, keyframes)
- **Framer Motion** — scroll reveals, hover/tilt effects, page transitions
- **lucide-react** — icon set
- Plain `fetch` for the contact form (or a zero-config `mailto:` fallback — see below)

No React Router (it's a single scrolling page with anchor navigation), no
CMS, no server — just a static site you can deploy anywhere.

## Getting started

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

Requires Node.js 18+.

## Project structure

```
src/
  components/
    layout/       # Navbar, MobileDrawer, Footer, ThemeToggle, LanguageSwitch, BackToTop
    sections/      # Hero, About, Experience, Skills, Lab, Projects, Certificates, Contact
    ui/            # Reusable pieces: Button, Badge, ProgressBar, ProjectCard, ThumbnailArt...
  context/
    ThemeContext.jsx     # dark/light mode, persisted + system-preference aware
  i18n/
    en.json / ar.json    # ALL translatable copy lives here
    LanguageContext.jsx  # language state, RTL switching, persistence, browser detection
  data/
    projects.js, skills.js, certificates.js, lab.js, experience.js, socials.js
    # structural (non-translated) data: links, tech tags, icons, dates
  hooks/
    useTypewriter.js, useCountUp.js, useActiveSection.js
public/
  resume/Mohammed-Ahmed-CV.pdf   # the file the "Download CV" button links to
  favicon.svg, og-cover.svg
scripts/
  generate_resume.py             # regenerates the CV PDF from its own content (Python + reportlab)
```

## Content & translations

Almost all visible text lives in **`src/i18n/en.json`** and **`src/i18n/ar.json`**,
with the same key structure in both files. To change any copy (bio, section
titles, project descriptions, form labels, etc.), edit both files — the
`t('some.key')` helper (from `useLanguage()`) reads whichever language is
active, instantly, no page reload.

Structural data that's the same across languages (proper nouns, links, icons,
percentages, dates) lives in `src/data/*.js`. Project/certificate **titles and
descriptions** are still translated — they're looked up from the i18n files
by `id` (e.g. `projectsSection.items.windows-server-lab.title`).

Language detection order: saved preference in `localStorage` → browser
language → English default. Theme detection: saved preference → OS-level
`prefers-color-scheme` → dark by default.

## The contact form

The form validates every field client-side (name, email format, subject,
message length) with no dependencies. For actually delivering messages, it
supports two modes, controlled by `.env`:

1. **With a backend** — set `VITE_CONTACT_ENDPOINT` (e.g. a
   [Formspree](https://formspree.io) endpoint or your own serverless
   function) to a URL that accepts `POST { name, email, subject, message }`.
2. **With no backend (default)** — if `VITE_CONTACT_ENDPOINT` is empty, the
   form falls back to opening the visitor's email client via `mailto:` with
   the message pre-filled, so it works with zero configuration.

Copy `.env.example` to `.env` to configure this.

## Personalize before publishing

The site is fully functional out of the box, but a few things are
intentionally placeholders since this was generated without your real
assets — swap these in before going live:

- **Photos** — drop your real photos at `public/profile.jpg` (hero) and
  `public/profile-about.jpg` (about section). Until you do, an elegant
  generated initials avatar is shown automatically — no code changes needed.
- **Resume** — `public/resume/Mohammed-Ahmed-CV.pdf` is a real, working PDF
  generated from placeholder contact details. Edit the constants at the top
  of `scripts/generate_resume.py` and re-run `python3 scripts/generate_resume.py`
  (requires `pip install -r scripts/requirements.txt`), or just replace the
  file with your own PDF directly.
- **Contact details & social links** — edit `src/data/socials.js` (email,
  phone, LinkedIn, GitHub).
- **Project & certificate links** — edit the `links` / `verifyUrl` fields in
  `src/data/projects.js` and `src/data/certificates.js` with your real
  repositories, live demos and credential verification pages.
- **Domain** — update the canonical URL and Open Graph tags in `index.html`.

## Deployment

It's a static site — the `npm run build` output in `dist/` can be deployed
to Vercel, Netlify, GitHub Pages, Cloudflare Pages, or any static host.
Remember to set `VITE_CONTACT_ENDPOINT` / `VITE_CONTACT_EMAIL` as environment
variables on your host if you're using them.
