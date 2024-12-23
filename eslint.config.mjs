import eslintPluginSvelte from 'eslint-plugin-svelte'
import * as svelteParser from 'svelte-eslint-parser'
import * as typescriptParser from '@typescript-eslint/parser'
import svelteConfig from './packages/frontend/svelte.config.js'
import globals from 'globals'
// import sanityEslintConfig from '@sanity/eslint-config-studio'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    files: ['packages/frontend/**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: typescriptParser,
        project: 'packages/frontend/tsconfig.json',
        extraFileExtensions: ['.svelte'],
        svelteConfig,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ignores: [
      '.DS_Store',
      'node_modules',
      '.svelte-kit',
      'test-results',
      'static',
      '.env',
      '.env.*',
      'yarn.lock',
      '**/.*',
      '**/*.config.{ts,js}',
    ],
  },
]
