const createSiteTitle = (t: string | undefined): string => {
	const omsDefault = "On Magnolia Square"

	if (t) {
		// The dash below is an EN-DASH (U+2013)
		// More: https://www.fileformat.info/info/unicode/char/2013/index.htm
		return `${t} – ${omsDefault}`
	}

	return omsDefault
}

export default createSiteTitle;