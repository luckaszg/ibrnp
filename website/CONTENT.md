# Content guide

All site content lives in `content/`. To publish a change: edit or add the file, check that the site builds (`npm run build`), then deploy (`./start.sh` from the project root).

If a file has a mistake (a missing field, a malformed date, an invalid Bible reference), **the build stops and says which file and field to fix**.

- Bilingual text is written as `{ es: "Texto en español", en: "Text in English" }`. If the English is missing, the English page shows the Spanish with a notice.
- To hide something without deleting it, add `draft: true` (sermons, events and resources).
- `npm run placeholders` lists any content still marked as placeholder (`placeholder: true` or a `[PROVISIONAL]` / `[PLACEHOLDER]` marker).
- The site's visible text stays in Spanish (with its English version); everything else in the repository (code, comments, docs) is in English.

---

## Add a sermon

Create a file in `content/sermons/`. The file name becomes the page address (`content/sermons/1-juan-3-11-18.yml` → `/sermones/1-juan-3-11-18/`).

```yaml
title: { es: "El amor fraternal", en: "Brotherly love" }
date: 2026-10-18
preacher: mauro-vargas         # file name in content/preachers/ (without .yml)
series: un-cristianismo-autentico   # optional: file name in content/series/
passage: 1 Juan 3:11-18         # Spanish or English book names; validated automatically
youtube: AbCdEfGhIjK            # ONLY the 11-character id from the YouTube URL
description:                    # optional
  es: "Resumen breve del sermón."
  en: "Short summary of the sermon."
# notesPdf: /sermones/bosquejos/2026-10-18.pdf   # optional (file inside public/)
# language: en                                   # if the sermon was preached in English
```

**Where is the YouTube id?** In `https://www.youtube.com/watch?v=AbCdEfGhIjK` it is what comes after `v=`. In `https://youtu.be/AbCdEfGhIjK` it is what comes after the slash.

**Valid passages:** `Romanos 8:28-39`, `Juan 3:16`, `Salmo 23`, `1 Corintios 13`, `Rom. 5:1, 8`, `John 3:16`, and whole books such as `1 Juan, 2 Juan y 3 Juan`.

## Add a series

`content/series/name.yml` (a series page appears once it has at least one sermon):

```yaml
title: { es: "Gálatas", en: "Galatians" }
description:                    # optional
  es: "Descripción de la serie."
  en: "Description of the series."
```

## Add a preacher

`content/preachers/name.yml`:

```yaml
name: Hno. Juan Pérez
title: { es: Encargado, en: Leader }
```

## Add an event

`content/events/name.yml`. Times are local, formatted `YYYY-MM-DDTHH:MM`.

**One-off event:**

```yaml
title: { es: "Conferencia de la Reforma", en: "Reformation Conference" }
description: { es: "Descripción.", en: "Description." }
start: 2026-10-31T09:00
end: 2026-10-31T16:00
location: Templo
```

**Weekly meeting** (add `weekly`; days: `MO TU WE TH FR SA SU`):

```yaml
title: { es: "Estudio bíblico", en: "Bible study" }
start: 2026-01-08T19:30
end: 2026-01-08T21:00
weekly: { days: [TH] }        # optional: until: 2026-12-31
```

**Service times** are not events: edit them in `content/settings.yml` (`serviceTimes`). They appear on the home page, in the footer, on "Visítenos" and in the calendar.

## Add a leader

`content/leaders/name.yml`. The photo is optional: put it next to the file (e.g. `content/leaders/juan-perez.jpg`); it is shown in navy duotone. Without a photo, the seal is shown.

```yaml
name: Juan Pérez
office: leader             # leader (encargado), elder (anciano) or deacon (diácono)
title: { es: Encargado, en: Leader }
order: 1                   # position on the page
photo: ./juan-perez.jpg    # optional
photoAlt: Juan Pérez       # photo description (required with a photo)
bio:                       # optional
  es: "Breve biografía."
  en: "Short biography."
```

## Church history

Each milestone is a file in `content/history/`. Use `part: church` for the church's own history (the section appears once there is at least one) and `part: heritage` for the Baptist heritage timeline.

```yaml
year: "2015"
part: church
title: { es: "Constitución de la iglesia", en: "The church is constituted" }
description: { es: "…", en: "…" }
```

## Resources and articles

One Markdown file per language, with the **same file name** in `content/resources/es/` and `content/resources/en/`.

```markdown
---
title: ¿Por qué una iglesia confesional?
category: article        # article, book or document
author: Hno. Juan Pérez
date: 2026-09-01
summary: Resumen de una o dos líneas.
# link: https://…        # for books (external link) or documents (file in public/)
---

Texto del artículo en Markdown…
```

## Pages

The texts of *Quiénes somos*, *Nuestro culto*, *El Evangelio*, *Lo que creemos*, *Historia* (introduction) and *Privacidad* are Markdown files in `content/pages/es/` and `content/pages/en/`.

**Church covenant:** the page and its links appear automatically once `content/pages/es/pacto-de-iglesia.md` exists (plus its English version, `content/pages/en/pacto-de-iglesia.md`). Format:

```markdown
---
title: Pacto de iglesia
description: El compromiso que asumen los miembros de la iglesia entre sí y delante de Dios.
---

Texto del pacto…
```

## Church details

`content/settings.yml`: name, address, map coordinates, phone, email, YouTube channel, service times and the home page verse. Phone and email are optional and hidden when empty; the contact form appears once there is an email or an email-sending service (see `.env.example`).

## Confession and catechism

`content/confession/` and `content/catechism/` hold the full texts, converted from the PDFs in `assets/`. They normally don't need editing.

- `*text*` = italics (words supplied by the translators).
- `[^3]` = marker for note 3; the notes are under `notes` at the end of each file.
- `{text}` = translators' clarification (catechism).
