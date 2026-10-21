// Expands events (one-off and weekly) into dated occurrences for the calendar (AC-1, AC-2).
import type { CollectionEntry } from 'astro:content';

export interface Occurrence {
  event: CollectionEntry<'events'>;
  /** Local date-time strings, e.g. 2026-11-01T10:00 */
  start: string;
  end?: string;
  weekly: boolean;
}

const DAY_INDEX = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 } as const;

const ymd = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (s: string, n: number) => {
  const d = new Date(s.slice(0, 10) + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return ymd(d);
};

/** Occurrences between `from` (YYYY-MM-DD) and `from + days`. */
export function occurrences(events: CollectionEntry<'events'>[], from: string, days = 120): Occurrence[] {
  const to = addDays(from, days);
  const out: Occurrence[] = [];
  for (const event of events) {
    const { start, end, weekly } = event.data;
    const time = start.slice(10);
    const endTime = end?.slice(10);
    if (!weekly) {
      if (start.slice(0, 10) >= from && start.slice(0, 10) <= to) out.push({ event, start, end, weekly: false });
      continue;
    }
    const until = weekly.until && weekly.until < to ? weekly.until : to;
    let day = start.slice(0, 10) > from ? start.slice(0, 10) : from;
    while (day <= until) {
      const dow = new Date(day + 'T00:00:00Z').getUTCDay();
      if (weekly.days.some((d) => DAY_INDEX[d] === dow)) out.push({ event, start: day + time, end: endTime ? day + endTime : undefined, weekly: true });
      day = addDays(day, 1);
    }
  }
  return out.sort((a, b) => a.start.localeCompare(b.start));
}

export const today = () => ymd(new Date());

/** RFC 5545 calendar file for one event (AC-3). Times are floating (local). */
export function ics(event: CollectionEntry<'events'>, title: string, description: string, location: string, site: string) {
  const fmt = (s: string) => s.replace(/[-:]/g, '') + '00';
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, (m) => '\\' + m);
  const { start, end, weekly } = event.data;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//IBRNP//Sitio web//ES',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}@${new URL(site).host}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART:${fmt(start)}`,
    ...(end ? [`DTEND:${fmt(end)}`] : []),
    ...(weekly ? [`RRULE:FREQ=WEEKLY;BYDAY=${weekly.days.join(',')}${weekly.until ? `;UNTIL=${weekly.until.replace(/-/g, '')}T235959` : ''}`] : []),
    `SUMMARY:${esc(title)}`,
    ...(description ? [`DESCRIPTION:${esc(description)}`] : []),
    ...(location ? [`LOCATION:${esc(location)}`] : []),
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.join('\r\n') + '\r\n';
}
