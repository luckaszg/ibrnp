// Small helpers over the content collections.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './scripture.ts';

const byLang = <T extends { id: string }>(entries: T[], lang: Lang) => entries.filter((e) => e.id.startsWith(`${lang}/`));

/** Production builds hide drafts (CM-5). */
const visible = (e: { data: { draft?: boolean } }) => !(import.meta.env.PROD && e.data.draft);

export async function confessionChapters(lang: Lang) {
  return byLang(await getCollection('confession'), lang).sort((a, b) => a.data.chapter - b.data.chapter);
}

export async function catechismQuestions(lang: Lang) {
  return byLang(await getCollection('catechism'), lang).sort((a, b) => a.data.number - b.data.number);
}

/** A Markdown page in `lang`, falling back to Spanish when the English file does not exist (I-3). */
export async function page(slug: string, lang: Lang): Promise<{ entry: CollectionEntry<'pages'>; untranslated: boolean }> {
  const all = await getCollection('pages');
  const exact = all.find((p) => p.id === `${lang}/${slug}`);
  if (exact) return { entry: exact, untranslated: false };
  const es = all.find((p) => p.id === `es/${slug}`);
  if (!es) throw new Error(`Missing content/pages/es/${slug}.md`);
  return { entry: es, untranslated: lang !== 'es' };
}

export async function sermons() {
  return (await getCollection('sermons')).filter(visible).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function resources(lang: Lang) {
  const all = (await getCollection('resources')).filter(visible);
  const slugs = new Set(all.map((r) => r.id.split('/')[1]));
  // One entry per slug: the visitor's language if it exists, Spanish otherwise.
  return [...slugs]
    .map((slug) => {
      const own = all.find((r) => r.id === `${lang}/${slug}`);
      const es = all.find((r) => r.id === `es/${slug}`);
      const entry = (own ?? es)!;
      return { slug, entry, untranslated: !own };
    })
    .sort((a, b) => (b.entry.data.date?.getTime() ?? 0) - (a.entry.data.date?.getTime() ?? 0));
}

export const slugOf = (id: string) => id.split('/').pop()!;

export const showPlaceholders = !import.meta.env.PROD || import.meta.env.PUBLIC_SHOW_PLACEHOLDERS === 'true';
