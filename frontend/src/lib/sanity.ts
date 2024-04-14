import type { PortableTextBlock } from '@portabletext/types';
import { SanityClient, createClient } from '@sanity/client';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

import { SANITY_DATASET, SANITY_PROJECT_ID, DEVELOPER_TOKEN } from '$env/static/private';

if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
	throw new Error('Did you forget to run yarn sanity init --env?');
}

let client: SanityClient;

/**
 * Depending on the environment, either use or don't use the DEVELOPER token.
 */
if (SANITY_DATASET == 'production') {
	client = createClient({
		projectId: SANITY_PROJECT_ID,
		dataset: SANITY_DATASET,
		useCdn: true,
		apiVersion: '2024-03-15'
	});
} else {
	client = createClient({
		projectId: SANITY_PROJECT_ID,
		dataset: SANITY_DATASET,
		useCdn: true,
		apiVersion: '2024-03-15',
		token: DEVELOPER_TOKEN // A token field is required to access private datasets.
	});
}

export { client };

/**
 * getArticles, that is "Article" with an "s" for plural, returns all articles.
 * This is probably only for testing purposes. This is effectively equivalent
 * to detonating a nuke on the API.
 * @returns array of articles.
 */
export async function getArticles(): Promise<Article[]> {
	return await client.fetch(groq`*[_type == "article"] | order(_createdAt desc)`);
}

export async function getArticlesFrom(where: string, what: string): Promise<Article[]> {
	return await client.fetch(
		groq`*[_type == "article" && $where->slug.current == $what]{
			title,
			subtitle,
			date,
			authors[]->{name},
			slug
		}`,
		{
			where,
			what
		}
	);
}

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

/**
 * getArticle retrieves a single article from a custom query.
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
			category->{name}
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
 * @asnyc uses a Sanity Client to fetch data.
 */
export async function getTags(n: number): Promise<Tag[]> {
	return await client.fetch(
		groq`*[_type == "tag" 0..$n]{
		  name,
			slug
		}`,
		{
			n
		}
	);
}

export interface Member {
	_type: 'member';
	name: string;
	year: number;
	netid: string;
	bio: string;
	portrait: ImageAsset;
}

export interface Tag {
	_type: 'tag';
	_createdAt: string;
	name: string;
	slug: string;
}

export interface Article {
	_type: 'post';
	_createdAt: string;
	title: string;
	subtitle: string;
	abstract?: string;
	date: string;
	slug: Slug;
	tags: Tag[];
	mainImage?: ImageAsset;
	authors: Member[];
	content: PortableTextBlock[];
}
