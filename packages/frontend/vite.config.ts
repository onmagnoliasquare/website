import * as child_process from 'node:child_process'
import adapterCloudflare from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { sveltekit } from '@sveltejs/kit/vite'
import { enhancedImages } from '@sveltejs/enhanced-img'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  plugins: [
    tailwindcss(),
    enhancedImages(),
    sveltekit({
      // Consult https://kit.svelte.dev/docs/integrations#preprocessors
      // for more information about preprocessors
      preprocess: vitePreprocess(),
      compilerOptions: { dev: true, modernAst: true, experimental: { async: true } },
      experimental: { remoteFunctions: true },
      paths: { relative: true },
      adapter: adapterCloudflare({ config: './wrangler.jsonc' }),
      // If you're looking for the `#lib` or `#components` aliases, those are
      // declared in `imports` in package.json and do NOT need to be defined here.
      version: {
        name: child_process.execSync('git rev-parse HEAD').toString().trim(),
      },
    }),
  ],
  define: { __ONMAGNOLIASQUARE_FRONTEND_VERSION__: `"${pkg.version}"` },
  build: { sourcemap: 'hidden', minify: true },
})
