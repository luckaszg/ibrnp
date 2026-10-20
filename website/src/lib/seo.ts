// Structured data (SO-2).
import { settings } from './settings.ts';
import type { Lang } from './scripture.ts';

const DAY = { MO: 'Monday', TU: 'Tuesday', WE: 'Wednesday', TH: 'Thursday', FR: 'Friday', SA: 'Saturday', SU: 'Sunday' } as const;

export function churchJsonLd(lang: Lang, site: URL) {
  const a = settings.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: settings.name,
    alternateName: settings.shortName,
    description: settings.tagline[lang] ?? settings.tagline.es,
    url: new URL(lang === 'es' ? '/' : '/en/', site).toString(),
    logo: new URL('/og-image.png', site).toString(),
    email: settings.email,
    telephone: settings.phone,
    address: { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.city, addressRegion: a.region, postalCode: a.postalCode, addressCountry: a.country },
    geo: { '@type': 'GeoCoordinates', latitude: settings.map.lat, longitude: settings.map.lng },
    event: settings.serviceTimes.map((s) => ({
      '@type': 'Event',
      name: s.label[lang] ?? s.label.es,
      eventSchedule: { '@type': 'Schedule', byDay: `https://schema.org/${DAY[s.day]}`, startTime: s.time, repeatFrequency: 'P1W' },
      location: { '@type': 'Place', name: settings.name, address: a.street },
    })),
  };
}
