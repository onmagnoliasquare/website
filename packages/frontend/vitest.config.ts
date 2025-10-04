import { defineConfig, mergeConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config.ts'
import type { UserConfig } from 'vite'

// For how I created this setup, see the link below.
// See: https://github.com/vitest-dev/vitest/discussions/3042#discussioncomment-6449044

const config = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      ...configDefaults,
      setupFiles: ['./vitest-setup.js'],
      exclude: ['playwright/**/*', 'node_modules'],
      restoreMocks: true,
      pool: 'forks',
      isolate: false,
      environment: 'jsdom',
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
      projects: [
        {
          extends: true,
          test: {
            name: { label: 'server', color: 'blue' },
            environment: 'node',
            include: ['src/tests/server/**/*.{test,spec}.ts'],
            exclude: ['src/tests/client/**/*.{test,spec}.ts'],
          },
        },
        {
          extends: true,
          test: {
            name: { label: 'client', color: 'green' },
            include: ['src/tests/client/**/*.{test,spec}.ts'],
            exclude: ['src/tests/server/**/*.{test,spec}.ts'],
          },
        },
      ],
    },
  }) as UserConfig
)

export default config
