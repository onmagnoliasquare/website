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
  }) as UserConfig
)

export default config
