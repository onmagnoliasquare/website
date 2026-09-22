import svelteParser from 'svelte-eslint-parser'
import { defineConfig, globalIgnores } from 'eslint/config'
import tsParser from '@typescript-eslint/parser'
import svelte from 'eslint-plugin-svelte'
import baseConfig from '../../eslint.config.mjs'
import svelteConfig from './svelte.config.js'
import ts from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
// import sanity from '@sanity-labs/eslint-plugin'

export default defineConfig([
  ...baseConfig,
  globalIgnores(['./src/lib/sanity/types.generated.ts', 'worker-configuration.d.ts']),
  // Other config for non-Svelte files
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  // Sanity GROQ
  // ...sanity.configs.recommended,
  // {
  //   settings: {
  //     sanity: {
  //       schemaPath: '../../cms/schema-generated.json',
  //     },
  //   },
  // },
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
