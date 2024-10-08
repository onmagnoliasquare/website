/**
 * Routing code. These are SvelteKit hooks.
 * Defining hooks: https://kit.svelte.dev/docs/hooks
 * This is to run them in sequence: https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks
 *
 * FUNCTION NAME GUIDELINES:
 * - If the function logs something to console, prefix with "log".
 * - If the function redirects a URL, prefix with "redirect".
 *
 *
 * PATTERNS:
 * Any return for a function using resolve(event) must use the pattern
 * ```
 * const response = await resolve(event);
 * return response;
 * ```
 *
 * instead of using:
 * ```return resolve(event)```
 *
 * This ensures clarity.
 */

import { hasUppercase } from '$lib/helpers';
import { getArticleToValidate, type Article } from '$lib/sanity';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { isDevEnv } from './lib/sanity';

/**
 * redirectHome redirects `/home` to `/`.
 * @returns `Response`
 */
const redirectHome: Handle = async ({ event, resolve }) => {
	const isHome = event.url.pathname.startsWith('/home');
	if (isHome) {
		if (isDevEnv) {
			console.log('redirecting /home to /');
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

	if (isTags) {
		/*
		 * Valid tag redirect paths require a length of exactly 2. As there
		 * are two components of a valid path:
		 * /{tag-name}/{post-name}
		 */
		if (path.length >= 3) {
			throw redirect(302, '/tags');
		}

		const pathTag = path[0];
		const pathArticleSlug = path[1];

		// Get article from its name. This object will contain its tags, category, and series.
		const article: Article = await getArticleToValidate(pathArticleSlug);

		// Check if article actually exists.
		if (article === null) {
			throw redirect(302, '/tags');
		}

		const articleHasTag: boolean = article.tags.some((t) => t.slug.current == pathTag);

		// Check if article has the appropriate tag on it.
		if (articleHasTag === false) {
			// If the article isn't found, return user to /tags/{tag-name}
			// perhaps also show modal - no tag found!
			throw redirect(302, '/tags');
		}

		// Respond with a category redirect.
		const categoryPath = `/category/${article.category.slug.current}/${pathArticleSlug}`;
		if (isDevEnv) {
			const out = `tag URL redirecting...
	from: ${event.url.pathname}
	to:   ${categoryPath}
			`;
			console.log(out);
		}

		throw redirect(302, categoryPath);
	}

	const response = await resolve(event);

	return response;
};

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
	const uppercase: boolean = hasUppercase(event.url.pathname);
	if (uppercase) {
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
	if (import.meta.env.PUBLIC_SANITY_DATASET !== 'production') {
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
