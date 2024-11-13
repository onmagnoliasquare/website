import { type ClientConfig, createClient, SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import groq from 'groq';

// Environment variables, found in ".env". Check ".env.example" for explanation.
import type { Article, Category, Member, Series, Tag } from './schema';

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
// const config: ClientConfig = {
// 	projectId: SANITY_PROJECT_ID,
// 	dataset: SANITY_DATASET,
// 	useCdn: true,
// 	apiVersion: SANITY_API_VERSION
// };

// Get runtime from Vite's prescribed environment.
// See: https://vitejs.dev/guide/env-and-mode
export const isDevEnv: boolean = import.meta.env.DEV;

// Change the dataset if it is a development environment.
if (isDevEnv) {
	// config.token = SANITY_DEVELOPER_TOKEN;
	config.dataset = 'development';
	config.useCdn = false;
}

// config.dataset = 'production';

export const client: SanityClient = createClient(config);

// Helps transform images from Sanity.
// See: https://www.sanity.io/docs/presenting-images#mY9Be3Ph
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
	return builder.image(source);
}

/**
 * getArticles, that is "Article" with an "s" for plural, returns all articles.
 * This is probably only for testing purposes. This is effectively equivalent
 * to detonating a nuke on the API.
 * @returns `Promise<Article[]>`
 * @async
 */
export async function getArticles(): Promise<Article[]> {
	return await client.fetch(
		groq`*[_type == "article"]{ title,
		category->{name}, slug } | order(_createdAt desc)`
	);
}

export async function getHomepageArticles(): Promise<Article[]> {
	return await client.fetch(
		groq`*[_type == "article" && wasDeleted != true && isDraft != true] | order(date desc){
  			title,
  			subtitle,
  			date,
			category->{name},
			authors[]->{name},
			slug,
			media,
		}[0...10]`
	);
}

/**
 * getArticlesFrom retrieves articles from a certain top-level route, such as a
 * category, series, or tag, and by "what" distinction, whether it be the category
 * name, series name, or tag name.
 * @param where top-level route.
 * @param what what to retrieve from the top-level route route.
 * @returns `Promise<Article[]>`
 * @async
 */
export async function getArticlesFrom(where: string, what: string): Promise<Article[]> {
	return await client.fetch(
		groq`*[_type == "article" && $where->slug.current == $what]{
			title,
			subtitle,
			date,
			authors[]->{name},
			slug,
			media
		}`,
		{
			where,
			what
		}
	);
}

export async function getArticlesFromTag(tagSlugName: string): Promise<Article[]> {
	return await client.fetch(
		groq`*[_type == "article" && references(*[_type == "tag" && slug.current == $tagSlugName]._id)] {
			title,
			subtitle,
			date,
			authors[]->{name},
			slug,
			category->,
			media
			category->,
			media
		}`,
		{
			tagSlugName
		}
	);
}

/**
 * getTagName from a slug. Not exactly the most efficient
 * solution to getting the name of a Tag, but for now,
 * this will do.
 * @param slug string for query
 * @returns `Promise<Tag>`
 */
export async function getTag(tagSlugName: string): Promise<Tag> {
	return await client.fetch(
		groq`*[_type == "tag" && slug.current == $tagSlugName][0]{
			name,
			slug,
			description,
			metaInfo
	}`,
		{
			tagSlugName
		}
	);
}

export async function getCategory(c: string): Promise<Category> {
	return await client.fetch(
		groq`*[_type == "category" && slug.current == $c][0]{
		name,
		description,
		slug,
		useCustomCss,
		metaInfo
	}`,
		{
			c
		}
	);
}

/**
 * getArticlesFromCategory from a certain category.
 * @param name category name.
 * @param n number of articles to query for.
 * @returns `Promise<Article[]>`
 * @async
 */
export async function getArticlesFromCategory(
	name: string,
	n?: number,
	lastDate?: string,
	lastID?: string
): Promise<Article[]> {
	if (!n) {
		return await client.fetch(
			groq`*[_type == "article" && category->slug.current == $name] | order(date desc){
				title,
				subtitle,
				date,
				authors[]->{name},
				slug,
				category->{name},
				media
			}`,
			{
				name
			}
		);
	} else {
		return await client.fetch(
			groq`*[_type == "article" && category->slug.current == $name && (date > $lastDate || (date == $lastDate && _id > $lastID))] | order(date) [0...$n] {
				title,
				subtitle,
				date,
				authors[]->{name},
				slug
			}`,
			{
				name,
				lastDate,
				lastID,
				n
			}
		);
	}
}

/**
 * Retrieves the number of documents in a certain category. This helps
 * to determine the number of pages there should be to paginate.
 * @param category name of the category to retrieve
 * @returns `Promise<string>`
 */
export async function getCountOfCategory(category: string): Promise<string> {
	return await client.fetch(
		groq`count(*[_type == "article" && category->slug.current == $category])`,
		{ category }
	);
}

/**
 * getSeriesList retrieves a list of series.
 * @param n number of series to retrieve.
 * @returns `Promise<Series[]>`
 * @async
 */
export async function getSeriesList(n?: number): Promise<Series[]> {
	if (!n) {
		return await client.fetch(
			groq`*[_type == "series"]{
				name,
				description,
				date,
				authors[]->{name},
				slug,
			}`
		);
	} else {
		// run n-based, paginated query here.
		return await client.fetch(
			groq`*[_type == "series"]{
				title,
				subtitle,
				date,
				authors[]->{name},
				slug
			}`,
			{
				n
			}
		);
	}
}

/**
 * getArticlesFromSeries from a certain series.
 * @param name series name.
 * @param n number of articles to query for.
 * @returns `Promise<Article[]>`
 * @async
 */
