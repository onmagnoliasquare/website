import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { svelteTesting } from '@testing-library/svelte/vite'
import { defineConfig } from 'vite'
import { defineConfig as testConfig } from 'vitest/config'

import pkg from './package.json' with { type: 'json' }

const tstConfig = testConfig({
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'node',
    setupFiles: ['./vitest-setup.js'],
    restoreMocks: true,
    pool: 'forks',
    isolate: false,
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    server: {
      deps: {
        inline: [`@sveltejs/kit`],
      },
    },
  },
})

const config = defineConfig({
  plugins: [tailwindcss(), sveltekit(), svelteTesting({ autoCleanup: true })],
  define: {
    __ONMAGNOLIASQUARE_FRONTEND_VERSION__: `"${pkg.version}"`,
  },
})

export default {
  ...tstConfig,
  ...config,
}
