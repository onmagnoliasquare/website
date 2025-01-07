// Release version.
export const semVer = '0.6.0';

/**
 * `site` is an object used in various components and server
 * code that contains metadata defaults. These fields exist in this
 * variable file because, in the due case a rebrand must happen
 * or we move campuses again or the defaults of our brand change,
 * all that needs to happen is a manipulation of these variables!
 */
export const site = {
	// The URL should not contain a trailing slash `/`.
	url: 'https://onmagnoliasquare.com',
	locale: 'en-US',
	name: 'On Magnolia Square',
	title: 'On Magnolia Square',
	description: 'On Magnolia Square is a student journalism club at NYU Shanghai.',
	articleTags: ['student journalism', 'nyu shanghai', 'nyu', 'oms'],
	tags: ['student journalism', 'nyu shanghai', 'nyu', 'oms'],
	memberTags: ['nyu shanghai student', 'oms']
};

/**
 * `filler` is an object containing filler defaults—stuff that is
 * used throughout the code that acts as content defaults.
 */
export const filler = {
	memberDescription: 'is a contributor to On Magnolia Square'
};

export const baseText = 'block text-lg leading-relaxed tracking-wide';

export const email = 'onmagnoliasquare@gmail.com';
