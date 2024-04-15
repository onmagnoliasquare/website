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
import { getArticleToValidate, type Article } from '$lib/sanity';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

/**
 * redirectHome redirects `/home` to `/`.
 * @returns `Response`
 */
const redirectHome: Handle = async ({ event, resolve }) => {
	const isHome = event.url.pathname.startsWith('/home');
	if (isHome) {
		if (SANITY_DATASET !== 'production') {
			console.log('redirection from /home to /');
		}
		throw redirect(301, '/');
	}

	const response = await resolve(event);

	return response;
};

/**
 * redirectTag redirects paths of the form `/tags/(tag-slug)/(article-slug)`
 * to the category page of the article.
 * @returns `Response`
 */
const redirectTag: Handle = async ({ event, resolve }) => {
	const path: string[] = event.url.pathname.split('/').slice(2);
	const isTags = event.url.pathname.startsWith('/tags') && path.length >= 2;
	try {
		if (isTags) {
			/*
			 * Valid tag redirect paths require a length of exactly 2. As there
			 * are two components of a valid path:
			 * /{tag-name}/{post-name}
			 */
			if (path.length >= 3) {
				return new Response(null, { status: 302, headers: { location: '/tags' } });
			}

			const pathTag = path[0];
			const pathArticleSlug = path[1];

			// Get article from its name. This object will contain its tags, category, and series.
			const article: Article = await getArticleToValidate(pathArticleSlug);

			// Check if article actually exists.
			if (article === null) {
				return new Response(null, { status: 302, headers: { location: '/tags' } });
			}

			const articleHasTag: boolean = article.tags.some((t) => t.slug.current == pathTag);

			// Check if article has the appropriate tag on it.
			if (articleHasTag === false) {
				// If the article isn't found, return user to /tags/{tag-name}
				// perhaps also show modal - no tag found!
				return new Response(null, { status: 302, headers: { location: `/tags` } });
			}

			// Respond with a category redirect.
			return new Response(null, {
				status: 302,
				headers: {
					location: `/category/${article.category.slug.current}/${pathArticleSlug}`
				}
			});
		}
	} catch (error) {
		return new Response(null, { status: 500 });
/**
 * redirectCaps checks if there's an uppercase in the path, then
 * turns all characters to lowercase and resolves it.
 * This does not actually affect `?q=` tags. Any parameter after the equals
 * is not matched for case. This is because the pathname does not include
 * the `?q=`, or the query.
 * This function was retrieved from:
 * https://github.com/sveltejs/kit/discussions/10207#discussioncomment-6279714
 * @returns `Resolve`
 */
const redirectCaps: Handle = async ({ event, resolve }) => {
	// redirect to lowercase URL if there's a capital letter in the pathname
	if (event.url.pathname.match(/[A-Z]/)) {
		throw redirect(307, event.url.pathname.toLowerCase());
	}

	const response = await resolve(event);

	return response;
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
	const response = await resolve(event);

	return response;
};

export const handle = sequence(redirectCaps, redirectTag, redirectHome, logSpeed);

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
