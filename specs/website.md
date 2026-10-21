# SPEC — IBRNP Public Website

**Version:** v1
**Status:** v1 implemented in [`website/`](../website/) (see §14)
**Last updated:** 2026-10-19 (rev. 4)

---

## 1. Overview

The public website of **Iglesia Bautista Reformada Nuevo Pacto (IBRNP)**, a confessional Reformed Baptist church holding to the **Second London Baptist Confession of Faith (1689)**.

The site lets anyone learn who the church is, what it believes, its history, how it worships, and when and where to visit. It also hosts the church's sermons, the full text of the 1689 Confession and catechism, and other teaching resources. It is **bilingual (Spanish / English)**. In v1 content lives as files in this repository (no admin panel; see §7).

The tone is **serious, historic and confessional**: not a "modern" church site. The design should feel like a historic seminary and like a carefully printed edition of the Confession, not like a startup landing page.

> Related: the internal video tool is specified in [`video-editor.md`](video-editor.md). See §10 for how the two connect.

---

## 2. Goals & Non-Goals

### Goals (v1)
- Visitors can quickly find service times, address and what to expect at a service.
- The church's identity, doctrine, history and leadership are clearly presented.
- The 1689 Confession and the catechism are available in full, in a comfortable reading format, in both languages.
- Sermons are published and browsable by book of the Bible, series, preacher and date.
- All content is structured (sermons, events, Confession, catechism, …) so an admin panel can be added later without reworking the site.
- The site is fast, accessible and readable for older visitors.

### Non-Goals (v1)
- An admin panel / CMS (planned for v2, see §12).
- Online giving / payment processing.
- Member-only areas, member directory, logins for non-staff.
- Live streaming infrastructure (an external embed link is enough).
- Comments, forums, social feeds or chat widgets.
- Mobile app.

---

## 3. Audience

| Audience | What they need |
|---|---|
| **First-time visitor** (local, often from an evangelical background) | Service times, location, what a service looks like, what "Reformed Baptist" means |
| **Doctrinally curious** (found the site by searching "1689", "bautista reformada") | Confession, statement of faith, sermons, resources |
| **Members** | Sermons, calendar, catechism, announcements |
| **English-speaking visitors** (missionaries, visiting believers, sister churches) | Same content in English |
| **Content maintainers** (v1: whoever maintains the repo) | Clear, documented content files that are easy to add to and edit |

Assume many readers are **older** and on phones: body text must be large and high-contrast.

---

## 4. Site Map & Pages

Spanish is the default language. English lives under `/en`. Every page has a language switch that goes to the **same page** in the other language (not to the home page).

| # | Page | ES route | EN route | Design mode |
|---|---|---|---|---|
| 1 | Home | `/` | `/en` | Institutional |
| 2 | About us | `/quienes-somos` | `/en/about` | Institutional |
| 3 | Leadership | `/quienes-somos/liderazgo` | `/en/about/leadership` | Institutional |
| 4 | Our history | `/historia` | `/en/history` | Institutional |
| 5 | What we believe (overview) | `/creemos` | `/en/beliefs` | Reading |
| 6 | 1689 Confession | `/creemos/confesion-1689` | `/en/beliefs/1689-confession` | Reading |
| 7 | Confession chapter | `/creemos/confesion-1689/:capitulo` | `/en/beliefs/1689-confession/:chapter` | Reading |
| 8 | Catechism | `/creemos/catecismo` | `/en/beliefs/catechism` | Reading |
| 8b | Catechism question | `/creemos/catecismo/:n` | `/en/beliefs/catechism/:n` | Reading |
| 9 | Church covenant | `/creemos/pacto-de-iglesia` | `/en/beliefs/church-covenant` | Reading |
| 10 | The Gospel | `/el-evangelio` | `/en/the-gospel` | Reading |
| 11 | Our worship / What to expect | `/nuestro-culto` | `/en/worship` | Institutional |
| 12 | Sermons (archive) | `/sermones` | `/en/sermons` | Institutional |
| 13 | Sermon detail | `/sermones/:slug` | `/en/sermons/:slug` | Institutional |
| 14 | Sermon series | `/sermones/series/:slug` | `/en/sermons/series/:slug` | Institutional |
| 15 | Resources | `/recursos` | `/en/resources` | Institutional |
| 16 | Article / resource detail | `/recursos/:slug` | `/en/resources/:slug` | Reading |
| 17 | Activities & calendar | `/actividades` | `/en/activities` | Institutional |
| 18 | Visit us / Contact | `/visitenos` | `/en/visit` | Institutional |
| 18b | Search | `/buscar` | `/en/search` | Institutional |
| 19 | Privacy policy | `/privacidad` | `/en/privacy` | Reading |
| 20 | 404 | — | — | Institutional |

