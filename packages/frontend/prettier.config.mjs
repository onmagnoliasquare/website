// import baseConfig from '../../prettier.config.mjs'

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  endOfLine: 'auto',
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
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
        svelteSortOrder: 'options-styles-scripts-markup',
        svelteBracketNewLine: false,
        svelteAllowShorthand: false,
        svelteIndentScriptAndStyle: false,
      },
    },
  ],
}

export default config
