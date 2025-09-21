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
  trailingComma: 'none',
  printWidth: 100,
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
        svelteSortOrder: 'options-styles-scripts-markup',
        svelteBracketNewLine: false,
        svelteAllowShorthand: false,
        svelteIndentScriptAndStyle: false
      }
    }
  ]
}

export default config
