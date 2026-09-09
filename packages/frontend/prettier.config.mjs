import baseConfig from '../../prettier.config.mjs'

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  ...baseConfig,
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,
  // prettier-plugin-tailwindcss must be LAST in this array.
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app.css',
  endOfLine: 'auto',
  arrowParens: 'avoid',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'strict',
  bracketSpacing: true,
  insertPragma: false,
  requirePragma: false,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
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
        tabWidth: 2,
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
        bracketSameLine: true,
        // 'strict' cannot break between nested tags (e.g. <time><P>…) and displaces
        // the '>' instead. Scoped here rather than top level. Globally it would add
        // a rendering-visible space in error.html.
        htmlWhitespaceSensitivity: 'ignore',
        svelteSortOrder: 'options-styles-scripts-markup',
        svelteAllowShorthand: false,
        svelteIndentScriptAndStyle: false,
      },
    },
  ],
}

export default config
