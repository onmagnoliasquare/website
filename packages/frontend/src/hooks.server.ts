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
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { Article } from '$lib/schema';
import { dev } from '$app/environment';

/**
 * redirectHome redirects `/home` to `/`.
 * @returns `Response`
 */
const redirectHome: Handle = async ({ event, resolve }) => {
	const isHome = event.url.pathname.startsWith('/home');
	if (isHome) {
		if (dev) {
			console.log('redirecting /home to /');
		}

		redirect(301, '/');
	}

	const response = await resolve(event);

	return response;
};

/**
 * redirectTag redirects paths of the form `/tags/(tag-slug)/(article-slug)`
 * to the category page of the article.
 * @returns `Response`
 */
export const redirectTag: Handle = async ({ event, resolve }) => {
	// Split a url's path by `/`, then return only the final element.
	const path: string[] = event.url.pathname.split('/').slice(2);

	// Determine if the pathname is actually for `tags`. If it isn't,
	// the function will just resolve normally in the middleware chain.
	const isTags = event.url.pathname.startsWith('/tags') && path.length >= 2;

	if (isTags) {
		// Redirect if there's nonsense at the end of the tags path. In other
		// words, redirect if there's more than /{tag-name}/{post-name}/more/...
		if (path.length >= 3) {
			redirect(302, '/tags');
		}

		const pathTag = path[0].toLowerCase();
		const pathArticleSlug = path[1].toLowerCase();

		// Get article from its slug. This object will contain the
		// article's tags, category, and series.
		const req = await event.fetch(`/api/article?slug=${pathArticleSlug}`);

		if (req.status === 404) {
			redirect(302, '/archive');
		}

		const article: Article = await req.json();

		// Check if article actually exists, based on the API query.
		if (article === null) {
			redirect(302, '/archive');
		}

		// Check if the article is in the array of tags it has.
		const articleHasTag: boolean = article.tags.some((t) => t.slug.current == pathTag);

		// Check if article has the appropriate tag on it.
		if (articleHasTag === false) {
			// If the article isn't found, return user to /tags/{tag-name}
			// perhaps also show modal - no tag found!
			redirect(302, '/archive');
		}

		// Respond with a category redirect when the tag name is valid,
		// and the article actually exists. In other words, send the user
		// to the article they requested.
		const categoryPath = `/category/${article.category.slug.current}/${pathArticleSlug}`;
		if (dev) {
			const out = `
TAG URL REDIRECT
  from: ${event.url.pathname}
  to:   ${categoryPath}
			`;
			console.log(out);
		}

		redirect(302, categoryPath);
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
		redirect(307, event.url.pathname.toLowerCase());
	}

	const response = await resolve(event);

	return response;
};

/**
 * preflightOptions returns a 200-ok response for OPTIONS requests.
 * This is a default hook that allows SvelteKit to function as a backend API.
 * See: https://www.jefmeijvis.com/blog/006-sveltekit-api-endpoints
 * @returns `Response`
 */
export const preflightOptions: Handle = async ({ event, resolve }) => {
	if (event.request.method !== 'OPTIONS') return await resolve(event);

	return new Response(new Blob(), { status: 200 });
};

/**
 * logSpeed logs a speed of route access. It only runs in development
 * environments. This function in particular is retrieved from:
 * https://joyofcode.xyz/sveltekit-hooks
 * @returns `Response`
 */
const logSpeed: Handle = async ({ event, resolve }) => {
	if (dev) {
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

export const handle = sequence(redirectCaps, redirectTag, redirectHome, preflightOptions, logSpeed);
