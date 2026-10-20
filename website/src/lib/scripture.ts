// Parses and formats Scripture references in Spanish or English, e.g.
//   "2 Tim. 3:15, 16, 17. Isa. 8:20."   "Rom. 1:19-21; y 2:14, 15."
//   "Dan. 4:25 y los vv. 34, 35."        "John 3:16; Psalm 119"
// Used for Confession/catechism proof texts, sermon passages and YouVersion links.

import { BOOKS, BOOK_BY_CODE, type BibleBook } from './bible-books.ts';

export type Lang = 'es' | 'en';

export interface ScriptureRef {
  book: string; // USFM code
  chapter: number;
  /** 0 means the whole book (sermon passages such as "1, 2 y 3 Juan"). */
  /** Verse ranges [start, end]; empty means the whole chapter. */
  verses: [number, number][];
}

export type RefToken = { type: 'ref'; ref: ScriptureRef } | { type: 'text'; value: string };

const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\.$/, '').replace(/\s+/g, ' ').trim();

// Every accepted spelling, longest first so "1 Jua" wins over "Jua".
const NAME_INDEX: [string, BibleBook][] = (() => {
  const entries = new Map<string, BibleBook>();
  for (const b of BOOKS) {
    for (const name of [b.es, b.en, b.esAbbr, b.enAbbr, b.code, ...b.aliases]) entries.set(norm(name), b);
  }
  return [...entries].sort((a, b) => b[0].length - a[0].length);
})();

function matchBook(text: string, wholeBooks = false): { book: BibleBook; length: number; bare?: boolean } | null {
  const lower = norm(text.slice(0, 40)).replace(/\.$/, '');
  const raw = text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  for (const [name, book] of NAME_INDEX) {
    if (!lower.startsWith(name)) continue;
    // Must end on a word boundary: followed by ".", space or a digit.
    const after = raw.slice(name.length);
    const m = after.match(/^(\.?\s*)(?=\d)/);
    if (m) return { book, length: name.length + m[1].length };
    // A book name on its own ("1 Juan, 2 Juan y 3 Juan"), only when whole books are allowed.
    if (wholeBooks && /^\.?(?=\s*(?:[,;]|$)|\s+(?:y|and|e)\s)/.test(after)) return { book, length: name.length + (after.startsWith('.') ? 1 : 0), bare: true };
  }
  return null;
}

/** Splits a citation string into references and the plain text between them. */
export function parseReferences(input: string, opts: { wholeBooks?: boolean } = {}): RefToken[] {
  const tokens: RefToken[] = [];
  let book: BibleBook | null = null;
  let current: ScriptureRef | null = null;
  let i = 0;
  let pendingText = '';
  const flushText = () => {
    let t = pendingText;
    let prev;
    do {
      prev = t;
      t = t.replace(/^(?:[\s.,;]+|(?:y|con|and|with)\b)+/i, '').replace(/(?:[\s,;]+|\b(?:y|con|and|with))+$/i, '');
    } while (t !== prev);
    if (t) tokens.push({ type: 'text', value: t });
    pendingText = '';
  };
  const push = (ref: ScriptureRef) => {
    flushText();
    tokens.push({ type: 'ref', ref });
    current = ref;
  };

  while (i < input.length) {
    const rest = input.slice(i);
    // Book name (optionally preceded by a separator) followed by a number.
    const bookMatch = /^[\s.;,]*$/.test(input.slice(Math.max(0, i - 1), i)) || i === 0 ? matchBook(rest, opts.wholeBooks) : null;
    if (bookMatch) {
      book = bookMatch.book;
      i += bookMatch.length;
      if (bookMatch.bare) {
        push({ book: book.code, chapter: 0, verses: [] });
        continue;
      }
      // Single-chapter books cite verses only: "Jud. 6, 7", "3 Jn. 8-10".
      let m = book.chapters === 1 ? input.slice(i).match(/^(?:1\s*:\s*)?(\d+)(?:\s*[-‐‑‒–—]\s*(\d+))?/) : null;
      if (m) {
        push({ book: book.code, chapter: 1, verses: [[+m[1], m[2] ? +m[2] : +m[1]]] });
        i += m[0].length;
        continue;
      }
      // "Psalm 119" with no verse = whole chapter.
      m = input.slice(i).match(/^(\d+)(?!\s*[:\d])/);
      if (m) {
        push({ book: book.code, chapter: +m[1], verses: [] });
        i += m[0].length;
      }
      continue;
    }
    // chapter:verse[-verse]
    let m = rest.match(/^(\d+)\s*:\s*(\d+)(?:\s*[-‐‑‒–—]\s*(\d+))?/);
    if (m && book) {
      push({ book: book.code, chapter: +m[1], verses: [[+m[2], m[3] ? +m[3] : +m[2]]] });
      i += m[0].length;
      continue;
    }
    // ", 16" or ", 6-8" → another verse in the same chapter
    m = rest.match(/^,\s*(\d+)(?:\s*[-‐‑‒–—]\s*(\d+))?(?!\s*:)/);
    if (m && current && (current as ScriptureRef).chapter !== 0) {
      current.verses.push([+m[1], m[2] ? +m[2] : +m[1]]);
      i += m[0].length;
      continue;
    }
    // "el v. 40", "los vv. 34, 35", "ver. 3", "v. 13" → verses in the same chapter as the last reference
    m = rest.match(/^\s*(?:(?:con\s+)?(?:el|los)\s+)?(?:vv?|ver|vs)\.\s*(\d+)(?:\s*[-‐‑‒–—]\s*(\d+))?/i);
    if (m && current && book) {
      const prev: ScriptureRef = current;
      push({ book: prev.book, chapter: prev.chapter, verses: [[+m[1], m[2] ? +m[2] : +m[1]]] });
      i += m[0].length;
      continue;
    }
    // "y cap. 3" / "ch. 3" → whole chapter of the current book
    m = rest.match(/^(?:cap|caps|ch|chap)\.\s*(\d+)/i);
    if (m && book) {
      push({ book: book.code, chapter: +m[1], verses: [] });
      i += m[0].length;
      continue;
    }
    pendingText += input[i];
    i++;
  }
  flushText();
  return tokens;
}

