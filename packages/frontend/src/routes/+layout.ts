import type { LayoutLoad } from './$types';
import { site } from '$lib/variables';

// https://svelte.dev/docs/kit/load#Universal-vs-server-When-to-use-which
export const load: LayoutLoad = async ({ url, data }) => {
	// Choose locale metadata based on header or cookie.
	// Defaults to US English.
	let userLocale: string = data.chosenLocale
		? data.chosenLocale
		: data.acceptedLanguage
			? data.acceptedLanguage
			: site.locale;

	return {
		userLocale: userLocale
	};
};
