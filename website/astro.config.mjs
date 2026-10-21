// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'node:path';

/** content/settings.yml is read once at startup, so restart the dev server when it changes. */
const reloadOnSettingsChange = {
  name: 'ibrnp:reload-settings',
  /** @param {import('vite').ViteDevServer} server */
  configureServer(server) {
    const file = path.resolve('content/settings.yml');
    server.watcher.add(file);
    server.watcher.on('change', (changed) => {
      if (path.resolve(changed) === file) server.restart();
    });
  },
};

export default defineConfig({
  // Set SITE_URL in .env to the church's domain (used for canonical URLs, sitemap and Open Graph).
  site: process.env.SITE_URL || 'https://www.ibrnp.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
  vite: { plugins: [reloadOnSettingsChange] },
});
