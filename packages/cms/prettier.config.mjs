import preset from '@sanity/prettier-config'
import baseConfig from '../../prettier.config.mjs'

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  ...baseConfig,
  ...preset,
  plugins: [...preset.plugins, 'prettier-plugin-tailwindcss'],
  experimentalTernaries: true,
}

export default config
