/**
 * PLEASE KEEP THE FUNCTIONS IN THIS FILE PURE!!!
 * NO SIDE EFFECTS PLEASE.
 */

import type { Member } from './schema';

/**
 * dateFormatter expects a string in the format YYYY/MM/DD,
 * which is the format that Sanity Content Lake stores dates.
 * This formatter changes the string into a usable format
 * that can be displayed on a page.
 * @param date  string in YYYY/MM/DD format
 * @param locale locale language code, such as 'en-US', or an array of multiple. Check out documentation on documentation on the [locale argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument). If locale is undefined, the browser's default locale is used.
 * @returns `string` formatted date
 */
export const dateFormatter = (
	date: string,
	locale?: Intl.LocalesArgument,
	options?: Intl.DateTimeFormatOptions
): string => {
	const splitted: string[] = date.split('-');

	// Subtract 1 from monthIndex because monthIndex is indexed 0 through 11.
	// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC#monthindex
	const year: number = parseInt(splitted[0]);
	const month: number = parseInt(splitted[1]) - 1;
	const day: number = parseInt(splitted[2]);

	const utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0));

	// Using options.
	// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options
	if (!options) {
		options = {
			weekday: 'short',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
	}

	let localeDate: Intl.DateTimeFormat;

	if (!locale) {
		localeDate = new Intl.DateTimeFormat(undefined, options);
	} else {
		localeDate = new Intl.DateTimeFormat(locale as string, options);
	}

	return localeDate.format(utcDate);
};

/**
 * hasUppercase checks if there are any uppercase characters
 * in string p.
 * @param p path string
 * @returns `boolean`
 */
export const hasUppercase = (p: string): boolean => {
	const m: RegExpMatchArray | null = p.match(/[A-Z]/);
	return m ? true : false;
};

/**
 * createAuthorString creates an author string from
 * an array of authors.
 * @param a authors array
 * @returns `string`
 */
export const createAuthorString = (a: Member[]): string => {
	let authorString = '';

	for (let i = 0; i < a.length; i++) {
		authorString = authorString.concat(a[i].name, ', ');
	}

	authorString = authorString.slice(0, -2);

	return authorString;
};

/**
 * createAuthorLink generates a URL to an author's profile page.
 * @param url The base URL of the website, often `site` from `variables.ts`
 * @param slug The author's unique slug string from Sanity
 * @returns A string representing the full URL to the author's profile page
 */
export const createAuthorLink = (url: string, slug: string): string => {
	return `${url}/about/staff/${slug}`;
};

/**
 * createSiteTitle creates a formatted site title by appending
 * a provided title to the site's name with an EN-DASH in between.
 * If no title is provided, it returns the site's name.
 * @param name - The name of the site
 * @param title - An optional title to append
 * @returns A formatted string representing the complete site title
 */
export const createSiteTitle = (name: string, title?: string): string => {
	if (title) {
		// The dash below is an EN-DASH (U+2013)
		// More: https://www.fileformat.info/info/unicode/char/2013/index.htm
		return `${title} – ${name}`;
	}

	return name;
};

/**
 * getFlagEmoji retrieves the flag emoji of a specified
 * country using code points and `.replace`.
 * Modified from:
 * https://dev.to/jorik/country-code-to-flag-emoji-a21#comment-1d92e
 * @param countryCode ISO-3166 alpha-2 format country code
 * @returns `string` flag emoji
 */
export const getFlagEmoji = (countryCode: string): string => {
	return (
		countryCode
			.toUpperCase()
			//@ts-ignore
			.replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()))
	);
};

/**
 * getCountryName retrieves the country name of
 * a country, as determined by `Intl.DisplayNames`.
 * Modified from:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames
 * @param countryCode ISO-3166 alpha-2 format country code
 * @param locale retrieved from browser
 * @returns `string` country name
 */
export const getCountryName = (countryCode: string, locale: string): string | undefined => {
	let name = new Intl.DisplayNames([locale], { type: 'region' });
	return name.of(countryCode);
};

/**
 * parseEmbedLink returns a string that is usable by the
 * dependency `sveltekit-embed`. The dependency exposes
 * multiple components that accept links to embed embedded
 * content from different sources, like Spotify. The components
 * require the strings to be chopped in a certain style.
 * This function returns this formatting. See:
 * https://sveltekit-embed.pages.dev/. In the future, there may
 * be updates to URL domains and paths. I really hope this does
 * not happen, and I doubt it will. Any sane company will not do
 * this unless absolutely necessary.
 * @param url given URL, retrieved from Sanity
 * @returns `string` formatted link
 */
export const parseEmbedLink = (url: string): EmbeddedLinkAttributes => {
	// This builds a long string of `or` boolean expressions for
	// `RegExp()` parameter input.
	const domainNames = sourcesList.join('|');

	// Defines the regex expression to seek for what we want.
	const name = new RegExp(`(${domainNames})(\/*)?`, 'i');

	// Search the string for a name from the list of domain names.
	let match = url.match(name)!;

	// If there's no match...
	if (!match) {
		return {
			name: url,
			path: url
		};
	}

	// switch statements are faster than 'if'.
	switch (match[0]) {
		case 'anchorfm':
		case 'buzzsprout':
		case 'codepen':
		case 'deezer':
		case 'gist':
		case 'guild':
		case 'relive':
		case 'simplecast':
		case 'slides':
		case 'spotify':
			return {
				name: match[0],

				// Extracts the last part of the spotify URL.
				path: url.split('/').slice(-2).join('/')
			};
		case 'stackblitz':

		/**
		 * TikTok requires the extraction of the `webid`, which
		 * is just a query in the URL. The very last part.
		 */
		// eslint-disable-next-line no-fallthrough
		case 'tiktok':
		case 'toot':
		case 'tweet':
		case 'vimeo':
		case 'youtube':
		case 'zencastr':
		case 'soundcloud':
		case 'genericembed':
		default:
			return {
				name: url,
				path: url
			};
	}
};

interface EmbeddedLinkAttributes {
	name?: string;
	path?: string;
}

/**
 * These are the sources supported by `sveltekit-embed`.
 * Notice the lack of `instagram`. Instagram, or more
 * specifically Meta, requires their own API verification to
 * use their embed API.
 */
export const sourcesList = [
	'anchorfm',
	'bluesky',
	'buzzsprout',
	'codepen',
	'deezer',
	'genericembed',
	'gist',
	'guild',
	'relive',
	'simplecast',
	'slides',
	'soundcloud',
	'spotify',
	'stackblitz',
	'tiktok',
	'toot',
	'tweet',
	'vimeo',
	'youtube',
	'zencastr'
];

/**
 * domainFromUrl strips a URL of any extra paths or
 * protocols using a regex query. Currently, this function
 * does not check if the URL is valid, because that
 * is handled in the backend. This should be validated on the
 * frontend, though.
 * @param url the url to strip
 * @returns domain name and TLD
 */
export const domainFromUrl = (url: string): string => {
	let parts = new URL(url).hostname.split('.');

	// Remove initial www. In fact, who even uses this
	// anymore? It's for old heads.
	if (parts[0] === 'www' || parts[0] === 'www1') {
		parts = parts.slice(1);
	}

	if (parts.length >= 2) {
		return `${parts.slice(-parts.length).join('.')}`;
	}

	return 'website';
};
