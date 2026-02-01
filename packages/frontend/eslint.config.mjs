import svelteParser from 'svelte-eslint-parser'
import { defineConfig } from 'eslint/config'
import tsParser from '@typescript-eslint/parser'
import svelte from 'eslint-plugin-svelte'
import baseConfig from '../../eslint.config.mjs'
import svelteConfig from './svelte.config.js'
import ts from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  ...baseConfig,
  // Other config for non-Svelte files
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  // Svelte config
  ...svelte.configs.prettier,
  {
    files: [
      '**/*.svelte',
      '*.svelte',
      '**/*.svelte.js',
      '*.svelte.js',
      '**/*.svelte.ts',
      '*.svelte.ts',
    ],
    languageOptions: {
      parser: svelteParser,
      /**
       * Declare some parser options to parse the `<script>` portions of
       * `.svelte` type files.
       */
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        parser: tsParser,
        projectService: {
          allowDefaultProject: ['*.js'],
        },
        extraFileExtensions: ['.svelte'],
        svelteConfig,
      },
    },
  },
  eslintConfigPrettier,
])