export async function getArticlesFromSeries(name: string, n?: number): Promise<Article[]> {
	if (!n) {
		return await client.fetch(
			groq`*[_type == "article" && series->slug.current == $name]|order(date desc){
				title,
				subtitle,
				date,
				authors[]->{name},
				category->{name},
				slug,
				series->,
				media
			}`,
			{
				name
			}
		);
	} else {
		// run n-based, paginated query here.
		return await client.fetch(
			groq`*[_type == "article" && series->slug.current == $name]{
				title,
				subtitle,
				date,
				authors[]->{name},
				slug
			}`,
			{
				name,
				n
			}
		);
	}
}

export async function getSeries(s: string): Promise<Series> {
	return await client.fetch(
		groq`*[_type == "series" && slug.current == $s][0]{
		name,
		description,
		metaInfo,
	}`,
		{
			s
		}
	);
}

/**
 * getOneArticleFrom uses a top-level route and a unique slug to retrieve a single article.
 * @param where top-level route.
 * @param what what to retrieve from the top-level route.
 * @returns `Promise<Article>`
 * @async
 */
export async function getOneArticleFrom(where: string, what: string): Promise<Article> {
	return await client.fetch(
		groq`*[_type == "article" && $where->slug.current == $where && slug.current == $what][0]{
			title,
			subtitle,
			date,
			content,
			authors[]->{name},
			tags[]->{name}
		}`,
		{
			where,
			what
		}
	);
}

export async function getOneArticleFromCategory(where: string, what: string): Promise<Article> {
	return await client.fetch(
		groq`*[_type == "article" && category->slug.current == $where && slug.current == $what][0]{
			title,
			subtitle,
			date,
			content[]{
				_type == "image" => {
					title,
					alt,
					description,
					"attrs": asset->{
						metadata,
						creditLine
					},
				},
				...
			},
			authors[]->{name, slug},
			tags[]->{name, slug},
			media,
			updatedDate,
			category->{name, slug},
			"headerImage": media.asset->{creditLine},
			metaInfo,
		}`,
		{
			where,
			what
		}
	);
}

export async function getOneArticleFromSeries(where: string, what: string): Promise<Article> {
	return await client.fetch(
		groq`*[_type == "article" && series->slug.current == $where && slug.current == $what][0]{
			title,
			subtitle,
			date,
			content,
			authors[]->{name},
			tags[]->{name}
		}`,
		{
			where,
			what
		}
	);
}

/**
 * getArticle retrieves a single article from a single slug query.
 * @param slug URL slug for an article.
 * @async uses a Sanity Client to fetch data.
 */
export async function getArticle(slug: string): Promise<Article> {
	return await client.fetch(
		groq`*[_type == "article" && slug.current == $slug][0]{
			title,
			subtitle,
			date,
			content,
			// The arrow is a dereferencing operator. It is used to follow references. In this case,
			// we are following the author reference and only retrieving the name field from it.
			// See https://medium.com/@imvinojanv/understanding-groq-how-queries-work-9ea37dee749a.
			authors[]->{name},
			category->{name},
			tags->{name},
			media,
		}`,
		{
			slug
		}
	);
}

export async function getArticleToValidate(slug: string): Promise<Article> {
	return await client.fetch(
		groq`*[_type == "article" && slug.current == $slug][0]{
			category->{slug},
			series->{slug},
			tags[]->{slug}
		}`,
		{
			slug
		}
	);
}

/**
 * getTags gets multiple tags from the database.
 * TODO sort alphabetically on retrieval.
 * @param n integer for the amount of tags to retrieve.
 * @async uses a Sanity Client to fetch data.
 */
// export async function getTags(n?: number): Promise<Tag[]> {
// 	if (!n) {
// 		return await client.fetch(
// 			groq`*[_type == "tag"]{
// 			  name,
// 	    	  slug
// 			}`
// 		);
// 	} else {
// 		// run n-based, paginated query here.
// 		return await client.fetch(
// 			groq`*[_type == "tag"]{
// 			  name,
// 			  slug
// 			}`,
// 			{
// 				n
// 			}
// 		);
// 	}
// }
export async function getTags(): Promise<Tag[]> {
	return await client.fetch(groq`*[_type == "tag"] { name, slug } | order(lower(name))`);
}

export async function getOneTag(what: string): Promise<Tag> {
	return await client.fetch(
		groq`*[_type == "tag" && slug.current == $what][0]{
			name,
			slug
		}`,
		{
			what
		}
	);
}

export async function getArticleTags(slug: string): Promise<Article> {
	return await client.fetch(
		groq`*[_type == "article" && slug.current == $slug][0]{
			tags->{slug}
		}`,
		{
			slug
		}
	);
}

export async function getAllMembers(): Promise<Member[]> {
	return await client.fetch(
		groq`*[_type == "member"] {
			name,
			bio,
			slug,
			portrait,
			slug,
			portrait
		} | order(lower(name))`
	);
}

export async function getArticlesOfMember(slug: string): Promise<Article[]> {
	return await client.fetch(
		groq`*[_type == "article" && references(*[_type == "member" && slug.current == $slug]._id)] | order(date desc) {
			title,
			subtitle,
			date,
			authors[]->{name},
			slug,
			category->,
			media
		}`,
		{
			slug
		}
	);
}

export async function getMember(slug: string): Promise<Member> {
	return await client.fetch(
		groq`*[_type == "member" && slug.current == $slug][0]{
	  		name,
			year,
			bio,
			handles,
			portrait,
			from
		}`,
		{
			slug
		}
	);
}
