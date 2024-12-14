import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import node from '@astrojs/node';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://kouzze.github.io',
  base: 'guest-experience-fe',
  integrations: [tailwind(), react()],
  output: 'server',

  adapter: cloudflare(),
});