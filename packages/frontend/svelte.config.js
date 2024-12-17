import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapterCloudflare from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapterCloudflare({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		alias: {
			$components: 'src/components/*'
		}
	}
};

export default config;