export function refsOnly(tokens: RefToken[]): ScriptureRef[] {
  return tokens.flatMap((t) => (t.type === 'ref' ? [t.ref] : []));
}

function versesLabel(verses: [number, number][]): string {
  return verses.map(([a, b]) => (a === b ? `${a}` : `${a}–${b}`)).join(', ');
}

/** "2 Tim. 3:15–17" (short) or "2 Timoteo 3:15–17" (long). */
export function formatRef(ref: ScriptureRef, lang: Lang, style: 'short' | 'long' = 'short'): string {
  const b = BOOK_BY_CODE.get(ref.book)!;
  const name = style === 'long' ? b[lang] : lang === 'es' ? b.esAbbr : b.enAbbr;
  if (ref.chapter === 0) return b[lang];
  return ref.verses.length ? `${name} ${ref.chapter}:${versesLabel(compactVerses(ref.verses))}` : `${name} ${ref.chapter}`;
}

/** Merges "15, 16, 17" into "15–17". */
export function compactVerses(verses: [number, number][]): [number, number][] {
  const sorted = [...verses].sort((a, b) => a[0] - b[0]);
  const out: [number, number][] = [];
  for (const [a, b] of sorted) {
    const last = out.at(-1);
    if (last && a <= last[1] + 1) last[1] = Math.max(last[1], b);
    else out.push([a, b]);
  }
  return out;
}

const YOUVERSION = { es: { id: 149, abbr: 'RVR1960' }, en: { id: 1, abbr: 'KJV' } };

/** Link to the passage on YouVersion (bible.com), in RVR1960 or KJV. */
export function youVersionUrl(ref: ScriptureRef, lang: Lang): string {
  const v = YOUVERSION[lang];
  const first = compactVerses(ref.verses)[0];
  const verses = first ? (first[0] === first[1] ? `.${first[0]}` : `.${first[0]}-${first[1]}`) : '';
  return `https://www.bible.com/bible/${v.id}/${ref.book}.${ref.chapter || 1}${verses}.${v.abbr}`;
}

/** Throws if a reference points outside the canon (wrong chapter number etc.). */
export function validateRef(ref: ScriptureRef): void {
  const b = BOOK_BY_CODE.get(ref.book);
  if (!b) throw new Error(`Unknown book ${ref.book}`);
  if (ref.chapter < 0 || ref.chapter > b.chapters) throw new Error(`${b.en} has no chapter ${ref.chapter}`);
}

/** References of a sermon passage, where whole books are allowed ("1, 2 y 3 Juan"). */
export const passageRefs = (passage: string) => refsOnly(parseReferences(passage, { wholeBooks: true }));
