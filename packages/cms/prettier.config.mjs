import preset from '@sanity/prettier-config'

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  ...preset,
  plugins: [...preset.plugins, 'prettier-plugin-tailwindcss'],
  experimentalTernaries: true,
}

export default config
