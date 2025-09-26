/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import js from '@eslint/js'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
import { includeIgnoreFile } from '@eslint/compat'
import ts from 'typescript-eslint'
import { fileURLToPath } from 'node:url'
import tsParser from '@typescript-eslint/parser'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

// See: https://github.com/eslint/eslint/discussions/16960#discussioncomment-11135633

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  // Ignore test files because they follow a particular DSL that doesn't
  // conform to ESLint's proclivities.
  globalIgnores(['**/*.test.ts', '**/playwright/**']),
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.svelte'],
      },
    },
  },
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
])
