import type { DatetimeOptions } from 'sanity';

/**
 * dateFormatter expects a string in the format YYYY/MM/DD,
 * which is the format that Sanity Content Lake stores dates.
 * This formatter changes the string into a usable format
 * that can be displayed on a page.
 * @param date  string in YYYY/MM/DD format
 * @param locale locale language code, such as 'en-US', or an array of multiple. Check out documentation on documentation on the [locale argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument). If locale is undefined, the browser's default locale is used.
 * @returns `string` formatted date
 */
export const dateFormatter = (date: string, locale?: Intl.LocalesArgument): string => {
	const splitted: string[] = date.split('-');

	// Subtract 1 from monthIndex because monthIndex is indexed 0 through 11.
	// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC#monthindex
	const year: number = parseInt(splitted[0]);
	const month: number = parseInt(splitted[1]) - 1;
	const day: number = parseInt(splitted[2]);

	const utcDate = new Date(Date.UTC(year, month, day));

	// Using options.
	// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	let localeDate: Intl.DateTimeFormat;

	if (!locale) {
		localeDate = new Intl.DateTimeFormat(undefined, options);
	} else {
		localeDate = new Intl.DateTimeFormat(locale, options);
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
