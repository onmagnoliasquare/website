import js from '@eslint/js'
import sanityEslintConfig from '@sanity/eslint-config-studio'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
// import * as svelteParser from 'svelte-eslint-parser'
import ts from 'typescript-eslint'

import svelteConfig from './packages/frontend/svelte.config.js'

export default [
  {
    ignores: [
      './**/*/.DS_Store',
      './**/*/node_modules',
      'packages/cms/.sanity',
      'packages/cms/dist',
      'packages/frontend/.svelte-kit',
      'packages/frontend/test-results',
      './**/*/static',
      '**/*.env',
      '**/*.env.*',
      '**/*/yarn.lock',
      '**/.*',
      '**/*.config.{ts,js}',
      '**/*.wrangler',
    ],
  },
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
  // See: https://github.com/eslint/eslint/discussions/16960#discussioncomment-11135633
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
    files: ['packages/cms/**/*.ts'],
  },
  ...sanityEslintConfig,
]
