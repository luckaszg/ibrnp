// Minimal EPUB 3 builder for the Confession and catechism downloads (RD-13).
import { zipSync, strToU8 } from 'fflate';

export interface EpubChapter {
  title: string;
  /** XHTML body content (already escaped). */
  body: string;
}

export interface EpubBook {
  id: string;
  title: string;
  author: string;
  lang: string;
  rights: string;
  chapters: EpubChapter[];
}

export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CSS = `body{font-family:serif;line-height:1.55;margin:0 1em}h1{font-size:1.6em;text-align:center;margin:1.5em 0 .2em}
h1 .n{display:block;font-size:2em;color:#8a6a32}.p{margin:0 0 1em;text-align:justify}.pn{font-family:sans-serif;font-size:.7em;font-weight:bold;color:#8a6a32}
sup{font-size:.65em;color:#8a6a32}.notes{font-size:.85em;border-top:1px solid #ccc;margin-top:2em;padding-top:1em}
.q{font-weight:bold;margin:1.2em 0 .3em}.a{margin:0 0 .6em}.sub dt{font-weight:bold;margin-top:.6em}.sub dd{margin:0 0 .2em 0}.credit{font-size:.8em;color:#555;text-align:center;margin-top:3em}`;

const page = (lang: string, title: string, body: string) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${lang}" lang="${lang}"><head><meta charset="UTF-8"/><title>${esc(title)}</title><link rel="stylesheet" href="style.css"/></head><body>${body}</body></html>`;

export function buildEpub(book: EpubBook): Uint8Array {
  const files: Record<string, Uint8Array | [Uint8Array, { level: 0 }]> = {};
  files['mimetype'] = [strToU8('application/epub+zip'), { level: 0 }];
  files['META-INF/container.xml'] = strToU8(
    '<?xml version="1.0" encoding="UTF-8"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>',
  );
  files['OEBPS/style.css'] = strToU8(CSS);
  const names = book.chapters.map((_, i) => `c${String(i + 1).padStart(3, '0')}.xhtml`);
  book.chapters.forEach((c, i) => (files[`OEBPS/${names[i]}`] = strToU8(page(book.lang, c.title, c.body))));
  files['OEBPS/nav.xhtml'] = strToU8(
    page(book.lang, book.title, `<nav epub:type="toc" id="toc"><h1>${esc(book.title)}</h1><ol>${book.chapters.map((c, i) => `<li><a href="${names[i]}">${esc(c.title)}</a></li>`).join('')}</ol></nav>`),
  );
  const modified = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  files['OEBPS/content.opf'] = strToU8(`<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="${book.lang}">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="bookid">${esc(book.id)}</dc:identifier><dc:title>${esc(book.title)}</dc:title><dc:creator>${esc(book.author)}</dc:creator><dc:language>${book.lang}</dc:language><dc:rights>${esc(book.rights)}</dc:rights><meta property="dcterms:modified">${modified}</meta></metadata>
<manifest><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/><item id="css" href="style.css" media-type="text/css"/>${names.map((n, i) => `<item id="c${i + 1}" href="${n}" media-type="application/xhtml+xml"/>`).join('')}</manifest>
<spine><itemref idref="nav"/>${names.map((_, i) => `<itemref idref="c${i + 1}"/>`).join('')}</spine></package>`);
  return zipSync(files as Parameters<typeof zipSync>[0]);
}
