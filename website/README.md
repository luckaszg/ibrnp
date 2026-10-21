# IBRNP — Public website

The bilingual (ES/EN) public site of Iglesia Bautista Reformada Nuevo Pacto, built with [Astro](https://astro.build) as a static site. Spec: [`../specs/website.md`](../specs/website.md).

## Requirements

Node.js 22.22 or later (24 LTS recommended).

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local development server at http://localhost:4321 (search is not available in dev) |
| `npm run build` | Build the site into `dist/` and build the search index |
| `npm run preview` | Serve the built `dist/` locally |
| `npm test` | Unit and content-integrity tests |
| `npm run test:e2e` | End-to-end and accessibility tests against the built site (run `npm run build` first; first time: `npx playwright install --with-deps chromium`) |
| `npm run placeholders` | List content still marked as placeholder |

## Configuration

Copy `.env.example` to `.env`:

- `SITE_URL`: the church's domain (canonical links, sitemap, Open Graph).
- `PUBLIC_CONTACT_ENDPOINT` / `PUBLIC_CONTACT_KEY`: the email-sending service for the contact form. Any service that accepts a JSON POST works (for example Web3Forms: endpoint `https://api.web3forms.com/submit` and its access key). While empty, the form opens the visitor's email app instead.

## Deploying

### With Docker (recommended)

`../start.sh` (at the project root) builds the image (see `Dockerfile`: Node build + nginx) and starts or replaces the container on port 80:

```bash
./start.sh
```

Run it from the project root; run it again to publish changes. The domain comes from `SITE_URL` in `website/.env` (or pass it: `./start.sh https://www.ibrnp.com`), along with the optional contact-form values. Use `PORT=8080 ./start.sh` to publish on another port.

HTTPS is expected to be handled in front of the container (the hosting's proxy, Caddy, Traefik, Cloudflare, etc.).

### Without Docker

`npm run build` produces a fully static site in `dist/`. Upload the contents of `dist/` to any static host or web server. No server-side code is needed.

## Project layout

```
content/          All site content (see CONTENT.md)
data/kjv.json     King James Version text (public domain), used for English proof-text popovers
public/           Files served as-is (favicon, Open Graph image, downloadable PDFs)
src/
  content.config.ts   Schemas for every content type — the build fails on invalid content
  i18n/               Interface strings and the ES/EN route map
  lib/                Scripture reference parser, KJV lookup, events/ICS, EPUB builder, settings
  layouts/ components/ views/   UI; pages/ only maps URLs to views
  styles/             Design tokens (global.css) and reading mode (reading.css)
tests/            Unit and content tests (node --test)
e2e/              Playwright end-to-end and axe accessibility tests
```

## Source texts

- Spanish 1689 Confession and Beddome's catechism: converted from the PDFs in `../assets/` (Editorial Legado Bautista Confesional, used with permission).
- English 1689 Confession: 1677 first-edition text (public domain), original spelling.
- English catechism: The Baptist Catechism (1695), public domain.