### 4.1 Page contents

**Home**
- Hero (navy): seal, church name, one line of identity ("Una iglesia bautista reformada y confesional"), service times, address, a "Visítenos" button.
- Scripture verse band.
- "Quiénes somos" short summary → link.
- Latest sermon (title, passage, preacher, date, play button).
- Three doctrinal entry points: *La Confesión de 1689*, *El Catecismo*, *El Evangelio*.
- Upcoming activities (next 3).
- Map + contact strip.

**About us**: identity statement; what "Reformed", "Baptist" and "Confessional" mean (short, one paragraph each); church covenant link; membership (how to become a member, as text only).

**Leadership**: elders (pastors) and deacons, each with name, office, photo (optional, navy duotone) and short bio. Explains the biblical basis for a plurality of elders (1 Ti 3; Tit 1).

**History**: a vertical timeline in two parts:
1. *Our heritage*: 1644 First London Confession → 1677/1689 Second London Confession → Philadelphia Confession (1742) → recovery of the 1689 in the 20th century.
2. *Our church*: founding and the milestones of IBRNP (mock content until provided).

**What we believe (overview)**: summary statement of faith in short headed sections (Scripture, God, Christ, salvation by grace, the church, the ordinances, the Lord's Day, last things), with references into the Confession chapters. Includes short explainers on **1689 Federalism / the New Covenant**, the **doctrines of grace**, the **regulative principle of worship** and **believer's baptism**.

**1689 Confession**: table of contents with all 32 chapters; each chapter on its own page (see §6.3 for reading features).

**Catechism**: Benjamin Beddome's *A Scriptural Exposition of the Baptist Catechism* (1752). Each of the main questions and answers of the Baptist Catechism is followed by Beddome's sub-questions, which are answered with Scripture. Every question is anchorable (`#p-12`).

**The Gospel**: a clear, standalone, plain-language gospel presentation with Scripture references. No marketing tone.

**Our worship**: order of service; expository preaching; singing of psalms and hymns; the Lord's Supper (twice a month; exact Sundays not fixed yet, so the page says "dos veces al mes" without naming dates) and baptism; prayer; children in the service; practical notes (dress, length, parking, accessibility). Ends with "Visítenos".

**Sermons**: list with filters (book of the Bible, series, preacher, year) and text search. Each sermon has a title, Scripture passage, preacher, date, series, an embedded **YouTube** video, an optional notes/outline PDF and a short description.

**Resources**: recommended books, articles written by the elders, downloads of the Confession and catechism (PDF and EPUB, see RD-13) and a printable covenant. Filter by category.

**Activities**: recurring meetings (Lord's Day services, prayer meeting, Bible study, Sunday school) plus one-off events. List view (and a simple month view). Each event can be added to a personal calendar (.ics).

**Visit us / Contact**: address, embedded map, service times, phone, email, contact form (name, email, message, spam protection). Short "What to expect" summary linking to *Our worship*.

---

## 5. Visual Design

Two design modes share one set of design tokens:

- **Institutional mode** (all pages not marked *Reading*): navy header/hero/footer, white and light-navy alternating sections, a strict grid, letter-spaced capitals for labels. *Feels like a historic seminary.*
- **Reading mode** (Confession, catechism, covenant, doctrine, articles, the Gospel): warm paper background, one centered column, classical serif, numbered paragraphs, thin rules. *Feels like a printed edition of the Confession.*

The header and footer are the same in both modes, so the site feels like one place.

### 5.1 Palette

Based on the logo (navy `#002239` + white), with a restrained warm accent and a paper neutral.

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#00172A` | Footer, pressed states |
| `navy-900` | `#002239` | **Logo color.** Header, hero, headings, primary buttons |
| `navy-700` | `#1F3D5A` | Hover, secondary surfaces |
| `navy-500` | `#4A6580` | Secondary text, metadata |
| `navy-200` | `#C9D3DE` | Borders, rules on white |
| `navy-50` | `#EEF2F6` | Alternating sections (institutional mode) |
| `white` | `#FFFFFF` | **Logo color.** Text on navy, cards |
| `paper` | `#F7F3EA` | Reading-mode background |
| `paper-rule` | `#E2D9C6` | Rules and borders in reading mode |
| `ink` | `#1A1F26` | Body text in reading mode |
| `brass-400` | `#C2A469` | Accent **on navy only**: thin rules, small ornaments, active nav underline |
| `brass-700` | `#84652E` | Accent **on light backgrounds**: chapter numbers, drop caps, paragraph numbers |
| `burgundy-700` | `#6E2A2E` | Rare: Scripture references in reading mode, error states |

**Rules**
- Navy and white carry at least 90% of the design. Brass and burgundy are accents for small details only, never large areas or button fills.
- Contrast: navy-900 on white ≈ 16:1; brass-400 on navy-900 ≈ 6.8:1; brass-700 on white ≈ 5.4:1 and on navy-50 ≈ 4.8:1 (darkened from #8A6A32, which failed AA on navy-50). All text must meet WCAG AA.
- No gradients, except a subtle navy-900 → navy-950 in the footer if needed.

### 5.2 Typography

| Role | Font (Google Fonts) | Notes |
|---|---|---|
| Display / headings | **EB Garamond** (500–600) | Classical, bookish |
| Body (reading mode) | **Source Serif 4** | 19–20px, line-height 1.7, max ~68ch |
| Body (institutional mode) | **Source Serif 4** | 18px |
| Labels, nav, buttons, metadata | **Montserrat** (500–600), uppercase, letter-spacing 0.12–0.18em | Echoes the ring lettering of the seal |

Fallbacks: `Georgia, serif` and `system-ui, sans-serif`. Use real small caps for confession references (e.g. "CAP. 1, PÁRR. 1").

### 5.3 Components & style rules

- **Corners:** square (0–2px radius). No pill buttons.
- **Buttons:** primary = navy fill + white uppercase label; secondary = 1px navy outline. On navy backgrounds, use a white outline and a brass-400 underline on hover.
- **Rules:** 1px lines; a centered ornamental divider (short rule, small ✠ or ❦, long rule) between major reading sections.
- **Seal:** the full seal in the hero and footer; a small seal + wordmark in the header. Never stretched, recolored outside navy/white, or put on a busy photo.
- **Imagery:** real photos only (building, pulpit, open Bible, congregation from behind), processed as **navy duotone**. No stock photos of smiling people.
- **Motion:** none beyond hover/focus transitions (≤150ms). No carousels, parallax, video backgrounds, auto-playing media or pop-ups.
- **Copy tone:** formal and warm, using *usted* in Spanish. No emoji, slang or exclamation-heavy copy.
- **Scripture citations** are written out (e.g. "— 2 Timoteo 3:16–17").

### 5.4 Layout

- Max content width: 1200px (institutional), 680px text column (reading).
- Mobile-first; 16px side gutter on phones; no horizontal scroll.
- Header: seal + name on the left; nav in uppercase letter-spaced labels; language switch `ES | EN` on the right. Collapses into a full-screen menu on mobile.
- Footer (navy-950): seal, address, service times, quick links, contact, language switch, © line.

---

## 6. Functional Requirements

### 6.1 Internationalization
| ID | Requirement |
|----|-------------|
| I-1 | Spanish is the default locale (`/`); English under `/en`. |
| I-2 | Every content entry has an ES and EN version; the language switch goes to the equivalent page. |
| I-3 | If an EN translation is missing, the EN page shows the ES content with a notice ("This page is not yet available in English") rather than a 404. |
| I-4 | UI strings (nav, buttons, labels, dates) are translated and formatted by locale. |
| I-5 | `hreflang` alternates and `lang` attributes are set on every page. |

### 6.2 Sermons
| ID | Requirement |
|----|-------------|
| SE-1 | A sermon has: title, slug, date, preacher, series (optional), Scripture passage(s) as structured data (book, chapter, verse range), description, **YouTube video ID**, notes PDF (optional), language. |
| SE-2 | The archive can be filtered by book of the Bible (in canonical order), series, preacher and year, and searched by text. Filters are reflected in the URL. |
| SE-3 | Paginated, newest first. |
| SE-4 | The YouTube player is embedded with `youtube-nocookie.com` and loads only after the visitor clicks a poster image (thumbnail + play button styled in the site design). This keeps the page fast and free of tracking until play. |
| SE-5 | Each sermon page links to the video on YouTube and to the church's channel. |
| SE-6 | Each sermon page has share links (copy link, WhatsApp, email): plain links, no tracking widgets. |

### 6.3 Reading mode (Confession, catechism, covenant, articles)
| ID | Requirement |
|----|-------------|
| RD-1 | The Confession is stored as structured data: chapter → paragraphs → proof texts. It is not stored as one rich-text blob. |
| RD-2 | Every paragraph has a stable anchor (e.g. `/creemos/confesion-1689/1#p-1`) and a "copy link" control. |
| RD-3 | Proof texts appear as footnote markers; on tap or hover they open a popover. **English:** reference + full KJV verse text. **Spanish:** reference + a "Leer en YouVersion" link to the RVR1960 passage (no verse text, to stay within RVR1960 quotation limits). |
| RD-4 | A chapter table of contents is always reachable (sticky sidebar on desktop, top drawer on mobile); previous/next chapter navigation. |
| RD-5 | **Reader settings panel** (Aa button, Kindle-style): font size (5 steps), line spacing (3 steps), theme (*Papel* / *Blanco* / *Noche*), remembered per visitor. The *Noche* theme uses navy-950 background with off-white text. |
| RD-6 | An optional **side-by-side ES / EN** view on desktop. |
| RD-7 | Full-text search across the Confession and catechism. |
| RD-8 | A print stylesheet produces a clean, book-like printout of a chapter or of the whole Confession. |
| RD-9 | Catechism: stored as main question → answer → Beddome's sub-questions → Scripture answers. Main questions are anchorable; sub-questions can be expanded or collapsed; the visitor can hide answers (for memorization). |
| RD-10 | Scripture text is quoted from the **KJV** (English) and the **Reina-Valera 1960** (Spanish). The source translation is named on every page that quotes it. |
| RD-11 | The Spanish Confession and catechism pages show the credit line of the translation and the publisher's permission notice (see §8.1). |
| RD-12 | **Reader experience:** a focus mode hides the header/footer while reading; a thin progress bar shows the position in the chapter; the site remembers the last chapter/paragraph read and offers "Continuar leyendo" on the Confession and catechism index pages. Reading is continuous scroll, not paginated (see note below). |
| RD-13 | Downloadable **EPUB** of the Confession and the catechism in both languages, generated from the same content files at build time (EPUB works with Kindle via *Send to Kindle*, Apple Books, etc.). **PDF:** the publisher's original Spanish PDFs; for English, the print layout (RD-8). |
| RD-14 | Scripture references link to YouVersion (bible.com) using USFM book codes: `https://www.bible.com/bible/149/{BOOK}.{CH}.{V}.RVR1960` (ES) and `https://www.bible.com/bible/1/{BOOK}.{CH}.{V}.KJV` (EN). Links open in a new tab. |

> **Why scroll and not Kindle-style page turns:** paginated reading on the web breaks paragraph links (RD-2), search (RD-7), the side-by-side view (RD-6), printing, screen readers and SEO, and feels awkward on desktop. The site borrows the parts of e-readers that help (reader settings, themes, focus mode, progress, resume), and the EPUB download (RD-13) gives visitors a real e-reader experience on their own devices.

### 6.4 Activities
| ID | Requirement |
|----|-------------|
| AC-1 | Recurring events (weekly services) and one-off events, with title, description, date/time, location and language. |
| AC-2 | List view and a simple month view; past events are hidden by default. |
| AC-3 | Each event offers an .ics download. |
| AC-4 | Service times are a site setting shown in the hero, footer and *Visit us* page from one source. |

### 6.5 Contact
| ID | Requirement |
|----|-------------|
| CT-1 | The contact form (name, email, optional phone, message) is sent **from client-side JavaScript** to an email-sending service (e.g. EmailJS or Web3Forms), which delivers it to a configurable address. No server code is needed. If sending fails, the form offers a `mailto:` link as a fallback. |
| CT-2 | Spam protection without intrusive captchas (honeypot field + the service's built-in limits; a privacy-friendly captcha such as Cloudflare Turnstile only if spam becomes a problem). The service's public key is the only credential in the frontend. |
| CT-3 | Clear success and error messages in the current language. |

### 6.6 Search & SEO
| ID | Requirement |
|----|-------------|
| SO-1 | Site-wide search covers pages, sermons, resources, the Confession and the catechism. |
| SO-2 | Schema.org markup: `Church` (address, service times), `Event`, `PodcastEpisode` / `AudioObject` for sermons. |
| SO-3 | Per-page title, description and Open Graph image (default: seal on navy). |
| SO-4 | XML sitemap including both languages; `robots.txt`. |

---

## 7. Content Management (v1: files, no admin panel)

v1 has **no admin panel**. All content is stored as files in the repository, and the site is built from them. Content is edited by changing these files and redeploying. The content schemas below are the same ones a future admin panel will use (§12).

### 7.1 Content files

```
content/
├── settings.yml                  # church name, address, map, phone, email, service times, YouTube channel, default verse
├── pages/{es,en}/*.md            # About us, History intro, Our worship, The Gospel, Privacy, …
├── leaders/*.yml                 # name, office (elder | deacon), photo, order, bio { es, en }
├── history/*.yml                 # year, part (heritage | church), title/description { es, en }, image
├── sermons/*.yml                 # SE-1 fields; one file per sermon, both languages
├── series/*.yml                  # title/description { es, en }, cover, books
├── preachers/*.yml               # name, title, photo, bio { es, en }
├── events/*.yml                  # title/description { es, en }, start, end, location, recurrence (RRULE)
├── resources/{es,en}/*.md        # articles and book recommendations
├── confession/{es,en}/NN.yml     # chapter → paragraphs[] → { number, text, proof_texts[] }
└── catechism/{es,en}/NNN.yml     # question, answer, sections[][] → { q, a } (Beddome), notes
```

### 7.2 Requirements
| ID | Requirement |
|----|-------------|
| CM-1 | Every content type has a schema; the build **fails with a clear message** if a file is invalid (missing translation fields are a warning, not an error, per I-3). |
| CM-2 | A `CONTENT.md` guide explains how to add a sermon, an event and a leader, with a copy-paste template for each. Like all development files (code, comments, scripts, docs), it is written in English; only the site content is bilingual. |
| CM-3 | Scripture passages use a fixed book list (canonical order, ES/EN names, abbreviations) so filters and links are consistent. |
| CM-4 | Images placed in `content/` are optimized at build time (responsive sizes, modern formats). |
| CM-5 | Publishing = merge to the main branch + deploy. A `draft: true` front-matter field hides an entry from the production build. |

---

## 8. Source Texts & Mock Content

### 8.1 Doctrinal sources (real content, v1)

| Document | Spanish source | English source |
|---|---|---|
| **1689 Confession** | `assets/2lbc_reader_edition.pdf`: translation by Alan J. Torres Hernández, rev. S. D. Renihan, J. Martínez Pinto, T. E. Walls, J. A. Rodríguez Vega, L. J. Torrealba. **Used with permission.** | 1677 first-edition text (public domain), original spelling |
| **Beddome's Catechism** | `assets/beddome_cathecism.pdf`: translation by Jorge A. Rodríguez Vega, rev. Taylor E. Walls, © Editorial Legado Bautista Confesional, 2021. **Used with permission.** | The Baptist Catechism (1695, public domain): questions, answers and proof texts. Beddome's English sub-questions are not yet included (§13). |
| **Scripture quotations** | Reina-Valera 1960 | King James Version |

- The PDFs are converted **once** into the structured files of §7.1 (chapter/paragraph/proof texts; question/answer/sub-questions/references). The conversion is checked against the PDF chapter by chapter; the PDF stays in `assets/` as the reference.
- Both Spanish texts are from **Editorial Legado Bautista Confesional**, which has granted unrestricted permission to use them. The Spanish pages show the translators' credit line and "Usado con permiso de Editorial Legado Bautista Confesional".
- The original PDFs may also be offered for download on the Resources page, alongside the site-generated EPUB/PDF (RD-13).

### 8.2 Placeholder content

v1 ships with realistic placeholder content for everything that doesn't exist yet. Placeholders are marked so they are easy to find and replace:

- Every placeholder file has `placeholder: true` in its front matter, and its body starts with `[PROVISIONAL]`.
- A script (`npm run placeholders` or equivalent) lists every file still marked as a placeholder.
- In non-production builds, placeholder content shows a small "Contenido provisional" badge.

| Item | Placeholder |
|---|---|
| Church history (our church) | 4 milestones: founding year, first public meeting, adoption of the 1689 Confession, constitution of the church with elders |
| Heritage timeline | Real historical content (1644, 1677/1689, 1742, 20th-century recovery); to be reviewed by the elders |
| Leadership | 2 elders + 2 deacons with generic names ("Pastor Nombre Apellido"); the seal used as the photo placeholder |
| Church covenant | Standard Reformed Baptist church covenant structure with `[PROVISIONAL]` paragraphs |
| Address & times | "Calle Ejemplo 123, Ciudad"; Lord's Day 10:00 and 18:00; Wednesday prayer 19:30 |
| Contact | `contacto@ejemplo.org`, placeholder phone |
| Sermons | 6 sample sermons across 2 series and 2 preachers, each pointing to a **sample YouTube video ID** to be replaced with real ones |
| Events | Weekly services + 2 one-off events |
| Resources | 3 book recommendations, 1 article |
| About us, Our worship, The Gospel | Drafted text marked `[PROVISIONAL]` for the elders to review |

---

## 9. Non-Functional Requirements

| Area | Requirement |
|------|-------------|
| Architecture | Statically generated site (Astro) built from `content/`; search index built with Pagefind. No server-side code: the contact form uses a client-side email service (CT-1). |
| Accessibility | WCAG 2.1 AA; full keyboard navigation; visible focus; alt text required in the content schemas for images; respects `prefers-reduced-motion`. |
| Readability | Minimum body size 18px; line length ≤ 75ch; nothing essential in light gray text. |
| Performance | Lighthouse ≥ 90 on mobile for all categories; LCP < 2.5s on 4G. No YouTube scripts load before the visitor clicks play (SE-4). |
| Media | Images served in modern formats with responsive sizes. |
| Privacy | No third-party tracking cookies; privacy-friendly analytics only (cookieless). Maps and videos load only after a click. |
| Security | HTTPS only; the contact form validates input and has a honeypot; dependencies kept up to date. |
| Hosting | Deployed to the church's existing hosting and domain. Configuration via environment variables; a `.env.example` documents them. |
| Dev setup | One command runs the site locally with all content. |
| Testing | Schema validation of all content (CM-1); unit tests for i18n routing and Scripture reference parsing; end-to-end tests for the critical paths (home → visit us; sermon filter → play video; Confession chapter → proof text; language switch keeps the page). |
| Browsers | The last 2 versions of major browsers; usable on older Android phones. |

---

## 10. Integration with the Video Editing Tool

The internal video tool ([`video-editor.md`](video-editor.md)) produces edited sermon videos, which are uploaded to YouTube.

- **v1:** no direct integration. The sermon's YouTube video ID is added to its content file.
- **Later:** once the admin panel exists, a "Publish to website" action in the video tool creates a **draft sermon** with the YouTube ID filled in, for an editor to complete and publish.

---

## 11. v1 Acceptance Criteria

v1 is done when:
1. All pages in §4 exist in both languages, with real doctrinal content (§8.1) and placeholder content (§8.2), and the language switch keeps the visitor on the equivalent page.
2. Institutional and reading modes match §5 (palette, typography, components) on desktop and phone.
3. A visitor can find service times and address from the home page in one tap.
4. All 32 chapters of the 1689 Confession are readable in Spanish and English, with paragraph anchors, proof-text popovers, font size control, side-by-side view, search and a print layout. The Spanish text matches the source PDF.
5. Beddome's Catechism is complete in both languages, with expandable sub-questions and a hide-answers mode.
6. Sermons can be filtered by book, series, preacher and year; the YouTube player loads only on click.
7. The contact form delivers an email.
8. Invalid content files fail the build with a clear message; the placeholder script lists every remaining placeholder.
9. Lighthouse mobile ≥ 90 and no WCAG AA violations on the home, Confession chapter and sermon pages.
10. The site runs locally with one command, and the test suite passes.

---

## 12. Roadmap (beyond v1)

- **v2 — Admin panel:** login with roles (administrator, editor, contributor); draft / published / scheduled states; ES and EN edited side by side; preview; revision history; media library; Scripture book picker. It reads and writes the same schemas as §7.1.
- **v2+:** "Publish to website" from the video tool; sermon transcripts (from the video tool's transcription); sermon audio and a podcast feed.
- **Later:** Scripture reading plan; newsletter sign-up; other historic documents (1644 Confession, Keach's Catechism); live stream page.

---

## 13. Open Questions

These are deferred and do not block v1:

- **English Beddome:** the English text of Beddome's sub-questions (1752, public domain) still needs a reliable source; until then the English catechism shows the 1695 answers with proof texts and links to the Spanish exposition.
- **English Confession spelling:** the English text keeps the 1677 spelling (e.g. "hath", "Saviour"). A modernized-spelling edition could replace it later.

- **Lord's Supper schedule:** twice a month; which Sundays is not decided yet. v1 says "dos veces al mes" without dates.
- **Email service for the contact form:** provider and recipient address to be chosen later. v1 builds the form against a configurable provider key and recipient (in `.env`); until they are set, the form falls back to the `mailto:` link (CT-1).

---

## 14. Implementation Notes (v1)

- **Source conversion.** The two Spanish PDFs were converted into `website/content/` once. All 32 chapters match the PDF paragraph count; every proof-text marker has a note and all 4,779 Scripture references validate against book/chapter/verse bounds (`npm test`).
- **Corrections made during conversion** (to confirm with the publisher):
  - 1689 27.2 note 5: the PDF prints "Hch. 12:29, 30"; Acts 12 has 25 verses. Corrected to **Hch. 11:29, 30** (the relief sent to the brethren in Judea), which is almost certainly the intended passage.
  - Four footnote markers were missing from the PDF text layer (19.2 note 5, 23.5 note 11, 26.7 note 14, 30.4 note 6). They were placed at the end of the sentence where the 1677 edition has them; please review.
- **Catechism Scripture:** Beddome's Spanish answers quote **La Biblia de las Américas** (as in the publisher's edition). Proof-text links go to the RVR1960 (Spanish) and KJV (English) on YouVersion.
- **Pages per question:** the catechism has an index page plus one page per question (§4, row 8b), so Beddome's ~2,600 sub-questions don't load on one page.

