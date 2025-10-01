import preset from '@sanity/prettier-config'
import baseConfig from '../../prettier.config.mjs'

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const config = {
  ...baseConfig,
  ...preset,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  plugins: [...preset.plugins, 'prettier-plugin-tailwindcss'],
  experimentalTernaries: true,
}

export default config
