import { site } from './variables';

const createSiteTitle = (t?: string): string => {
	if (t) {
		// The dash below is an EN-DASH (U+2013)
		// More: https://www.fileformat.info/info/unicode/char/2013/index.htm
		return `${t} – ${site.title}`;
	}

	return site.title;
};

export default createSiteTitle;
