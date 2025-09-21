/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  useTabs: false,
  endOfLine: 'auto',
  printWidth: 100,
  arrowParens: 'avoid',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'strict',
  bracketSpacing: true,
  insertPragma: false,
  requirePragma: false,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  parser: 'babel',
  jsxSingleQuote: false,
  vueIndentScriptAndStyle: false,
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  plugins: [
    'prettier-plugin-tailwindcss',
    // '@ianvs/prettier-plugin-sort-imports',
  ],
  // importOrder: ['^@lib/(.*)$', '', '^@components/(.*)$', '', '^[./]'],
  // importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  // importOrderTypeScriptVersion: '5.0.0',
  // importOrderCaseSensitive: false,
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.css',
      options: {
        parser: 'css',
      },
    },
    {
      files: '*.{js,mjs,cjs}',
      options: {
        parser: 'babel',
      },
    },
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.tsx',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
        tabWidth: 4,
      },
    },
    {
      files: '*.{yaml,yml}',
      options: {
        parser: 'yaml',
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
      },
    },
  ],
}

export default config
