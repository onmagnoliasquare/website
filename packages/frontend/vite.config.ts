import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  define: {
    __ONMAGNOLIASQUARE_FRONTEND_VERSION__: `"${pkg.version}"`,
  },
})
