import { type ClientConfig, createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Environment variables, found in ".env". Check ".env.example" for explanation.
import type { Query } from './schema';
import { dev } from '$app/environment';

// if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
// 	throw new Error('Did you forget to run yarn run -T sanity init --env?');
// }

// if (!import.meta.env.PUBLIC_SANITY_API_VERSION) {
// 	throw new Error('Did you forget to add an API Version environment variable?');
// }

// It's okay to expose projectId
// See: https://www.sanity.io/answers/hello-quick-question-is-it-safe-to-commit-p1609342625280000
const config: ClientConfig = {
	projectId: '1ah7xxlt',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2024-09-20'
};

// Change the dataset if it is a development environment.
if (dev || import.meta.env.MODE === 'development') {
	config.dataset = 'development';
	config.useCdn = false;
} else if (import.meta.env.MODE === 'staging') {
	config.dataset = 'staging';
	config.useCdn = false;
}

export const client = createClient(config);

// Helps transform images from Sanity.
// See: https://www.sanity.io/docs/presenting-images#mY9Be3Ph
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
	return builder.image(source);
}

/**
 * Makes a request to the Sanity API with the given GROQ query string.
 * This wraps the `client.fetch()` function provided by Sanity, and
 * omits the need for a parameter. This is a pure function, and so it returns
 * rejected promises. This function **DOES NOT** catch errors like the
 * non-existence of something from the dataset. Instead, it catches
 * on the network/fetch/API level. The caller deals with the null/not found
 * error cases.
 * @param q The GROQ query string to run against the Sanity API.
 * @returns The result of the query as a JSON object.
 */
export async function sanityFetch(q: string): Promise<any> {
	try {
		return client.fetch(q);
	} catch (err: unknown) {
		if (err instanceof Error) {
			return Promise.reject(new Error(`Query failed, review query: ${q} - ${err.message}`));
		}

		return Promise.reject(new Error(`Query failed, review query: ${q} - Unknown error`));
	}
}

/**
 * Constructs a GROQ query string which checks if `leftSide` equals `rightSide`.
 * @param leftSide The left side of the equality operator.
 * @param rightSide The right side of the equality operator.
 * @returns A GROQ query string of the form `leftSide == rightSide`.
 */
export function equal(leftSide: string, rightSide: string | boolean): string {
	if (typeof rightSide === 'boolean') {
		return `${leftSide} == ${rightSide}`;
	}

	return `${leftSide} == "${rightSide}"`;
}

/**
 * Constructs a GROQ query string which checks if `leftSide` does not equal `rightSide`.
 * @param leftSide The left side of the inequality operator.
 * @param rightSide The right side of the inequality operator.
 * @returns A GROQ query string of the form `leftSide != rightSide`.
 */
export function unequal(leftSide: string, rightSide: string | boolean): string {
	if (typeof rightSide === 'boolean') {
		return `${leftSide} != ${rightSide}`;
	}

	return `${leftSide} != "${rightSide}"`;
}

/**
 * buildSanityQuery constructs a sanity query string which is passed
 * to `sanity` fetch functions. Keep in mind, there is a library for this:
 * https://github.com/FormidableLabs/groqd/tree/main/packages/groq-builder.
 * However, it would be unnecessary to include, because:
 *
 * - Our queries aren't too complex.
 * - It would require learning a new library.
 *
 * @param sq The sanity query to execute.
 * @returns a serialized query string.
 */
export function buildSanityQuery(sq: Query, resultsNum?: Number[]): string {
	const type = sq.type ? `_type == "${sq.type}"` : '';
	const conditions = sq.conditions ? getConditions(sq.conditions) : '';

	const idx = sq.idx ? getIdx(sq.idx) : '';

	// Combine both attributes and customAttributes.
	const allAttrs = getAttrs([
		...(sq.attributes ? sq.attributes : []),
		...(sq.customAttrs ? sq.customAttrs : [])
	]);

	const order = sq.order ? getOrder(sq.order) : '';

	const results = resultsNum ? ` [${resultsNum[0]}...${resultsNum[1]}]` : '';

	// `${[type, conditions].join(' && ')}` combines the type and
	// condition variables into a single string separated by the boolean
	// `and` operator.
	let query = `*[${conditions !== '' ? [type, conditions].join(' && ') : type}] ${order}${results} {${allAttrs}} ${idx}`;

	return query;
}

/**
 * getConditions takes an array of conditions (strings) and combines them into
 * a single string. Whitespace is trimmed from each string before
 * they are combined.
 * @param conditions The array of string conditions to combine.
 * @returns A single string containing all the conditions.
 */
export function getConditions(conditions: string[]): string {
	let newConditions = conditions.map((c) => {
		return c.trim();
	});

	return newConditions.join(' && ');
}

/**
 * `getIdx` should receive an array of two numbers. This array is then
 * used to generate a string containing the indexes to retrieve from the
 * Sanity backend.
 * @param values One to two element array.
 * @returns A formatted array string.
 */
export function getIdx(values: Number[]): string {
	let start, end: Number;

	start = values[0];

	if (values[1]) {
		end = values[1];
		return `[${start}..${end}]`;
	}

	return `[${start}]`;
}

/**
 * `getAttrs` takes an array of attributes (strings) and trims each string
 * before joining them into a single string separated by commas.
 * @param attrs An array of strings to be joined.
 * @returns A single string containing all the attributes.
 */
export function getAttrs(attrs: string[]): string {
	let newAttrs = attrs.map((a) => {
		return a.trim();
	});

	return newAttrs.join(',');
}

/**
 * `getOrder` takes a string and returns a string containing the order
 * argument that is properly formatted for the Sanity backend.
 * @param order The string to be formatted.
 * @returns A string containing the order argument.
 */
export function getOrder(order: string): string {
	return `| order(${order})`;
}
