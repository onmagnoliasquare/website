import { sveltekit } from '@sveltejs/kit/vite'
import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  plugins: [tailwindcss(), enhancedImages(), sveltekit(), svelteTesting({ autoCleanup: true })],
  define: {
    __ONMAGNOLIASQUARE_FRONTEND_VERSION__: `"${pkg.version}"`,
  },
  optimizeDeps: {
    exclude: [
      '@portabletext/svelte',
      '@unpic/svelte',
      'svelte-meta-tags'
    ]
  },
})
