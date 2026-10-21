import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseReferences, refsOnly, formatRef, youVersionUrl, compactVerses } from '../src/lib/scripture.ts';

const refs = (s: string) => refsOnly(parseReferences(s));

test('parses Spanish proof-text citations', () => {
  const r = refs('2 Tim. 3:15, 16, 17. Isa. 8:20. Luc. 16:29, 31. Efe. 2:20.');
  assert.deepEqual(r.map((x) => formatRef(x, 'en')), ['2 Tim. 3:15–17', 'Isa. 8:20', 'Luke 16:29, 31', 'Eph. 2:20']);
});

test('continues the previous book with "y" and "el v."', () => {
  assert.deepEqual(refs('1 Cor. 11:13, 14; y 14:26 y el v. 40.').map((x) => formatRef(x, 'es')), ['1 Co. 11:13–14', '1 Co. 14:26', '1 Co. 14:40']);
  assert.deepEqual(refs('Dan. 4:25 y los vv. 34, 35.').map((x) => formatRef(x, 'en')), ['Dan. 4:25', 'Dan. 4:34–35']);
});

test('handles single-chapter books and whole chapters', () => {
  assert.deepEqual(refs('Jud. 6, 7. 3 Jua. 8-10.').map((x) => formatRef(x, 'en')), ['Jude 1:6–7', '3 John 1:8–10']);
  assert.deepEqual(refs('Salmo 121').map((x) => formatRef(x, 'es', 'long')), ['Salmos 121']);
  assert.deepEqual(refs('Apo. 2; y cap. 3.').map((x) => formatRef(x, 'en')), ['Rev. 2', 'Rev. 3']);
});

test('accepts full Spanish and English book names for sermons', () => {
  assert.equal(formatRef(refs('Romanos 8:28-39')[0], 'en', 'long'), 'Romans 8:28–39');
  assert.equal(formatRef(refs('1 Juan 1:9')[0], 'en', 'long'), '1 John 1:9');
  assert.equal(formatRef(refs('John 3:16')[0], 'es', 'long'), 'Juan 3:16');
});

test('keeps non-reference notes as text', () => {
  const t = parseReferences('Hch. 14:23 —Véase en su idioma original.');
  assert.equal(t.at(-1)?.type, 'text');
});

test('builds YouVersion links for RVR1960 and KJV', () => {
  const r = refs('Juan 3:16-18')[0];
  assert.equal(youVersionUrl(r, 'es'), 'https://www.bible.com/bible/149/JHN.3.16-18.RVR1960');
  assert.equal(youVersionUrl(r, 'en'), 'https://www.bible.com/bible/1/JHN.3.16-18.KJV');
});

test('merges consecutive verses', () => {
  assert.deepEqual(compactVerses([[15, 15], [16, 16], [17, 17], [20, 20]]), [[15, 17], [20, 20]]);
});
