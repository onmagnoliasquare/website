// Routing code. These are SvelteKit hooks.
// Defining hooks: https://kit.svelte.dev/docs/hooks
// This is to run them in sequence: https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks

import { SANITY_DATASET } from '$env/static/private';

import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const home: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/home')) {
		return new Response(null, { status: 301, headers: { location: '/' } });
	}

	return resolve(event);
};

// speed function retrieved from: https://joyofcode.xyz/sveltekit-hooks
// speed function is only enabled in development.
const speed: Handle = async ({ event, resolve }) => {
	if (SANITY_DATASET != 'production') {
		const route = event.url;

		const start = performance.now();
		const response = await resolve(event);
		const end = performance.now();

		const responseTime = end - start;

		if (responseTime > 2000) {
			console.log(`🐢 ${route} took ${responseTime.toFixed(2)} ms`);
		}

		if (responseTime < 1000) {
			console.log(`🚀 ${route} took ${responseTime.toFixed(2)} ms`);
		}
		return response;
	}

	return resolve(event);
};

export const handle = sequence(home, speed);

// MAYBE:
// Maybe also add a HTTP rewriter?
// export async function handleFetch({ request, fetch }) {
// 	if (request.url.startsWith('http')) {
// 		const url = request.url.replace('http', 'https');
// 		request = new Request(url, request);

// 		console.log(request.url); // https://joyofcode.xyz/ 👍

// 		// you can set the request headers
// 		request.headers.set('x-secure', 'Blessed');

// 		// you can pass cookies for cross-origin requests
// 		request.headers.set('cookie', event.request.headers.get('cookie'));
// 	}

// 	return fetch(request);
// }
