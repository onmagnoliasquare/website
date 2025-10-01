import studio from '@sanity/eslint-config-studio'
import {defineConfig} from 'eslint/config'
import baseConfig from '../../eslint.config.mjs'

export default defineConfig([
  ...baseConfig,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ...studio,
  {
    ignores: ['scripts/**/*', 'prettier.config.mjs', 'eslint.config.mjs', 'lint-staged.config.mjs'],
  },
])
