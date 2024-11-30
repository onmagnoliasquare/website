// import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import adapterAuto from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapterAuto(),
		/**
		 * If we're in CI or DEV environments, use auto adapter.
		 * Else, build for cloudflare.
		 */
		// process.env.CI
		// 	? adapterAuto()
		// 	: // See: https://kit.svelte.dev/docs/adapter-cloudflare
		// 		adapterCloudflare({
		// 			// routes: {
		// 			// 	include: ['/*'],
		// 			// 	exclude: ['<all>']
		// 			// }
		// 		}),
		alias: {
			$components: 'src/components/*'
		}
	}
};

export default config;
