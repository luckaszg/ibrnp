// Every page exists in both languages and the language switch targets exist (I-1, I-2).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ROUTES, routeAvailable, type RouteKey } from '../src/i18n/routes.ts';

const built = fs.existsSync('dist');

test('every route has a Spanish and an English path', () => {
  for (const [key, r] of Object.entries(ROUTES)) {
    assert.ok(r.es.startsWith('/') && !r.es.startsWith('/en/'), `${key}.es`);
    assert.ok(r.en.startsWith('/en/'), `${key}.en`);
  }
});

test('built site contains both language versions of every page', { skip: !built && 'run `npm run build` first' }, () => {
  for (const [key, r] of Object.entries(ROUTES)) {
    if (!routeAvailable(key as RouteKey)) continue; // optional page without text yet
    for (const p of [r.es, r.en]) assert.ok(fs.existsSync(`dist${p}index.html`), `${key}: dist${p}index.html`);
  }
});

test('language switch links point to existing pages', { skip: !built && 'run `npm run build` first' }, () => {
  const pages: string[] = [];
  const walk = (d: string) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(`${d}/${e.name}`) : e.name === 'index.html' && pages.push(`${d}/${e.name}`)));
  walk('dist');
  let checked = 0;
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    for (const m of html.matchAll(/<link rel="alternate" hreflang="(es|en)" href="https?:\/\/[^/]+([^"]*)"/g)) {
      const target = `dist${m[2]}${m[2].endsWith('/') ? '' : '/'}index.html`;
      assert.ok(fs.existsSync(target), `${file} → ${m[2]}`);
      checked++;
    }
  }
  assert.ok(checked > 600);
});
