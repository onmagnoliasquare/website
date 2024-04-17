/**
 * dateFormatter expects a string in the format YYYY/MM/DD,
 * which is the format that Sanity Content Lake stores dates.
 * This formatter changes the string into a usable format
 * that can be displayed on a page.
 * @param s date string in YYYY/MM/DD format
 * @returns `string` formatted date
 */
export const dateFormatter = (s: string): string => {
	const splitted: string[] = s.split('-');

	// subtract 1 from monthIndex because monthIndex is indexed 0 through 11.
	// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC#monthindex
	const utcDate = new Date(
		Date.UTC(parseInt(splitted[0]), parseInt(splitted[1]) - 1, parseInt(splitted[2]))
	);

	// Might need to change this to Intl.Date formatting.
	// Could also use Shanghai time caveat, for instance, time post was
	// made in Shanghai time.
	return utcDate.toDateString();
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
