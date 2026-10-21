// Integrity checks for the doctrinal content files.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import YAML from 'yaml';
import { parseReferences, refsOnly, validateRef } from '../src/lib/scripture.ts';

const load = (dir: string) => fs.readdirSync(dir).sort().map((f) => YAML.parse(fs.readFileSync(`${dir}/${f}`, 'utf8')));

for (const lang of ['es', 'en']) {
  test(`Confession (${lang}): 32 chapters, every marker has a note and every note is used`, () => {
    const chapters = load(`content/confession/${lang}`);
    assert.equal(chapters.length, 32);
    for (const c of chapters) {
      const used = c.paragraphs.flatMap((p: { text: string }) => [...p.text.matchAll(/\[\^(\d+)\]/g)].map((m) => m[1]));
      for (const n of used) assert.ok(c.notes[n], `chapter ${c.chapter}: marker ${n} has no note`);
      for (const n of Object.keys(c.notes)) assert.ok(used.includes(n), `chapter ${c.chapter}: note ${n} is never referenced`);
      for (const cit of Object.values(c.notes) as string[]) {
        const r = refsOnly(parseReferences(cit));
        assert.ok(r.length > 0, `chapter ${c.chapter}: "${cit}" has no reference`);
        r.forEach(validateRef);
      }
    }
  });

  test(`Confession (${lang}): same paragraph count in both languages`, () => {
    const a = load('content/confession/es');
    const b = load(`content/confession/${lang}`);
    a.forEach((c, i) => assert.equal(b[i].paragraphs.length, c.paragraphs.length, `chapter ${c.chapter}`));
  });

  test(`Catechism (${lang}): 114 questions with answers`, () => {
    const qs = load(`content/catechism/${lang}`);
    assert.equal(qs.length, 114);
    qs.forEach((q, i) => {
      assert.equal(q.number, i + 1);
      assert.ok(q.question && q.answer, `question ${q.number} is incomplete`);
    });
  });
}
