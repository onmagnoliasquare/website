import svelte from 'eslint-plugin-svelte'
// import * as svelteParser from 'svelte-eslint-parser'
import ts from 'typescript-eslint'
import svelteConfig from './packages/frontend/svelte.config.js'
import globals from 'globals'
import sanityEslintConfig from '@sanity/eslint-config-studio'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      // parser: svelteParser,
      parserOptions: {
        projectService: true,
        parser: ts.parser,
        project: 'packages/frontend/tsconfig.json',
        extraFileExtensions: ['.svelte'],
        svelteConfig,
      },
    },
  },
  {
    files: ['packages/backend/**/*'],
  },
  ...sanityEslintConfig,
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
      '.wrangler',
    ],
  },
]
