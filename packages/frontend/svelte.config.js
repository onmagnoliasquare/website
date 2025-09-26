import * as child_process from 'node:child_process'
import adapterCloudflare from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  compilerOptions: {
    dev: true,
    modernAst: true,
  },
  kit: {
    paths: {
      relative: true,
    },
    adapter: adapterCloudflare({
      config: './wrangler.toml',
    }),
    alias: {
      $components: 'src/components/*',

      // If you're looking for the `$lib` alias, that is automatically
      // defined by Svelte and does NOT need to be defined here.
    },
    version: {
      name: child_process.execSync('git rev-parse HEAD').toString().trim(),
    },
  },
}

export default config
