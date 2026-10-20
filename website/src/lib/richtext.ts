// Renders the inline markup used in the Confession and catechism files:
//   *text*   → italics (words supplied by the translators)
//   {text}   → translators' clarifications (kept, shown muted)
//   [^n]     → proof-text marker that opens note n
import { parseReferences, refsOnly, youVersionUrl, type Lang, type ScriptureRef } from './scripture.ts';
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export interface InlineOptions {
  /** Returns the popover id for note n, or null to drop the marker. */
  noteId?: (n: string) => string | null;
  noteLabel?: string;
}

export function renderInline(text: string, opts: InlineOptions = {}): string {
  return escape(text)
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\{([^{}]+)\}/g, '<span class="supplied">{$1}</span>')
    .replace(/\[\^(\d+)\]/g, (_m, n: string) => {
      const id = opts.noteId?.(n);
      if (!id) return '';
      return `<sup class="fn"><button type="button" class="fn-btn" popovertarget="${id}" aria-label="${escape(opts.noteLabel ?? 'Note')} ${n}">${n}</button></sup>`;
    });
}

/** Plain text without markup (for search snippets, meta descriptions, EPUB). */
export const plainText = (text: string) => text.replace(/\[\^\d+\]/g, '').replace(/\*([^*]+)\*/g, '$1');

/**
 * Beddome's answers cite Scripture in parentheses: «…» (Isa. 44:6). Turns each citation
 * into YouVersion links; "(Ibíd.)" points to the previous reference.
 */
export function linkCitations(html: string, lang: Lang, state: { last?: ScriptureRef } = {}): string {
  return html.replace(/\(([^()]*?)\)/g, (whole, inner: string) => {
    if (/^ib[ií]d\.?$/i.test(inner.trim())) {
      return state.last ? `(<a class="cite-ref" href="${youVersionUrl(state.last, lang)}" target="_blank" rel="noopener">${inner}</a>)` : whole;
    }
    if (!/\d/.test(inner)) return whole;
    const [refPart, version] = inner.split(/\s*(?=\[)/); // "Miq. 7:1 [RVR60]"
    const refs = refsOnly(parseReferences(refPart.replace(/<[^>]+>/g, '')));
    if (!refs.length) return whole;
    state.last = refs.at(-1);
    return `(<a class="cite-ref" href="${youVersionUrl(refs[0], lang)}" target="_blank" rel="noopener">${refPart}</a>${version ? ' ' + version : ''})`;
  });
}
