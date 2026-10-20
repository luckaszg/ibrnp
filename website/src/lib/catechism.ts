import type { Lang } from './scripture.ts';
export const catechismQuestionPath = (n: number, lang: Lang) => (lang === 'es' ? `/creemos/catecismo/${n}/` : `/en/beliefs/catechism/${n}/`);
