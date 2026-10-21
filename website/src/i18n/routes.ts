// Every page and its path in each language. The language switch uses this map
// to send visitors to the same page in the other language (I-2).
import fs from 'node:fs';
import path from 'node:path';
import type { Lang } from '../lib/scripture.ts';

export const ROUTES = {
  home: { es: '/', en: '/en/' },
  about: { es: '/quienes-somos/', en: '/en/about/' },
  leadership: { es: '/quienes-somos/liderazgo/', en: '/en/about/leadership/' },
  history: { es: '/historia/', en: '/en/history/' },
  beliefs: { es: '/creemos/', en: '/en/beliefs/' },
  confession: { es: '/creemos/confesion-1689/', en: '/en/beliefs/1689-confession/' },
  catechism: { es: '/creemos/catecismo/', en: '/en/beliefs/catechism/' },
  covenant: { es: '/creemos/pacto-de-iglesia/', en: '/en/beliefs/church-covenant/' },
  gospel: { es: '/el-evangelio/', en: '/en/the-gospel/' },
  worship: { es: '/nuestro-culto/', en: '/en/worship/' },
  sermons: { es: '/sermones/', en: '/en/sermons/' },
  resources: { es: '/recursos/', en: '/en/resources/' },
  activities: { es: '/actividades/', en: '/en/activities/' },
  visit: { es: '/visitenos/', en: '/en/visit/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
  search: { es: '/buscar/', en: '/en/search/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof ROUTES;

/**
 * Pages that exist only once their text is written in content/pages/es/<file>.md.
 * Until then they are not built and links to them are hidden.
 */
export const OPTIONAL_PAGES: Partial<Record<RouteKey, string>> = { covenant: 'pacto-de-iglesia' };

export const routeAvailable = (key: RouteKey) => {
  const file = OPTIONAL_PAGES[key];
  return !file || fs.existsSync(path.resolve('content/pages/es', `${file}.md`));
};

export const route = (key: RouteKey, lang: Lang) => ROUTES[key][lang];

export const confessionChapter = (n: number, lang: Lang) => `${ROUTES.confession[lang]}${n}/`;
export const sermonPath = (slug: string, lang: Lang) => `${ROUTES.sermons[lang]}${slug}/`;
export const seriesPath = (slug: string, lang: Lang) => `${ROUTES.sermons[lang]}series/${slug}/`;
export const resourcePath = (slug: string, lang: Lang) => `${ROUTES.resources[lang]}${slug}/`;
export const eventIcsPath = (slug: string, lang: Lang) => `${ROUTES.activities[lang]}${slug}.ics`;

/** Paths of the same page in both languages, for the language switch and hreflang. */
export type Alternates = Record<Lang, string>;
export const alternates = (key: RouteKey): Alternates => ({ ...ROUTES[key] });
