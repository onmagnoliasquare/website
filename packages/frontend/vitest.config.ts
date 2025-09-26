import { defineConfig } from 'vitest/config'

export default defineConfig({
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
