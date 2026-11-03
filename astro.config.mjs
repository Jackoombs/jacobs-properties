// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      // Docker Desktop's bind mounts (gRPC-FUSE/VirtioFS) don't forward
      // native filesystem change events into the container, so Vite's
      // default watcher never sees host edits — poll instead. Only set
      // inside the dev container (docker-compose.yml sets CONTAINER=true);
      // host-side `astro dev` keeps the cheaper native watcher.
      watch: process.env.CONTAINER ? { usePolling: true, interval: 300 } : undefined
    }
  }
});