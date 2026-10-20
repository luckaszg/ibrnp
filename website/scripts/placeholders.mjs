// Lists every content file still marked as placeholder (spec §8.2).
// Usage: npm run placeholders
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('content');
const found = [];
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    if (fs.statSync(file).isDirectory()) walk(file);
    else if (/\.(ya?ml|md)$/.test(name)) {
      const text = fs.readFileSync(file, 'utf8');
      if (/^placeholder:\s*true\s*$/m.test(text) || /\[(PROVISIONAL|PLACEHOLDER)/.test(text)) found.push(path.relative(process.cwd(), file));
    }
  }
};
walk(root);
if (found.length === 0) {
  console.log('No placeholder content left. ✓');
} else {
  console.log(`${found.length} file(s) still contain placeholder content:\n`);
  for (const f of found.sort()) console.log('  ' + f);
  console.log('\nReplace the text and remove "placeholder: true" (and any [PROVISIONAL] markers) from each file.');
}
