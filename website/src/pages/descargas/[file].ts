// EPUB downloads generated from the content files at build time (RD-13).
import type { APIRoute, GetStaticPaths } from 'astro';
import { buildEpub, esc } from '../../lib/epub.ts';
import { confessionChapters, catechismQuestions } from '../../lib/content.ts';
import { formatRef, parseReferences, refsOnly, type Lang } from '../../lib/scripture.ts';

export const getStaticPaths: GetStaticPaths = () =>
  (['es', 'en'] as const).flatMap((lang) => [
    { params: { file: `confesion-1689-${lang}.epub` }, props: { kind: 'confession', lang } },
    { params: { file: `catecismo-${lang}.epub` }, props: { kind: 'catechism', lang } },
  ]);

const inline = (s: string) => esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/\[\^(\d+)\]/g, '<sup>$1</sup>');
const refs = (citation: string, lang: Lang) => refsOnly(parseReferences(citation)).map((r) => formatRef(r, lang)).join('; ') || citation;

export const GET: APIRoute = async ({ props }) => {
  const { kind, lang } = props as { kind: 'confession' | 'catechism'; lang: Lang };
  const es = lang === 'es';
  let bytes: Uint8Array;
  if (kind === 'confession') {
    const chapters = await confessionChapters(lang);
    bytes = buildEpub({
      id: `urn:ibrnp:confesion-1689-${lang}`,
      title: es ? 'Segunda Confesión Bautista de Fe de Londres (1689)' : 'Second London Baptist Confession of Faith (1689)',
      author: es ? 'Iglesia Bautista Reformada Nuevo Pacto' : 'Nuevo Pacto Reformed Baptist Church',
      lang,
      rights: es ? 'Traducción © Editorial Legado Bautista Confesional. Usado con permiso.' : 'Public domain.',
      chapters: chapters.map((c) => ({
        title: `${c.data.chapter}. ${c.data.title}`,
        body:
          `<h1><span class="n">${c.data.chapter}</span>${esc(c.data.title)}</h1>` +
          c.data.paragraphs.map((p) => `<p class="p"><span class="pn">${c.data.chapter}.${p.n}</span> ${inline(p.text)}</p>`).join('') +
          `<ol class="notes">${Object.entries(c.data.notes).map(([n, cit]) => `<li value="${n}">${esc(refs(cit, lang))}</li>`).join('')}</ol>`,
      })),
    });
  } else {
    const qs = await catechismQuestions(lang);
    bytes = buildEpub({
      id: `urn:ibrnp:catecismo-${lang}`,
      title: es ? 'Una exposición bíblica del Catecismo Bautista — Benjamin Beddome' : 'The Baptist Catechism (1695)',
      author: es ? 'Benjamin Beddome' : 'Baptist Catechism',
      lang,
      rights: es ? 'Traducción © Editorial Legado Bautista Confesional, 2021. Usado con permiso.' : 'Public domain.',
      chapters: qs.map((q) => ({
        title: `${q.data.number}. ${q.data.question}`,
        body:
          `<h1><span class="n">${q.data.number}</span>${esc(q.data.question)}</h1><p class="a"><strong>${es ? 'Respuesta' : 'Answer'}:</strong> ${inline(q.data.answer)}</p>` +
          q.data.sections.map((s) => `<dl class="sub">${s.map((it) => `${it.q ? `<dt>${inline(it.q)}</dt>` : ''}<dd>${inline(it.a)}</dd>`).join('')}</dl>`).join('<p>§</p>') +
          (Object.keys(q.data.notes).length
            ? `<ol class="notes">${Object.entries(q.data.notes).map(([n, v]) => `<li value="${n}">${esc(es ? v : refs(v, lang))}</li>`).join('')}</ol>`
            : ''),
      })),
    });
  }
  return new Response(bytes, { headers: { 'Content-Type': 'application/epub+zip' } });
};
