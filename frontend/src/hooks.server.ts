/**
 * Routing code. These are SvelteKit hooks.
 * Defining hooks: https://kit.svelte.dev/docs/hooks
 * This is to run them in sequence: https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks
 *
 * FUNCTION NAME GUIDELINES:
 * - If the function logs something to console, prefix with "log".
 * - If the function redirects a URL, prefix with "redirect".
 */

import { SANITY_DATASET } from '$env/static/private';
import { getArticleTags, getOneTag, type Article, type Tag } from '$lib/sanity';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

/**
 * redirect redirects certain paths. This is not exactly necessary,
 * but it improves user experience.
 * TODO this might need to be refactored for efficiency boost. Simplify
 * the `else if` block.
 * @returns `Response`
 */
const redirect: Handle = async ({ event, resolve }) => {
	const isHome = event.url.pathname.startsWith('/home');
	const isTags =
		event.url.pathname.startsWith('/tags') && event.url.pathname.split('/').slice(1).length >= 3;
	try {
		if (isHome) {
			return new Response(null, { status: 301, headers: { location: '/' } });
		} else if (isTags) {
			// .slice(1) removes a leading '' empty string at the beginning of the array.
			const path: string[] = event.url.pathname.split('/').slice(1);

			/*
			 * Valid tag redirect paths require a length of exactly 3. As there
			 * are three components of a valid path:
			 * /tags/{tag-name}/{post-name}
			 */

			if (path.length > 4) {
				console.log(path);
				return new Response(null, { status: 302, headers: { location: '/tags' } });
			}

			// Get article from its name. This object will contain its tags, category, and series.

			// Check if the tag in the URL is a real tag.
			const tag: Tag = await getOneTag(path[0]);
			if (tag === null) {
				// If tag isn't found, return user to /tags
				return new Response(null, { status: 302, headers: { location: '/tags' } });
			}

			// Check if the article actually exists under that tag.
			const article: Article = await getArticleTags(path[1]);
			if (!article!.tags.some((t) => t.slug === path[1])) {
				// If the article isn't found, return user to /tags/{tag-name}
				return new Response(null, { status: 302, headers: { location: `/tags/${path[0]}` } });
			}

			// If everything is alright in the world, reroute the user
			// based on series or category precedence.

			const location = (article: Article) => {
				// Check if the article has a series
				// If there is no series for the article, sanity doesn't return a series field.
				if (article.series === null) {
					// Use category to populate response.
					return `/category/${article.category.slug}/${article.slug}`;
				}
				// Use series to populate response.
				return `/series/${article.series.slug}${article.slug}`;
			};

			return new Response(null, { status: 302, headers: { location: location(article) } });
		}
	} catch (error) {
		return new Response(null, { status: 500 });
	}

	return resolve(event);
};

/**
 * logSpeed logs a speed of route access. It only runs in development
 * environments. This function in particular is retrieved from:
 * https://joyofcode.xyz/sveltekit-hooks
 * @returns `Response`
 */
const logSpeed: Handle = async ({ event, resolve }) => {
	if (SANITY_DATASET !== 'production') {
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

export const handle = sequence(redirect, logSpeed);

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
