// KJV verse text (public domain) for English proof-text popovers (RD-3).
// Read at build time only; pages embed just the verses they cite.
import fs from 'node:fs';
import path from 'node:path';
import { compactVerses, type ScriptureRef } from './scripture.ts';

let books: Record<string, string[][]> | null = null;
const load = () => (books ??= JSON.parse(fs.readFileSync(path.resolve('data/kjv.json'), 'utf8')).books);

export interface Verse {
  n: number;
  text: string;
}

/** Verses of a reference, capped at `max` verses (popovers stay short). */
export function kjvVerses(ref: ScriptureRef, max = 6): { verses: Verse[]; truncated: boolean } {
  const chapter = load()[ref.book]?.[ref.chapter - 1];
  if (!chapter) return { verses: [], truncated: false };
  const ranges = ref.verses.length ? compactVerses(ref.verses) : [[1, chapter.length] as [number, number]];
  const verses: Verse[] = [];
  let total = 0;
  for (const [a, b] of ranges) for (let v = a; v <= Math.min(b, chapter.length); v++) {
    total++;
    if (verses.length < max) verses.push({ n: v, text: chapter[v - 1] });
  }
  return { verses, truncated: total > verses.length };
}
