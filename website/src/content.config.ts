// Schemas for every content type (spec §7). The build fails with a clear message
// when a file in content/ does not match its schema (CM-1).
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parseReferences, refsOnly, validateRef, passageRefs } from './lib/scripture.ts';

/** Text in both languages. English may be missing: the page then falls back to Spanish (I-3). */
const i18nText = z.object({ es: z.string(), en: z.string().optional() });

/** A Scripture passage such as "Romanos 8:28-39" or "John 3:16". */
const passage = z.string().superRefine((value, ctx) => {
  const refs = passageRefs(value);
  if (!refs.length) ctx.addIssue({ code: 'custom', message: `"${value}" is not a Scripture reference (e.g. "Juan 3:16")` });
  for (const r of refs) {
    try {
      validateRef(r);
    } catch (e) {
      ctx.addIssue({ code: 'custom', message: `"${value}": ${(e as Error).message}` });
    }
  }
});

const placeholder = z.boolean().default(false);
const draft = z.boolean().default(false);

const confession = defineCollection({
  loader: glob({ pattern: '*/*.yml', base: './content/confession' }),
  schema: z.object({
    chapter: z.number().int().min(1).max(32),
    title: z.string(),
    paragraphs: z.array(z.object({ n: z.number().int(), text: z.string() })),
    notes: z.record(z.string(), z.string()),
  }),
});

const catechism = defineCollection({
  loader: glob({ pattern: '*/*.yml', base: './content/catechism' }),
  schema: z.object({
    number: z.number().int().min(1),
    question: z.string(),
    answer: z.string(),
    sections: z.array(z.array(z.object({ q: z.string(), a: z.string() }))).default([]),
    notes: z.record(z.string(), z.string()).default({}),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    placeholder,
  }),
});

const preachers = defineCollection({
  loader: glob({ pattern: '*.yml', base: './content/preachers' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: i18nText,
      photo: image().optional(),
      photoAlt: z.string().optional(),
      placeholder,
    }),
});

const series = defineCollection({
  loader: glob({ pattern: '*.yml', base: './content/series' }),
  schema: z.object({
    title: i18nText,
    description: i18nText.optional(),
    placeholder,
  }),
});

const sermons = defineCollection({
  loader: glob({ pattern: '*.yml', base: './content/sermons' }),
  schema: z.object({
    title: i18nText,
    date: z.coerce.date(),
    preacher: reference('preachers'),
    series: reference('series').optional(),
    passage,
    description: i18nText.optional(),
    /** The 11-character id from the YouTube URL (youtube.com/watch?v=<id>). */
    youtube: z.string().regex(/^[\w-]{11}$/, 'youtube must be the 11-character video id, not the full URL'),
    notesPdf: z.string().optional(),
    language: z.enum(['es', 'en']).default('es'),
    placeholder,
    draft,
  }),
});

const leaders = defineCollection({
  loader: glob({ pattern: '*.yml', base: './content/leaders' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      office: z.enum(['elder', 'deacon', 'leader']),
      title: i18nText.optional(),
      order: z.number().default(100),
      photo: image().optional(),
      photoAlt: z.string().optional(),
      bio: i18nText.optional(),
      placeholder,
    }),
});

const history = defineCollection({
  loader: glob({ pattern: '*.yml', base: './content/history' }),
  schema: z.object({
    year: z.string(),
    part: z.enum(['heritage', 'church']),
    title: i18nText,
    description: i18nText,
    placeholder,
  }),
});

const weekday = z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']);
const events = defineCollection({
  loader: glob({ pattern: '*.yml', base: './content/events' }),
  schema: z.object({
    title: i18nText,
    description: i18nText.optional(),
    /** Local date and time, e.g. 2026-11-01T10:00 */
    start: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, 'use YYYY-MM-DDTHH:MM (local time)'),
    end: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/).optional(),
    location: z.string().optional(),
    /** Weekly recurrence; omit for one-off events. */
    weekly: z.object({ days: z.array(weekday).min(1), until: z.string().optional() }).optional(),
    placeholder,
    draft,
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './content/resources' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['book', 'article', 'document']),
    author: z.string().optional(),
    summary: z.string(),
    date: z.coerce.date().optional(),
    /** External link (books) or file under /public (documents). */
    link: z.string().optional(),
    placeholder,
    draft,
  }),
});

export const collections = { confession, catechism, pages, preachers, series, sermons, leaders, history, events, resources };
