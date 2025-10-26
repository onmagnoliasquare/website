import {defineConfig, mergeConfig} from 'vitest/config'
import viteConfig from './vite.config'
import {UserConfig} from 'vite'

const config = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['lib/**/*.{test,spec}.{js,ts}'],
      environment: 'jsdom',
    },
  }) as UserConfig
)

export default config