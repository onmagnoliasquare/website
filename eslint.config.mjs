import svelte from 'eslint-plugin-svelte'
// import * as svelteParser from 'svelte-eslint-parser'
import ts from 'typescript-eslint'
import svelteConfig from './packages/frontend/svelte.config.js'
import globals from 'globals'
import sanityEslintConfig from '@sanity/eslint-config-studio'
import js from '@eslint/js'

export default [
  {
    ignores: [
      './**/*/.DS_Store',
      './**/*/node_modules',
      'packages/backend/.sanity',
      'packages/backend/dist',
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
    files: ['packages/backend/**/*.ts'],
  },
  ...sanityEslintConfig,
]
