// Site-wide settings from content/settings.yml, validated at build time.
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { z } from 'astro/zod';

const i18n = z.object({ es: z.string(), en: z.string().optional() });
const day = z.enum(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']);

const schema = z.object({
  placeholder: z.boolean().default(false),
  name: z.string(),
  shortName: z.string(),
  tagline: i18n,
  address: z.object({
    street: z.string(),
    city: z.string(),
    region: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string(),
  }),
  map: z.object({ lat: z.number(), lng: z.number() }),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  youtubeChannel: z.string().url().optional(),
  serviceTimes: z.array(z.object({ day, time: z.string().regex(/^\d{2}:\d{2}$/), label: i18n })),
  verse: z.object({
    es: z.object({ text: z.string(), reference: z.string() }),
    en: z.object({ text: z.string(), reference: z.string() }),
  }),
});

export type Settings = z.infer<typeof schema>;

function load(): Settings {
  const file = path.resolve('content/settings.yml');
  const result = schema.safeParse(YAML.parse(fs.readFileSync(file, 'utf8')));
  if (!result.success) {
    throw new Error(`content/settings.yml is invalid:\n${result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n')}`);
  }
  return result.data;
}

export const settings = load();

/** Whether the church has published an email or phone number. */
export const hasContactDetails = !!(settings.email || settings.phone);

/** The contact form needs an email-sending service (.env) or an address to fall back to (CT-1). */
export const contactFormAvailable = !!import.meta.env.PUBLIC_CONTACT_ENDPOINT || !!settings.email;
