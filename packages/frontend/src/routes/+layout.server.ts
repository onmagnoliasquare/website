import type { LayoutServerLoad } from './$types';

// This is the entry point of a typical HTTP GET response from a browser
// requesting a webpage. This file runs only on the server, and is responsible
// for retrieving the client's language or locale, which is used for setting
// appropriate date and time formats in certain components or adjusting
// translations for certain pages.
// See: https://poly-i18n.vercel.app/en/kitbook/docs/3-use-with-sveltekit
export const load: LayoutServerLoad = async ({ cookies, request }) => {
	// Retrieve the `locale-code` from both request headers and cookies.
	// `locale-code` is different from locale. A `locale-code` is a string
	// like `en_US` or `zh_CN`, which is a locale suffixed with a region.
	// A `locale` is something like `en` or `es`, with no suffix.
	const acceptedLanguage = request.headers.get('accept-language')?.split(',')[0].trim();
	const chosenLocale = cookies.get('locale');

	// The data returned here is implicitly passed to `+layout.ts`
	// because `layout.ts` exists. If it didn't exist, then the
	// data would just be passed to anything below this layout.
	return { acceptedLanguage, chosenLocale };
};
