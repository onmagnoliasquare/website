import {defineConfig} from 'vite'

import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  resolve: {
    alias: {
      '@': __dirname,
    },
  },
  define: {
    __OMS_CMS_VERSION__: `"${pkg.version}"`
  }
})
