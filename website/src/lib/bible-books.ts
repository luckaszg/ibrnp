// The 66 books of the Protestant canon, in canonical order.
// `code` is the USFM book code used by YouVersion URLs.
// `es`/`en` are display names; `esAbbr`/`enAbbr` are the short forms used in citations.
// `aliases` are extra spellings accepted by the parser (accents and case are ignored).

export interface BibleBook {
  code: string;
  chapters: number;
  es: string;
  en: string;
  esAbbr: string;
  enAbbr: string;
  aliases: string[];
}

export const BOOKS: BibleBook[] = [
  { code: 'GEN', chapters: 50, es: 'Génesis', en: 'Genesis', esAbbr: 'Gén.', enAbbr: 'Gen.', aliases: ['Gn', 'Ge'] },
  { code: 'EXO', chapters: 40, es: 'Éxodo', en: 'Exodus', esAbbr: 'Éx.', enAbbr: 'Exod.', aliases: ['Exo', 'Ex'] },
  { code: 'LEV', chapters: 27, es: 'Levítico', en: 'Leviticus', esAbbr: 'Lv.', enAbbr: 'Lev.', aliases: ['Lev', 'Le'] },
  { code: 'NUM', chapters: 36, es: 'Números', en: 'Numbers', esAbbr: 'Nm.', enAbbr: 'Num.', aliases: ['Num', 'Nu'] },
  { code: 'DEU', chapters: 34, es: 'Deuteronomio', en: 'Deuteronomy', esAbbr: 'Dt.', enAbbr: 'Deut.', aliases: ['Deu', 'Deut', 'Dt'] },
  { code: 'JOS', chapters: 24, es: 'Josué', en: 'Joshua', esAbbr: 'Jos.', enAbbr: 'Josh.', aliases: ['Jos', 'Josh'] },
  { code: 'JDG', chapters: 21, es: 'Jueces', en: 'Judges', esAbbr: 'Jue.', enAbbr: 'Judg.', aliases: ['Jue', 'Jc', 'Judg', 'Jdg'] },
  { code: 'RUT', chapters: 4, es: 'Rut', en: 'Ruth', esAbbr: 'Rt.', enAbbr: 'Ruth', aliases: ['Rt'] },
  { code: '1SA', chapters: 31, es: '1 Samuel', en: '1 Samuel', esAbbr: '1 S.', enAbbr: '1 Sam.', aliases: ['1 Sam', '1 S', '1 Sa'] },
  { code: '2SA', chapters: 24, es: '2 Samuel', en: '2 Samuel', esAbbr: '2 S.', enAbbr: '2 Sam.', aliases: ['2 Sam', '2 S', '2 Sa'] },
  { code: '1KI', chapters: 22, es: '1 Reyes', en: '1 Kings', esAbbr: '1 R.', enAbbr: '1 Kgs.', aliases: ['1 Rey', '1 R', '1 Kgs', '1 Ki'] },
  { code: '2KI', chapters: 25, es: '2 Reyes', en: '2 Kings', esAbbr: '2 R.', enAbbr: '2 Kgs.', aliases: ['2 Rey', '2 R', '2 Kgs', '2 Ki'] },
  { code: '1CH', chapters: 29, es: '1 Crónicas', en: '1 Chronicles', esAbbr: '1 Cr.', enAbbr: '1 Chron.', aliases: ['1 Cro', '1 Cr', '1 Chron', '1 Chr'] },
  { code: '2CH', chapters: 36, es: '2 Crónicas', en: '2 Chronicles', esAbbr: '2 Cr.', enAbbr: '2 Chron.', aliases: ['2 Cro', '2 Cr', '2 Chron', '2 Chr'] },
  { code: 'EZR', chapters: 10, es: 'Esdras', en: 'Ezra', esAbbr: 'Esd.', enAbbr: 'Ezra', aliases: ['Esd'] },
  { code: 'NEH', chapters: 13, es: 'Nehemías', en: 'Nehemiah', esAbbr: 'Neh.', enAbbr: 'Neh.', aliases: ['Neh'] },
  { code: 'EST', chapters: 10, es: 'Ester', en: 'Esther', esAbbr: 'Est.', enAbbr: 'Esth.', aliases: ['Est', 'Esth'] },
  { code: 'JOB', chapters: 42, es: 'Job', en: 'Job', esAbbr: 'Job', enAbbr: 'Job', aliases: [] },
  { code: 'PSA', chapters: 150, es: 'Salmos', en: 'Psalms', esAbbr: 'Sal.', enAbbr: 'Ps.', aliases: ['Sal', 'Salmo', 'Ps', 'Psa', 'Psalm'] },
  { code: 'PRO', chapters: 31, es: 'Proverbios', en: 'Proverbs', esAbbr: 'Pr.', enAbbr: 'Prov.', aliases: ['Pro', 'Pr', 'Prov'] },
  { code: 'ECC', chapters: 12, es: 'Eclesiastés', en: 'Ecclesiastes', esAbbr: 'Ec.', enAbbr: 'Eccl.', aliases: ['Ecl', 'Ec', 'Eccl', 'Eccles'] },
  { code: 'SNG', chapters: 8, es: 'Cantares', en: 'Song of Solomon', esAbbr: 'Cnt.', enAbbr: 'Song', aliases: ['Cnt', 'Cant', 'Cantar de los Cantares', 'Song of Songs', 'Song'] },
  { code: 'ISA', chapters: 66, es: 'Isaías', en: 'Isaiah', esAbbr: 'Is.', enAbbr: 'Isa.', aliases: ['Isa', 'Is'] },
  { code: 'JER', chapters: 52, es: 'Jeremías', en: 'Jeremiah', esAbbr: 'Jer.', enAbbr: 'Jer.', aliases: ['Jer'] },
  { code: 'LAM', chapters: 5, es: 'Lamentaciones', en: 'Lamentations', esAbbr: 'Lm.', enAbbr: 'Lam.', aliases: ['Lam', 'Lm'] },
  { code: 'EZK', chapters: 48, es: 'Ezequiel', en: 'Ezekiel', esAbbr: 'Ez.', enAbbr: 'Ezek.', aliases: ['Eze', 'Ez', 'Ezek'] },
  { code: 'DAN', chapters: 12, es: 'Daniel', en: 'Daniel', esAbbr: 'Dn.', enAbbr: 'Dan.', aliases: ['Dan', 'Dn'] },
  { code: 'HOS', chapters: 14, es: 'Oseas', en: 'Hosea', esAbbr: 'Os.', enAbbr: 'Hos.', aliases: ['Os', 'Ose', 'Hos'] },
  { code: 'JOL', chapters: 3, es: 'Joel', en: 'Joel', esAbbr: 'Jl.', enAbbr: 'Joel', aliases: ['Jl', 'Joe'] },
  { code: 'AMO', chapters: 9, es: 'Amós', en: 'Amos', esAbbr: 'Am.', enAbbr: 'Amos', aliases: ['Am'] },
  { code: 'OBA', chapters: 1, es: 'Abdías', en: 'Obadiah', esAbbr: 'Abd.', enAbbr: 'Obad.', aliases: ['Abd', 'Obad', 'Ob'] },
  { code: 'JON', chapters: 4, es: 'Jonás', en: 'Jonah', esAbbr: 'Jon.', enAbbr: 'Jonah', aliases: ['Jon'] },
  { code: 'MIC', chapters: 7, es: 'Miqueas', en: 'Micah', esAbbr: 'Mi.', enAbbr: 'Mic.', aliases: ['Miq', 'Mi', 'Mic'] },
  { code: 'NAM', chapters: 3, es: 'Nahúm', en: 'Nahum', esAbbr: 'Nah.', enAbbr: 'Nah.', aliases: ['Nah'] },
  { code: 'HAB', chapters: 3, es: 'Habacuc', en: 'Habakkuk', esAbbr: 'Hab.', enAbbr: 'Hab.', aliases: ['Hab'] },
  { code: 'ZEP', chapters: 3, es: 'Sofonías', en: 'Zephaniah', esAbbr: 'Sof.', enAbbr: 'Zeph.', aliases: ['Sof', 'Zeph'] },
  { code: 'HAG', chapters: 2, es: 'Hageo', en: 'Haggai', esAbbr: 'Hag.', enAbbr: 'Hag.', aliases: ['Hag'] },
  { code: 'ZEC', chapters: 14, es: 'Zacarías', en: 'Zechariah', esAbbr: 'Zac.', enAbbr: 'Zech.', aliases: ['Zac', 'Zech'] },
  { code: 'MAL', chapters: 4, es: 'Malaquías', en: 'Malachi', esAbbr: 'Mal.', enAbbr: 'Mal.', aliases: ['Mal'] },
  { code: 'MAT', chapters: 28, es: 'Mateo', en: 'Matthew', esAbbr: 'Mt.', enAbbr: 'Matt.', aliases: ['Mat', 'Mt', 'Matt'] },
  { code: 'MRK', chapters: 16, es: 'Marcos', en: 'Mark', esAbbr: 'Mr.', enAbbr: 'Mark', aliases: ['Mar', 'Mr', 'Mc', 'Mk'] },
  { code: 'LUK', chapters: 24, es: 'Lucas', en: 'Luke', esAbbr: 'Lc.', enAbbr: 'Luke', aliases: ['Luc', 'Lc', 'Lk'] },
  { code: 'JHN', chapters: 21, es: 'Juan', en: 'John', esAbbr: 'Jn.', enAbbr: 'John', aliases: ['Jua', 'Jn'] },
  { code: 'ACT', chapters: 28, es: 'Hechos', en: 'Acts', esAbbr: 'Hch.', enAbbr: 'Acts', aliases: ['Hch', 'Hech', 'Hechos de los Apóstoles'] },
  { code: 'ROM', chapters: 16, es: 'Romanos', en: 'Romans', esAbbr: 'Ro.', enAbbr: 'Rom.', aliases: ['Rom', 'Ro'] },
  { code: '1CO', chapters: 16, es: '1 Corintios', en: '1 Corinthians', esAbbr: '1 Co.', enAbbr: '1 Cor.', aliases: ['1 Cor', '1 Co'] },
  { code: '2CO', chapters: 13, es: '2 Corintios', en: '2 Corinthians', esAbbr: '2 Co.', enAbbr: '2 Cor.', aliases: ['2 Cor', '2 Co'] },
  { code: 'GAL', chapters: 6, es: 'Gálatas', en: 'Galatians', esAbbr: 'Gá.', enAbbr: 'Gal.', aliases: ['Gal', 'Ga'] },
  { code: 'EPH', chapters: 6, es: 'Efesios', en: 'Ephesians', esAbbr: 'Ef.', enAbbr: 'Eph.', aliases: ['Efe', 'Ef', 'Eph'] },
  { code: 'PHP', chapters: 4, es: 'Filipenses', en: 'Philippians', esAbbr: 'Fil.', enAbbr: 'Phil.', aliases: ['Fil', 'Flp', 'Phil'] },
  { code: 'COL', chapters: 4, es: 'Colosenses', en: 'Colossians', esAbbr: 'Col.', enAbbr: 'Col.', aliases: ['Col'] },
  { code: '1TH', chapters: 5, es: '1 Tesalonicenses', en: '1 Thessalonians', esAbbr: '1 Ts.', enAbbr: '1 Thess.', aliases: ['1 Tes', '1 Ts', '1 Thess', '1 Th'] },
  { code: '2TH', chapters: 3, es: '2 Tesalonicenses', en: '2 Thessalonians', esAbbr: '2 Ts.', enAbbr: '2 Thess.', aliases: ['2 Tes', '2 Ts', '2 Thess', '2 Th'] },
  { code: '1TI', chapters: 6, es: '1 Timoteo', en: '1 Timothy', esAbbr: '1 Ti.', enAbbr: '1 Tim.', aliases: ['1 Tim', '1 Ti'] },
  { code: '2TI', chapters: 4, es: '2 Timoteo', en: '2 Timothy', esAbbr: '2 Ti.', enAbbr: '2 Tim.', aliases: ['2 Tim', '2 Ti'] },
  { code: 'TIT', chapters: 3, es: 'Tito', en: 'Titus', esAbbr: 'Tit.', enAbbr: 'Titus', aliases: ['Tit'] },
  { code: 'PHM', chapters: 1, es: 'Filemón', en: 'Philemon', esAbbr: 'Flm.', enAbbr: 'Philem.', aliases: ['Flm', 'Philem', 'Phlm'] },
  { code: 'HEB', chapters: 13, es: 'Hebreos', en: 'Hebrews', esAbbr: 'He.', enAbbr: 'Heb.', aliases: ['Heb', 'He'] },
  { code: 'JAS', chapters: 5, es: 'Santiago', en: 'James', esAbbr: 'Stg.', enAbbr: 'Jas.', aliases: ['Stg', 'Sant', 'Jas'] },
  { code: '1PE', chapters: 5, es: '1 Pedro', en: '1 Peter', esAbbr: '1 P.', enAbbr: '1 Pet.', aliases: ['1 Ped', '1 P', '1 Pet', '1 Pe'] },
  { code: '2PE', chapters: 3, es: '2 Pedro', en: '2 Peter', esAbbr: '2 P.', enAbbr: '2 Pet.', aliases: ['2 Ped', '2 P', '2 Pet', '2 Pe'] },
  { code: '1JN', chapters: 5, es: '1 Juan', en: '1 John', esAbbr: '1 Jn.', enAbbr: '1 John', aliases: ['1 Jua', '1 Jn'] },
  { code: '2JN', chapters: 1, es: '2 Juan', en: '2 John', esAbbr: '2 Jn.', enAbbr: '2 John', aliases: ['2 Jua', '2 Jn'] },
  { code: '3JN', chapters: 1, es: '3 Juan', en: '3 John', esAbbr: '3 Jn.', enAbbr: '3 John', aliases: ['3 Jua', '3 Jn'] },
  { code: 'JUD', chapters: 1, es: 'Judas', en: 'Jude', esAbbr: 'Jud.', enAbbr: 'Jude', aliases: ['Jud'] },
  { code: 'REV', chapters: 22, es: 'Apocalipsis', en: 'Revelation', esAbbr: 'Ap.', enAbbr: 'Rev.', aliases: ['Apo', 'Ap', 'Apoc', 'Rev'] },
];

export const BOOK_BY_CODE = new Map(BOOKS.map((b) => [b.code, b]));
