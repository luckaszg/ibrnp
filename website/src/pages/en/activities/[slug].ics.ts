// Calendar file for one event (AC-3).
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { ics } from '../../../lib/events.ts';
import { pick } from '../../../i18n/ui.ts';
import { slugOf } from '../../../lib/content.ts';

const LANG = 'en';

export const getStaticPaths: GetStaticPaths = async () => (await getCollection('events')).map((event) => ({ params: { slug: slugOf(event.id) }, props: { event } }));

export const GET: APIRoute = ({ props, site }) => {
  const event = (props as { event: CollectionEntry<'events'> }).event;
  const body = ics(event, pick(event.data.title, LANG), pick(event.data.description, LANG), event.data.location ?? '', site!.toString());
  return new Response(body, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
